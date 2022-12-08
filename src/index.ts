import { relative } from "node:path";
import type { ESLint, Linter } from "eslint";
import importCwd from "import-cwd";
import { groupBy, sortBy } from "lodash-es";

interface Options {
  byFile: boolean;
}

function sortMessages(messages: Linter.LintMessage[]) {
  const byRuleId = groupBy(messages, "ruleId");

  const sorted = sortBy(Object.entries(byRuleId), "1.length");

  return sorted.map(([ruleId, messages]) => ({ ruleId, messages }));
}

export async function main(pattern: string[], options: Options) {
  const { ESLint } = importCwd("eslint") as { ESLint: { new (): ESLint } };
  const eslint = new ESLint();

  const results = await eslint.lintFiles(pattern);

  if (options.byFile) {
    let out = "";

    for (const { filePath, messages } of sortBy(results, "messages.length")) {
      const sortedMessages = sortMessages(messages);
      out += `${relative(process.cwd(), filePath)}:\n`;
      for (const { ruleId, messages } of sortedMessages) {
        out += `${String(messages.length).padStart(6)} ${ruleId}\n`;
      }
      out += "\n";
    }

    console.log(out);
  } else {
    const sortedMessages = sortMessages(
      results.flatMap((result) => result.messages)
    );

    let out = "";
    for (const { ruleId, messages } of sortedMessages) {
      out += `${String(messages.length).padStart(4)} ${ruleId}\n`;
    }

    console.log(out);
  }
}
