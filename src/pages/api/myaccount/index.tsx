import ApiReferencePage from "../../../components/api/ApiReferencePage";

export default function MyAccountApiPage() {
  return (
    <ApiReferencePage
      title="MyAccount API"
      description="Reference for MyAccount resources, workflows, networking, billing, and operations."
      specPath="/api/myaccount/_build/openapi.yaml"
      compact
    />
  );
}
