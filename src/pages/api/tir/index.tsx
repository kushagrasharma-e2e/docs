import ApiReferencePage from "../../../components/api/ApiReferencePage";

export default function TirApiPage() {
  return (
    <ApiReferencePage
      title="TIR API"
      description="Reference for TIR training, inference, datasets, and workflow integrations."
      specPath="/api/tir/_build/openapi.yaml"
      compact
    />
  );
}
