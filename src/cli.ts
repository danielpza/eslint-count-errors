#!/usr/bin/env node
import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";

import { main } from "./index.js";

const argv = await yargs(hideBin(process.argv))
  .scriptName("eslint-count-errors")
  .usage("$0 <pattern>")
  .option("by-file", {
    type: "boolean",
    description: "Show the summary grouped by file",
    default: false,
  })
  .example("$0 ./src", "Count eslint errors in the current folder").argv;

const { _: patterns, byFile } = argv;

await main(
  patterns.map((p) => p.toString()),
  { byFile }
);
