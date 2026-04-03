import type { ComponentType, ReactNode } from "react";
import Link from "@docusaurus/Link";
import Heading from "@theme/Heading";
import { ArrowRight, Braces, LifeBuoy, Layers3, Sparkles } from "lucide-react";
import clsx from "clsx";
import styles from "./styles.module.css";

type RouteCard = {
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  label: string;
  chips: string[];
  icon: ComponentType<{ size?: number; className?: string }>;
  className: string;
};

const routeCards: RouteCard[] = [
  {
    eyebrow: "MyAccount",
    title: "MyAccount docs",
    description:
      "Use this section for compute, networking, billing, storage, and account controls.",
    href: "/docs/myaccount",
    label: "Open MyAccount",
    chips: ["Compute", "Network", "Billing"],
    icon: Layers3,
    className: styles.cardMyAccount,
  },
  {
    eyebrow: "TIR",
    title: "TIR docs",
    description:
      "Use this section for training, inference, research, and platform workflows.",
    href: "/docs/tir",
    label: "Open TIR",
    chips: ["Training", "Inference", "Research"],
    icon: Sparkles,
    className: styles.cardTir,
  },
  {
    eyebrow: "API",
    title: "API reference",
    description:
      "Use this lane for auth details, request shapes, schemas, and endpoint reference.",
    href: "/api",
    label: "Open API reference",
    chips: ["MyAccount API", "TIR API"],
    icon: Braces,
    className: styles.cardApi,
  },
  {
    eyebrow: "Support",
    title: "Support docs",
    description:
      "Use this section for troubleshooting, escalation, and support-oriented guidance.",
    href: "/docs/help",
    label: "Open support",
    chips: ["Troubleshooting", "Migration", "Handoff"],
    icon: LifeBuoy,
    className: styles.cardSupport,
  },
];

function Card({ eyebrow, title, description, href, label, chips, icon: Icon, className }: RouteCard) {
  return (
    <Link className={clsx(styles.card, className)} to={href}>
      <div className={styles.cardTop}>
        <span className={styles.cardEyebrow}>{eyebrow}</span>
        <span className={styles.cardIcon}>
          <Icon size={18} />
        </span>
      </div>

      <h3>{title}</h3>
      <p>{description}</p>

      <div className={styles.cardChips}>
        {chips.map((chip) => (
          <span key={chip} className={styles.cardChip}>
            {chip}
          </span>
        ))}
      </div>

      <span className={styles.cardLabel}>
        {label}
        <ArrowRight size={14} />
      </span>
    </Link>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className={styles.featureShell}>
          <div className={styles.bandHeader}>
            <span className={styles.kicker}>Featured routes</span>
            <Heading as="h2">Start in the section that fits the task.</Heading>
            <p>
              The homepage should act like a documentation index: clear routes,
              short descriptions, and direct links into the right section.
            </p>
          </div>

          <div className={styles.routeGrid}>
            {routeCards.map((card) => (
              <Card key={card.title} {...card} />
            ))}
          </div>

          <div className={styles.footerRow}>
            <div>
              <span className={styles.footerKicker}>Release notes</span>
              <p>Review recent changes before assuming a workflow or integration issue is unchanged.</p>
            </div>
            <Link className={styles.footerLink} to="/release-notes">
              View updates
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
