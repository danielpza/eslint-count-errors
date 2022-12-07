#!/usr/bin/env node
import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";

import { main } from "./index.js";

const argv = await yargs(hideBin(process.argv))
  .scriptName("eslint-count-errors")
  .usage("$0 <pattern>")
  .example("$0 ./src", "Count eslint errors in the current folder").argv;

const {
  _: [pattern],
} = argv;

await main(String(pattern));
