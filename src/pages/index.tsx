import type { ReactNode } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import HomepageFeatures from "../components/HomepageFeatures";

import styles from "./index.module.css";

const decisionCards = [
  {
    eyebrow: "Start with Docs",
    title: "Read guides and product workflows",
    description:
      "Use docs for quickstarts, task guides, troubleshooting, and product maps across MyAccount and TIR.",
    to: "/docs/intro",
    label: "Browse docs",
  },
  {
    eyebrow: "Start with API",
    title: "Build against endpoints",
    description:
      "Use the API lane when you already know the job is schema, auth, request, or integration work.",
    to: "/api",
    label: "Open API reference",
  },
  {
    eyebrow: "Check changes",
    title: "Verify recent platform updates",
    description:
      "Use release notes when you need to confirm what shipped before debugging a workflow or UI change.",
    to: "/release-notes",
    label: "View release notes",
  },
];

const quickLinks = [
  {
    label: "Launch a MyAccount node",
    to: "/docs/myaccount/nodes/getting-started/quickstart",
  },
  {
    label: "Get started in TIR",
    to: "/docs/tir/getting-started/quickstart",
  },
  {
    label: "Secure networking",
    to: "/docs/myaccount/network",
  },
  {
    label: "Find support",
    to: "/docs/help",
  },
];

const heroSignals = ["MyAccount", "TIR", "API", "Release Notes", "Support"];

function HomepageHeader() {
  return (
    <header className={clsx(styles.heroBanner)}>
      <div className="container">
        <div className={styles.heroGrid}>
          <div className={styles.heroContent}>
            <div className={styles.eyebrow}>E2E Networks Documentation</div>
            <h1 className={styles.heroTitle}>Find the right answer faster.</h1>
            <p className={styles.heroSubtitle}>
              Start with Docs for guided tasks, API for integration work, Release
              Notes for recent changes, and Support when the workflow is blocked.
            </p>

            <div className={styles.signalRow}>
              {heroSignals.map((signal) => (
                <span key={signal} className={styles.signalPill}>
                  {signal}
                </span>
              ))}
            </div>

            <div className={styles.heroActions}>
              <Link className="button button--primary button--lg" to="/docs/intro">
                Open Docs
              </Link>
              <Link
                className={clsx("button button--outline button--lg", styles.secondaryAction)}
                to="/api"
              >
                Open API Reference
              </Link>
            </div>

            <div className={styles.quickLinksPanel}>
              <span className={styles.quickLinksLabel}>Popular starting points</span>
              <div className={styles.quickLinks}>
                {quickLinks.map((item) => (
                  <Link key={item.label} className={styles.quickLink} to={item.to}>
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.heroPanel}>
            <div className={styles.panelHeader}>
              <span className={styles.panelEyebrow}>Start Here</span>
              <h2 className={styles.panelTitle}>Choose the route that matches the job.</h2>
              <p className={styles.panelDescription}>
                Most visits start in one of these three places. Pick the surface
                that matches the question in your head, then go deeper by product.
              </p>
            </div>

            <div className={styles.decisionGrid}>
              {decisionCards.map((item) => (
                <Link key={item.title} className={styles.decisionCard} to={item.to}>
                  <div>
                    <span className={styles.entryEyebrow}>{item.eyebrow}</span>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                  <span className={styles.entryLink}>{item.label}</span>
                </Link>
              ))}
            </div>

            <div className={styles.panelFooter}>
              <div>
                <span className={styles.panelFooterLabel}>Need help quickly?</span>
                <p>
                  Use Support for troubleshooting and handoff, or jump straight
                  to release notes when behavior may have changed recently.
                </p>
              </div>
              <Link className={styles.footerLink} to="/docs/help">
                Open Support
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
