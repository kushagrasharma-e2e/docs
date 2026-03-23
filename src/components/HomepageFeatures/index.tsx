import type { ReactNode } from "react";
import Link from "@docusaurus/Link";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

type CardItem = {
  title: string;
  description: string;
  href: string;
  label: string;
};

const primaryCards: CardItem[] = [
  {
    title: "MyAccount",
    description:
      "Product hub for compute, storage, database, network, billing, settings, and broader account workflows.",
    href: "/docs/myaccount",
    label: "Open MyAccount",
  },
  {
    title: "TIR",
    description:
      "Product hub for training, inference, research, and curated guidance into the TIR platform.",
    href: "/docs/tir",
    label: "Open TIR",
  },
];

const utilityCards: CardItem[] = [
  {
    title: "Help",
    description:
      "Support-oriented guides and troubleshooting paths that stay discoverable without crowding the header.",
    href: "/docs/help",
    label: "Open Help",
  },
  {
    title: "Release Notes",
    description:
      "Browse launches, improvements, and product changes across E2E Networks platforms in one stream.",
    href: "/release-notes",
    label: "See Updates",
  },
];

function Card({ title, description, href, label }: CardItem) {
  return (
    <Link className={styles.card} to={href}>
      <h3>{title}</h3>
      <p>{description}</p>
      <span>{label}</span>
    </Link>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className={styles.band}>
          <div className={styles.bandHeader}>
            <span className={styles.kicker}>Primary Paths</span>
            <Heading as="h2">Start with a product, then branch into support and APIs only when you need them.</Heading>
            <p>
              The homepage now prioritizes MyAccount and TIR, while keeping
              utility destinations close by instead of pushing them into the
              main navigation.
            </p>
          </div>
          <div className={styles.primaryGrid}>
            {primaryCards.map((card) => (
              <Card key={card.title} {...card} />
            ))}
          </div>

          <div className={styles.utilitySection}>
            <div className={styles.utilityHeader}>
              <span className={styles.kicker}>Secondary Paths</span>
              <Heading as="h2">Use the supporting sections when you already know the kind of task you need.</Heading>
              <p>
                Help and Release Notes stay easy to reach, but they no longer
                compete with the main product entry points.
              </p>
            </div>
            <div className={styles.cardGrid}>
              {utilityCards.map((card) => (
                <Card key={card.title} {...card} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
