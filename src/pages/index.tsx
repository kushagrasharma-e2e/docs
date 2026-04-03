import type { ReactNode } from "react";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import HomepageFeatures from "../components/HomepageFeatures";

import styles from "./index.module.css";

function HomepageHeader() {
  return (
    <header className={styles.heroBanner}>
      <div className="container">
        <div className={styles.heroGrid}>
          <div className={styles.heroContent}>
            <div className={styles.eyebrow}>Documentation</div>
            <h1 className={styles.heroTitle}>Docs for building, training, and deploying on E2E Networks.</h1>
            <p className={styles.heroSubtitle}>
              Use these docs to find product guides, API reference, release
              notes, and support paths for the platform.
            </p>

            <div className={styles.heroActions}>
              <Link className="button button--primary button--lg" to="/docs/myaccount">
                Open MyAccount
              </Link>
              <Link className="button button--outline button--lg" to="/docs/tir">
                Open TIR
              </Link>
            </div>

            <p className={styles.heroMeta}>MyAccount, TIR, API, Support, Release Notes</p>
          </div>

          <aside className={styles.heroPreview}>
            <div className={styles.previewHeader}>
              <span className={styles.previewEyebrow}>Quick paths</span>
              <h2>Choose the section that matches the task.</h2>
              <p>
                These are the main entry points for the documentation site.
              </p>
            </div>

            <div className={styles.previewList}>
              <Link className={styles.previewItem} to="/docs/myaccount">
                <span className={styles.previewItemTitle}>MyAccount</span>
                <span className={styles.previewItemText}>
                  Docs for compute, networking, billing, storage, and account
                  controls.
                </span>
              </Link>
              <Link className={styles.previewItem} to="/docs/tir">
                <span className={styles.previewItemTitle}>TIR</span>
                <span className={styles.previewItemText}>
                  Docs for training, inference, research, and platform
                  workflows.
                </span>
              </Link>
              <Link className={styles.previewItem} to="/release-notes">
                <span className={styles.previewItemTitle}>Release notes</span>
                <span className={styles.previewItemText}>
                  Recent product changes and documentation updates.
                </span>
              </Link>
              <Link className={styles.previewItem} to="/docs/help">
                <span className={styles.previewItemTitle}>Support</span>
                <span className={styles.previewItemText}>
                  Troubleshooting guides and support-oriented paths.
                </span>
              </Link>
            </div>

            <Link className={styles.previewLink} to="/docs/myaccount">
              Open MyAccount docs
            </Link>
          </aside>
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
