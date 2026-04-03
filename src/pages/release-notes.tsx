import { useEffect, useId, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
import Link from "@docusaurus/Link";

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

function FilterField({
  id,
  label,
  value,
  onChange,
  items,
  isOpen,
  onOpenChange,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  items: Array<{ label: string; value: string }>;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const optionRefs = useRef<Array<HTMLDivElement | null>>([]);
  const labelId = useId();
  const menuId = useId();
  const selectedIndex = Math.max(
    0,
    items.findIndex((item) => item.value === value)
  );
  const [activeIndex, setActiveIndex] = useState(selectedIndex);
  const safeActiveIndex = Math.min(activeIndex, Math.max(items.length - 1, 0));

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setActiveIndex(selectedIndex);
  }, [isOpen, selectedIndex]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        onOpenChange(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
    };
  }, [isOpen, onOpenChange]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const activeOption = optionRefs.current[safeActiveIndex];

    requestAnimationFrame(() => {
      menuRef.current?.focus();
      activeOption?.scrollIntoView({ block: "nearest" });
    });
  }, [isOpen, safeActiveIndex]);

  const closeMenu = (focusButton = false) => {
    onOpenChange(false);

    if (focusButton) {
      buttonRef.current?.focus();
    }
  };

  const selectValue = (nextValue: string) => {
    onChange(nextValue);
    closeMenu(true);
  };

  return (
    <div className={styles.filterField} ref={rootRef}>
      <span className={styles.filterLabel} id={labelId}>
        {label}
      </span>
      <div className={styles.dropdownShell}>
        <button
          ref={buttonRef}
          id={id}
          type="button"
          className={styles.dropdownButton}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-controls={`${menuId}-options`}
          aria-labelledby={`${labelId} ${id}-value`}
          onClick={() => onOpenChange(!isOpen)}
          onKeyDown={(event) => {
            if (event.key === "ArrowDown" || event.key === "ArrowUp") {
              event.preventDefault();
              onOpenChange(true);
            }
          }}
        >
          <span id={`${id}-value`} className={styles.dropdownValue}>
            {items[selectedIndex]?.label ?? value}
          </span>
          <span className={styles.dropdownChevron} aria-hidden="true" />
        </button>

        {isOpen ? (
          <div
            ref={menuRef}
            id={`${menuId}-options`}
            className={styles.dropdownMenu}
            role="listbox"
            aria-labelledby={labelId}
            aria-activedescendant={`${menuId}-option-${safeActiveIndex}`}
            tabIndex={0}
            onKeyDown={(event) => {
              if (items.length === 0) {
                return;
              }

              if (event.key === "ArrowDown") {
                event.preventDefault();
                setActiveIndex((current) => (current + 1) % items.length);
                return;
              }

              if (event.key === "ArrowUp") {
                event.preventDefault();
                setActiveIndex((current) => (current - 1 + items.length) % items.length);
                return;
              }

              if (event.key === "Home") {
                event.preventDefault();
                setActiveIndex(0);
                return;
              }

              if (event.key === "End") {
                event.preventDefault();
                setActiveIndex(items.length - 1);
                return;
              }

              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                selectValue(items[safeActiveIndex]?.value ?? value);
                return;
              }

              if (event.key === "Escape") {
                event.preventDefault();
                closeMenu(true);
              }
            }}
          >
            {items.map((item, index) => {
              const isSelected = item.value === value;
              const isActive = index === safeActiveIndex;

              return (
                <div
                  key={item.value}
                  id={`${menuId}-option-${index}`}
                  ref={(node) => {
                    optionRefs.current[index] = node;
                  }}
                  className={clsx(styles.dropdownOption, {
                    [styles.dropdownOptionSelected]: isSelected,
                    [styles.dropdownOptionActive]: isActive,
                  })}
                  role="option"
                  aria-selected={isSelected}
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseDown={(event) => {
                    event.preventDefault();
                  }}
                  onClick={() => selectValue(item.value)}
                >
                  <span
                    className={clsx(styles.dropdownOptionIndicator, {
                      [styles.dropdownOptionIndicatorSelected]: isSelected,
                    })}
                    aria-hidden="true"
                  />
                  <span>{item.label}</span>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
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
  const [openFilterId, setOpenFilterId] = useState<string | null>(null);

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

  const handleResetFilters = () => {
    setSelectedPlatform("All");
    setSelectedProduct("All");
    setItemsPerPage(10);
    setCurrentPage(1);
  };

  const hasActiveFilters =
    selectedPlatform !== "All" || selectedProduct !== "All" || itemsPerPage !== 10;
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
              <span className={styles.kicker}>Recent Changes</span>
              <Heading as="h1" className={styles.pageTitle}>
                Release Notes
              </Heading>
              <p className={styles.pageSubtitle}>
                Track launches, improvements, and product changes across E2E Networks
                in a format that is easier to scan, filter, and revisit.
              </p>
            </div>

            <div className={styles.heroSummary}>
              <div>
                <span className={styles.summaryLabel}>Platforms</span>
                <p>MyAccount and TIR updates in one stream.</p>
              </div>
              <div>
                <span className={styles.summaryLabel}>Current view</span>
                <p>
                  {selectedPlatform === "All" ? "All platforms" : selectedPlatform}
                  {" · "}
                  {selectedProduct === "All" ? "All products" : selectedProduct}
                </p>
              </div>
            </div>
          </section>

          <section className={styles.filtersPanel}>
            <div className={styles.filtersGrid}>
              <FilterField
                id="platform-filter"
                label="Platform"
                value={selectedPlatform}
                onChange={setSelectedPlatform}
                isOpen={openFilterId === "platform-filter"}
                onOpenChange={(isOpen) => setOpenFilterId(isOpen ? "platform-filter" : null)}
                items={[
                  { label: "All platforms", value: "All" },
                  { label: "MyAccount", value: "MyAccount" },
                  { label: "TIR", value: "TIR" },
                ]}
              />

              <FilterField
                id="product-filter"
                label="Product"
                value={selectedProduct}
                onChange={setSelectedProduct}
                isOpen={openFilterId === "product-filter"}
                onOpenChange={(isOpen) => setOpenFilterId(isOpen ? "product-filter" : null)}
                items={[
                  { label: "All products", value: "All" },
                  ...filteredProducts.map((product) => ({
                    label: product,
                    value: product,
                  })),
                ]}
              />

              <FilterField
                id="per-page-filter"
                label="Per page"
                value={String(itemsPerPage)}
                onChange={(value) => {
                  setItemsPerPage(Number(value));
                  setCurrentPage(1);
                }}
                isOpen={openFilterId === "per-page-filter"}
                onOpenChange={(isOpen) => setOpenFilterId(isOpen ? "per-page-filter" : null)}
                items={[5, 10, 25, 50].map((count) => ({
                  label: String(count),
                  value: String(count),
                }))}
              />
            </div>

            <div className={styles.filtersMeta}>
              <p>Use filters to narrow by platform or product when you are checking whether a recent change may explain what you are seeing.</p>
              {hasActiveFilters ? (
                <button type="button" className={styles.resetButton} onClick={handleResetFilters}>
                  Reset filters
                </button>
              ) : null}
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
                <p>Broaden the platform or product filters to see more updates.</p>
                <button type="button" className={styles.resetButton} onClick={handleResetFilters}>
                  Show all updates
                </button>
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
