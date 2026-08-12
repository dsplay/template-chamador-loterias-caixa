#!/usr/bin/env bash
set -e

# Generates template-variables.json + template-example-data.json (see
# @dsplay/template-manifest), which the DSPLAY CMS reads to auto-detect this
# template's variables and seed default preview values.
npx dsplay-scan-template --src scripts --dsplay-data scripts/dsplay-data.js --out .

INPUT="index.html assets scripts styles template-variables.json template-example-data.json"
OUTPUT=template.zip

rm -f $OUTPUT
zip -r $OUTPUT $INPUT
