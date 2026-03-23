import React, { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
import Link from "@docusaurus/Link";
import { Check, ChevronDown } from "lucide-react";

import tirData from "../../static/release-notes/tir.json";
import myaccountData from "../../static/release-notes/myaccount.json";
import styles from "./release-notes.module.css";

interface ReleaseNote {
  date: number;
  product: string;
  myaccount: boolean;
  tir: boolean;
  title: string;
  details: string[];
  to?: string;
  tag?: string[];
}

const allData: ReleaseNote[] = [...myaccountData, ...tirData].sort(
  (a, b) => b.date - a.date
);

const linkRegex = /link\s*:\s*\{\s*(['"])(.+?)\1\s*:\s*\1(.+?)\1\s*\}/g;

function formatDate(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function renderDetail(detail: string) {
  const parts: (string | React.ReactNode)[] = [];
  let lastIndex = 0;

  for (const match of detail.matchAll(linkRegex)) {
    const [fullMatch, , linkText, linkUrl] = match;
    const start = match.index ?? 0;
    const end = start + fullMatch.length;

    if (start > lastIndex) {
      parts.push(detail.slice(lastIndex, start));
    }

    parts.push(
      <Link key={`${linkText}-${start}`} href={linkUrl} className={styles.inlineLink}>
        {linkText}
      </Link>
    );

    lastIndex = end;
  }

  if (lastIndex < detail.length) {
    parts.push(detail.slice(lastIndex));
  }

  return parts.length > 0 ? parts : detail;
}

function getPageItems(currentPage: number, totalPages: number) {
  const pages: (number | string)[] = [];
  const delta = 1;

  for (let page = 1; page <= totalPages; page += 1) {
    const isEdge = page === 1 || page === totalPages;
    const isNearCurrent = page >= currentPage - delta && page <= currentPage + delta;

    if (isEdge || isNearCurrent) {
      pages.push(page);
    } else if (pages[pages.length - 1] !== "...") {
      pages.push("...");
    }
  }

  return pages;
}

function Badge({
  children,
  tone = "default",
}: {
  children: React.ReactNode;
  tone?: "default" | "platform" | "tag";
}) {
  return (
    <span className={clsx(styles.badge, styles[`badge${tone[0].toUpperCase()}${tone.slice(1)}`])}>
      {children}
    </span>
  );
}

function FilterSelect({
  id,
  value,
  onValueChange,
  items,
}: {
  id: string;
  value: string;
  onValueChange: (value: string) => void;
  items: Array<{ label: string; value: string }>;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = React.useRef<HTMLDivElement | null>(null);
  const currentItem = items.find((item) => item.value === value) ?? items[0];

  useEffect(() => {
    if (!open) {
      return;
    }

    const handlePointerDown = (event: MouseEvent) => {
      if (rootRef.current?.contains(event.target as Node)) {
        return;
      }

      setOpen(false);
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  return (
    <div ref={rootRef} className={styles.filterMenu}>
      <button
        id={id}
        type="button"
        className={clsx(styles.selectTrigger, open && styles.selectTriggerOpen)}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        <span className={styles.selectValue}>{currentItem?.label}</span>
        <ChevronDown className={clsx(styles.selectChevron, open && styles.selectChevronOpen)} />
      </button>

      {open ? (
        <div className={styles.selectContent} role="listbox" aria-labelledby={id}>
        {items.map((item) => (
          <button
            key={item.value}
            type="button"
            role="option"
            aria-selected={item.value === value}
            className={clsx(
              styles.selectItem,
              item.value === value && styles.selectItemActive
            )}
            onClick={() => {
              onValueChange(item.value);
              setOpen(false);
            }}
          >
            <span>{item.label}</span>
            {item.value === value ? <Check className={styles.selectCheck} /> : null}
          </button>
        ))}
        </div>
      ) : null}
    </div>
  );
}

function ReleaseNoteCard({ note }: { note: ReleaseNote }) {
  const platformTags = [];

  if (note.myaccount) {
    platformTags.push("MyAccount");
  }

  if (note.tir) {
    platformTags.push("TIR");
  }

  return (
    <article className={styles.noteCard}>
      <div className={styles.noteHeader}>
        <div>
          <Heading as="h2" className={styles.noteTitle}>
            {note.title}
          </Heading>
          <div className={styles.badgeRow}>
            <Badge>{note.product}</Badge>
            {platformTags.map((platform) => (
              <Badge key={platform} tone="platform">
                {platform}
              </Badge>
            ))}
            {note.tag?.map((tag) => (
              <Badge key={tag} tone="tag">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        <time className={styles.noteDate}>{formatDate(note.date)}</time>
      </div>

      <div className={styles.noteBody}>
        {note.details.map((detail, index) => (
          <p key={`${note.title}-${index}`}>{renderDetail(detail)}</p>
        ))}
      </div>

      {note.to ? (
        <Link href={note.to} className={styles.noteLink}>
          Learn more
        </Link>
      ) : null}
    </article>
  );
}

export default function ReleaseNotes(): ReactNode {
  const [selectedProduct, setSelectedProduct] = useState("All");
  const [selectedPlatform, setSelectedPlatform] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const filteredProducts = useMemo(() => {
    const scoped = allData.filter((note) => {
      if (selectedPlatform === "MyAccount") {
        return note.myaccount;
      }

      if (selectedPlatform === "TIR") {
        return note.tir;
      }

      return true;
    });

    return Array.from(new Set(scoped.map((note) => note.product))).sort();
  }, [selectedPlatform]);

  useEffect(() => {
    if (selectedProduct !== "All" && !filteredProducts.includes(selectedProduct)) {
      setSelectedProduct("All");
    }
    setCurrentPage(1);
  }, [selectedPlatform, filteredProducts, selectedProduct]);

  const filteredData = useMemo(() => {
    return allData.filter((note) => {
      const matchesProduct = selectedProduct === "All" || note.product === selectedProduct;
      const matchesPlatform =
        selectedPlatform === "All" ||
        (selectedPlatform === "MyAccount" && note.myaccount) ||
        (selectedPlatform === "TIR" && note.tir);

      return matchesProduct && matchesPlatform;
    });
  }, [selectedProduct, selectedPlatform]);

  const totalPages = Math.max(1, Math.ceil(filteredData.length / itemsPerPage));

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(startIndex, startIndex + itemsPerPage);
  }, [currentPage, filteredData, itemsPerPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const start = filteredData.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const end = Math.min(currentPage * itemsPerPage, filteredData.length);

  return (
    <Layout
      title="Release Notes"
      description="Release notes for E2E Networks MyAccount and TIR platforms"
    >
      <main className={styles.page}>
        <div className="container">
          <section className={styles.hero}>
            <div className={styles.heroCopy}>
              <span className={styles.kicker}>Shipping Velocity</span>
              <Heading as="h1" className={styles.pageTitle}>
                Release Notes
              </Heading>
              <p className={styles.pageSubtitle}>
                Track feature launches, improvements, and product changes across E2E Networks in a layout that is easier to scan and filter.
              </p>
            </div>

            {/* <div className={styles.heroSummary}>
              <div>
                <span className={styles.summaryLabel}>Platforms covered</span>
                <p>MyAccount and TIR updates in one stream.</p>
              </div>
              <div>
                <span className={styles.summaryLabel}>Current selection</span>
                <p>
                  {selectedPlatform === "All" ? "All platforms" : selectedPlatform}
                  {" · "}
                  {selectedProduct === "All" ? "All products" : selectedProduct}
                </p>
              </div>
            </div> */}
          </section>

          <section className={styles.filtersPanel}>
            <div className={styles.filterField}>
              <label htmlFor="platform-filter">Platform</label>
              <FilterSelect
                id="platform-filter"
                value={selectedPlatform}
                onValueChange={setSelectedPlatform}
                items={[
                  { label: "All Platforms", value: "All" },
                  { label: "MyAccount", value: "MyAccount" },
                  { label: "TIR", value: "TIR" },
                ]}
              />
            </div>

            <div className={styles.filterField}>
              <label htmlFor="product-filter">Product</label>
              <FilterSelect
                id="product-filter"
                value={selectedProduct}
                onValueChange={setSelectedProduct}
                items={[
                  { label: "All Products", value: "All" },
                  ...filteredProducts.map((product) => ({
                    label: product,
                    value: product,
                  })),
                ]}
              />
            </div>

            <div className={styles.filterField}>
              <label htmlFor="per-page-filter">Per page</label>
              <FilterSelect
                id="per-page-filter"
                value={String(itemsPerPage)}
                onValueChange={(value) => {
                  setItemsPerPage(Number(value));
                  setCurrentPage(1);
                }}
                items={[5, 10, 25, 50].map((count) => ({
                  label: String(count),
                  value: String(count),
                }))}
              />
            </div>
          </section>

          <section className={styles.resultsPanel}>
            <div className={styles.resultsHeader}>
              <p>
                Showing {start}-{end} of {filteredData.length} release
                {filteredData.length === 1 ? " note" : " notes"}
              </p>
              <Link className={styles.resultsLink} to="/">
                Back to homepage
              </Link>
            </div>

            {paginatedData.length > 0 ? (
              <div className={styles.notesList}>
                {paginatedData.map((note, index) => (
                  <ReleaseNoteCard key={`${note.date}-${note.title}-${index}`} note={note} />
                ))}
              </div>
            ) : (
              <div className={styles.emptyState}>
                <Heading as="h2">No release notes match those filters.</Heading>
                <p>Try broadening the platform or product selection to see more updates.</p>
              </div>
            )}

            {totalPages > 1 ? (
              <nav className={styles.pagination} aria-label="Release notes pagination">
                <button
                  type="button"
                  className={styles.paginationButton}
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>

                {getPageItems(currentPage, totalPages).map((page, index) =>
                  page === "..." ? (
                    <span key={`ellipsis-${index}`} className={styles.paginationEllipsis}>
                      ...
                    </span>
                  ) : (
                    <button
                      key={page}
                      type="button"
                      className={clsx(styles.paginationButton, {
                        [styles.paginationButtonActive]: page === currentPage,
                      })}
                      onClick={() => handlePageChange(Number(page))}
                    >
                      {page}
                    </button>
                  )
                )}

                <button
                  type="button"
                  className={styles.paginationButton}
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </nav>
            ) : null}
          </section>
        </div>
      </main>
    </Layout>
  );
}
