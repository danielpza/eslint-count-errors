import type { ESLint } from "eslint";
import importCwd from "import-cwd";

export async function main(pattern: string[]) {
  const { ESLint } = importCwd("eslint") as { ESLint: { new (): ESLint } };
  const eslint = new ESLint();

  const results = await eslint.lintFiles(pattern);

  const ruleCount: Record<string, number> = {};

  for (const result of results) {
    for (const message of result.messages) {
      if (!message.ruleId) continue;
      ruleCount[message.ruleId] ??= 0;
      ruleCount[message.ruleId] += 1;
    }
  }

  const sortedRules = Object.entries(ruleCount).sort(([, a], [, b]) => a - b);

  console.log(sortedRules.map(([v, k]) => `${v.padStart(4)} ${k}`).join("\n"));
}
