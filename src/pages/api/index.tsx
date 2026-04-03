import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";

export default function ApiIndexPage() {
  return (
    <Layout title="REST API" description="API documentation for E2E Networks products">
      <main className="api-docs-page">
        <div className="api-docs-shell" style={{ paddingTop: "1.25rem" }}>
          <section className="doc-hub">
            <div className="doc-hub__hero">
              <span className="doc-hub__eyebrow">API Lane</span>
              <Heading as="h1">REST API</Heading>
              <p className="doc-hub__lede">
                Start here when the job is schema lookup, auth detail, endpoint discovery,
                or integration work. Choose the product first, then open the product-specific reference.
              </p>
            </div>

            <div className="doc-hub__actions">
              <Link className="doc-hub__action" to="/api/myaccount/">
                <Heading as="h3">MyAccount API</Heading>
                <p>
                  Manage cloud resources, account workflows, networking, billing, and core platform operations.
                </p>
                <span className="doc-hub__link">Open reference</span>
              </Link>

              <Link className="doc-hub__action" to="/api/tir/">
                <Heading as="h3">TIR API</Heading>
                <p>
                  Explore TIR endpoints for training, inference, datasets, and AI workflow automation.
                </p>
                <span className="doc-hub__link">Open reference</span>
              </Link>
            </div>

            <div className="doc-hub__columns">
              <div className="doc-hub__section">
                <div className="doc-hub__section-header">
                  <Heading as="h2">Start in API when</Heading>
                  <p>The API lane works best when the problem is integration-shaped rather than walkthrough-shaped.</p>
                </div>
                <ul className="doc-hub__list">
                  <li>
                    <strong>You need request and response detail</strong>
                    Use API when endpoint contracts matter more than product walkthroughs.
                  </li>
                  <li>
                    <strong>You are building automation</strong>
                    Use the product-specific reference when scripts, SDKs, or backend integrations are the goal.
                  </li>
                  <li>
                    <strong>You already know the product area</strong>
                    Switch back to MyAccount or TIR docs if you need conceptual guidance, task sequencing, or troubleshooting context.
                  </li>
                </ul>
              </div>

              <div className="doc-hub__callout">
                <div className="doc-hub__section-header">
                  <Heading as="h2">Related lanes</Heading>
                  <p>Use the neighboring routes when the job shifts out of raw API reference.</p>
                </div>
                <ul className="doc-hub__list">
                  <li>
                    <strong><Link to="/docs/myaccount">MyAccount docs</Link></strong>
                    Return to MyAccount for guided product flows, quickstarts, and product-area navigation.
                  </li>
                  <li>
                    <strong><Link to="/docs/tir">TIR docs</Link></strong>
                    Return to TIR when the work shifts into AI workflow guidance and platform navigation.
                  </li>
                  <li>
                    <strong><Link to="/release-notes">Release Notes</Link></strong>
                    Check recent changes when an endpoint or workflow may have moved.
                  </li>
                  <li>
                    <strong><Link to="/docs/help">Support</Link></strong>
                    Use Support when the integration issue needs troubleshooting handoff beyond the spec itself.
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </main>
    </Layout>
  );
}
