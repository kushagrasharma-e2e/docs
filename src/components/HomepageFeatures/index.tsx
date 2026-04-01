import type { ReactNode } from "react";
import Link from "@docusaurus/Link";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

type CardItem = {
  title: string;
  description: string;
  href: string;
  label: string;
  eyebrow?: string;
};

const productCards: CardItem[] = [
  {
    eyebrow: "Product hub",
    title: "MyAccount",
    description:
      "Compute, storage, database, network, billing, account controls, and support paths for cloud operations.",
    href: "/docs/myaccount",
    label: "Open MyAccount",
  },
  {
    eyebrow: "Product hub",
    title: "TIR",
    description:
      "Curated starting points for training, inference, research, billing context, and support-aware routing.",
    href: "/docs/tir",
    label: "Open TIR",
  },
];

const taskCards: CardItem[] = [
  {
    title: "Launch a first node",
    description:
      "Go straight to the shortest MyAccount path from account access to a running node.",
    href: "/docs/myaccount/nodes/getting-started/quickstart",
    label: "Start the quickstart",
  },
  {
    title: "Secure networking and access",
    description:
      "Jump into VPC, firewall, reserve IP, DNS, and security-group guidance when connectivity is the problem.",
    href: "/docs/myaccount/network",
    label: "Open networking",
  },
  {
    title: "Train or deploy in TIR",
    description:
      "Use the TIR workflow pages when the job is model training, inference, or research iteration.",
    href: "/docs/tir/workflows/training",
    label: "Open TIR workflows",
  },
  {
    title: "Handle billing and account ops",
    description:
      "Move into statements, payments, coupons, TDS, and account-level controls without browsing the full sidebar.",
    href: "/docs/myaccount/billing",
    label: "Open billing",
  },
];

const utilityCards: CardItem[] = [
  {
    eyebrow: "Need help",
    title: "Support",
    description:
      "Use support routes when the workflow is blocked, incident-shaped, or needs escalation beyond standard docs.",
    href: "/docs/help",
    label: "Open Support",
  },
  {
    eyebrow: "Keep nearby",
    title: "Release Notes",
    description:
      "Check platform changes before debugging a workflow that may have shifted since your last visit.",
    href: "/release-notes",
    label: "See updates",
  },
];

function Card({ title, description, href, label, eyebrow }: CardItem) {
  return (
    <Link className={styles.card} to={href}>
      {eyebrow ? <span className={styles.cardEyebrow}>{eyebrow}</span> : null}
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
        <div className={styles.productBand}>
          <div className={styles.bandHeader}>
            <span className={styles.kicker}>Choose Your Product</span>
            <Heading as="h2">Jump into the product hub once you know whether you are working in MyAccount or TIR.</Heading>
            <p>
              Product hubs collect the fastest routes, deeper section maps, and
              related support or API paths without forcing you through the whole docs tree first.
            </p>
          </div>
          <div className={styles.productGrid}>
            {productCards.map((card) => (
              <Card key={card.title} {...card} />
            ))}
          </div>
        </div>

        <div className={styles.taskBand}>
          <div className={styles.bandHeader}>
            <span className={styles.kicker}>Common Jobs</span>
            <Heading as="h2">Skip straight to a likely next step when you already know the task.</Heading>
            <p>
              These shortcuts cover the jobs people usually look for first:
              first success, networking, TIR workflows, and account operations.
            </p>
          </div>
          <div className={styles.taskGrid}>
            {taskCards.map((card) => (
              <Card key={card.title} {...card} />
            ))}
          </div>
        </div>

        <div className={styles.utilityBand}>
          <div className={styles.utilityHeader}>
            <span className={styles.kicker}>Support And Change Awareness</span>
            <Heading as="h2">Keep help and recent updates one click away.</Heading>
            <p>
              When the next move is unclear, these routes help you verify what changed or move into a support path quickly.
            </p>
          </div>

          <div className={styles.utilityGrid}>
            {utilityCards.map((card) => (
              <Card key={card.title} {...card} />
            ))}
          </div>

          <div className={styles.linkRow}>
            <Link className={styles.inlineLink} to="/docs/intro">
              Browse docs hub
            </Link>
            <Link className={styles.inlineLink} to="/api">
              Open API references
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
