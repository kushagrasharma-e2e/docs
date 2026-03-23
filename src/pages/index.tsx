import type { ReactNode } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import HomepageFeatures from "../components/HomepageFeatures";

import styles from "./index.module.css";

const heroStats = [
  {
    label: "Product-first routing",
    value: "Go straight from the homepage into MyAccount or TIR without an extra intro detour.",
  },
  {
    label: "Sidebar-led exploration",
    value: "Each product landing page keeps its sidebar visible so the next step is obvious.",
  },
  {
    label: "Focused navigation",
    value: "Release Notes and Help stay discoverable through lighter secondary paths.",
  },
];

const productPaths = [
  {
    eyebrow: "Primary product path",
    title: "MyAccount",
    description:
      "Open the MyAccount hub for compute, storage, database, network, billing, settings, and account-level workflows.",
    to: "/docs/myaccount",
    label: "Open MyAccount",
  },
  {
    eyebrow: "Primary product path",
    title: "TIR",
    description:
      "Open the TIR hub for training, inference, research, and curated paths into the latest platform guidance.",
    to: "/docs/tir",
    label: "Open TIR",
  },
];

const utilityPaths = [
  {
    title: "Release Notes",
    to: "/release-notes",
  },
  {
    title: "Help",
    to: "/docs/help",
  },
];

const heroSignals = ["MyAccount", "TIR", "Release Notes", "Help"];

function HomepageHeader() {
  return (
    <header className={clsx(styles.heroBanner)}>
      <div className="container">
        <div className={styles.heroGrid}>
          <div className={styles.heroContent}>
            <div className={styles.eyebrow}>E2E Networks Documentation</div>
            <h1 className={styles.heroTitle}>
              Choose a product and get into the docs fast.
            </h1>
            <p className={styles.heroSubtitle}>
              The homepage is now the main routing layer for the documentation
              experience, with MyAccount and TIR as the two clear entry points
              and lighter access to Help and Release Notes.
            </p>

            <div className={styles.signalRow}>
              {heroSignals.map((signal) => (
                <span key={signal} className={styles.signalPill}>
                  {signal}
                </span>
              ))}
            </div>

            <div className={styles.heroActions}>
              <Link className="button button--primary button--lg" to="/docs/myaccount">
                Open MyAccount Docs
              </Link>
              <Link
                className={clsx("button button--outline button--lg", styles.secondaryAction)}
                to="/docs/tir"
              >
                Open TIR Docs
              </Link>
            </div>

            <div className={styles.heroStats}>
              {heroStats.map((stat) => (
                <div key={stat.label} className={styles.statCard}>
                  <span className={styles.statLabel}>{stat.label}</span>
                  <p className={styles.statValue}>{stat.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.heroPanel}>
            <div className={styles.panelHeader}>
              <span className={styles.panelEyebrow}>Start Here</span>
              <h2 className={styles.panelTitle}>MyAccount and TIR are the two primary product hubs.</h2>
              <p className={styles.panelDescription}>
                Go directly into the product you need, then use the visible
                sidebar inside that section to continue deeper without hunting
                through extra landing pages.
              </p>
            </div>

            <div className={styles.entryGrid}>
              {productPaths.map((item) => (
                <Link key={item.title} className={styles.entryCard} to={item.to}>
                  <div>
                    <span className={styles.entryEyebrow}>{item.eyebrow}</span>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                  <span className={styles.entryLink}>{item.label}</span>
                </Link>
              ))}
            </div>

            <div className={styles.utilityPanel}>
              <span className={styles.utilityLabel}>Quick access</span>
              <div className={styles.utilityLinks}>
                {utilityPaths.map((item) => (
                  <Link key={item.title} className={styles.utilityLink} to={item.to}>
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>

            <div className={styles.panelFooter}>
              <div>
                <span className={styles.panelFooterLabel}>Need the full docs map?</span>
                <p>
                  The docs hub still exists when you want a cross-product
                  overview, but the homepage now optimizes for direct product
                  entry.
                </p>
              </div>
              <Link className={styles.footerLink} to="/docs/intro">
                Open Docs Hub
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout
      title={`${siteConfig.title} Documentation`}
      description="Documentation for building, running, and scaling workloads on E2E Networks Cloud"
    >
      <HomepageHeader />
      <main className={styles.mainContent}>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
