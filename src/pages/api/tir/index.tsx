import ApiReferencePage from "../../../components/api/ApiReferencePage";

export default function TirApiPage() {
  return (
    <ApiReferencePage
      title="TIR API"
      description="Reference for TIR training, inference, datasets, and other AI workflow integrations."
      specPath="/api/tir/_build/openapi.yaml"
      tags={["Training", "Inference", "Datasets", "AI Workflows"]}
      quickLinks={[
        { label: "All API references", href: "/api" },
        { label: "TIR docs", href: "/docs/tir" },
        { label: "Release notes", href: "/release-notes" },
        { label: "OpenAPI YAML", href: "/api/tir/_build/openapi.yaml", external: true },
      ]}
    />
  );
}
