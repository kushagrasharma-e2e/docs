# External Sources Used

This file records the external sources used to improve structure, terminology, and use-case framing. The documentation itself remained the primary source of truth for product behavior.

## Documentation structure and writing patterns

### Fly.io Docs

- URL: https://fly.io/docs/
- URL: https://fly.io/docs/getting-started/
- URL: https://fly.io/docs/blueprints/
- URL: https://fly.io/docs/reference/
- Used for: information architecture patterns that make it easy to move from quickstart to guides to reference, plus concise task-first headings.

### Diataxis

- URL: https://diataxis.fr/
- Used for: reinforcing the split between getting started, concept, how-to, troubleshooting, and reference content.

## Product context and public framing

### E2E Networks E1 Series product page

- URL: https://www.e2enetworks.com/products/e1-series
- Used for: public framing of E1 behavior and likely user value, while keeping the documentation as the behavioral source of truth.

### E2E Networks Marketplace docs

- URL: https://docs.e2enetworks.com/docs/myaccount/node/marketplace/
- Used for: marketplace-based launch framing and app-image workflow language.

## Supporting technical context

### OpenNebula contextualization docs

- URL: https://docs.opennebula.io/7.0/product/virtual_machines_operation/guest_operating_systems/kvm_contextualization/
- Used for: explaining why `one-context` matters in imported images without inventing undocumented E2E behavior.

### OpenNebula context package releases

- URL: https://github.com/OpenNebula/addon-context-linux/releases
- Used for: confirming that the package family referenced in the documentation is real and actively versioned, while not overriding the pinned install examples.

## Notes on use

- External sources were used for structure, terminology, and public context.
- When public context and the documentation differed, the documentation was treated as the operational source of truth unless the difference was explicitly called out as a gap.
