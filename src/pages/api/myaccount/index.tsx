import ApiReferencePage from "../../../components/api/ApiReferencePage";

export default function MyAccountApiPage() {
  return (
    <ApiReferencePage
      title="MyAccount API"
      description="Reference for managing MyAccount resources, account workflows, networking, billing, and platform operations."
      specPath="/api/myaccount/_build/openapi.yaml"
      tags={["Compute", "Network", "Billing", "Operations"]}
      quickLinks={[
        { label: "All API references", href: "/api" },
        { label: "MyAccount docs", href: "/docs/myaccount" },
        { label: "Support", href: "/docs/help" },
        { label: "OpenAPI YAML", href: "/api/myaccount/_build/openapi.yaml", external: true },
      ]}
    />
  );
}
