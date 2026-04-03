import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import StoplightElements from "../StoplightElements";

import styles from "./api-reference.module.css";

type LinkItem = {
  label: string;
  href: string;
  external?: boolean;
};

interface ApiReferencePageProps {
  title: string;
  description: string;
  specPath: string;
  tags?: string[];
  quickLinks?: LinkItem[];
  compact?: boolean;
}

export default function ApiReferencePage({
  title,
  description,
  specPath,
  tags = [],
  quickLinks = [],
  compact = false,
}: ApiReferencePageProps) {
  return (
    <Layout title={`${title} API`} description={description}>
      <main className="api-docs-page">
        <div className="api-docs-shell">
          <div className={styles.page}>
            <section className={styles.hero}>
              <div className={compact ? styles.heroCardCompact : styles.heroCard}>
                <span className={styles.eyebrow}>API Reference</span>
                <h1 className={styles.heroTitle}>{title}</h1>
                <p className={styles.heroDescription}>{description}</p>

                {!compact && tags.length > 0 ? (
                  <div className={styles.tagRow}>
                    {tags.map((tag) => (
                      <span key={tag} className={styles.tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : null}

                {!compact && quickLinks.length > 0 ? (
                  <div className={styles.heroActions}>
                    {quickLinks.map((item) =>
                      item.external ? (
                        <a key={item.label} className={styles.heroLink} href={item.href}>
                          {item.label}
                        </a>
                      ) : (
                        <Link key={item.label} className={styles.heroLink} to={item.href}>
                          {item.label}
                        </Link>
                      )
                    )}
                  </div>
                ) : null}
              </div>
            </section>

            <StoplightElements specPath={specPath} />
          </div>
        </div>
      </main>
    </Layout>
  );
}
