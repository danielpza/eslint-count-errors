#!/usr/bin/env node

const _ = require("lodash");
const importCwd = require("import-cwd");

(async function main() {
  const { ESLint } = importCwd("eslint");
  const eslint = new ESLint();

  const results = await eslint.lintFiles(process.argv.slice(2));

  console.log(
    _.chain(results)
      .flatMap("messages")
      .countBy("ruleId")
      .map((v, k) => [Number(v), k])
      .sortBy(0)
      .map(([v, k]) => `${_.padStart(v, 4)} ${k}`)
      .join("\n")
      .value()
  );
})().catch((error) => {
  process.exitCode = 1;
  console.error(error);
});
