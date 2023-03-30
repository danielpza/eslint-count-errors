#!/usr/bin/env node
import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";

import { main } from "./index.js";

const argv = await yargs(hideBin(process.argv))
  .scriptName("eslint-count-errors")
  .usage("$0 <pattern>")
  .option("errors-only", {
    type: "boolean",
    description: "Only check for errors, ingore warnings",
    default: false,
  })
  .option("format", {
    type: "string",
    description: "Specifies how to display output summary",
    default: "count",
    choices: ["count", "by-file", "eslint-warn"],
  })
  .example("$0 ./src", "Count eslint errors in the current folder").argv;

const { _: patterns, format, errorsOnly } = argv;

await main(
  patterns.map((p) => p.toString()),
  { errorsOnly, format: format as any }
);
