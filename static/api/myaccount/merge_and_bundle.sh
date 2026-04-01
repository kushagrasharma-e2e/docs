#!/bin/sh

set -eu

ROOT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
OUTPUT_DIR="$ROOT_DIR/_build"
SWAGGER_CLI="$ROOT_DIR/../../../node_modules/.bin/swagger-cli"

mkdir -p "$OUTPUT_DIR"

# Merge domain path fragments into a single paths file before bundling.
cat \
  "$ROOT_DIR/paths/compute/nodes.yaml" \
  "$ROOT_DIR/paths/network/load-balancers.yaml" \
  "$ROOT_DIR/paths/billing/invoices.yaml" \
  > "$ROOT_DIR/merged_output.yaml"

"$SWAGGER_CLI" bundle "$ROOT_DIR/myaccount.yaml" --outfile "$OUTPUT_DIR/openapi.yaml" --type yaml
"$SWAGGER_CLI" validate "$OUTPUT_DIR/openapi.yaml"
