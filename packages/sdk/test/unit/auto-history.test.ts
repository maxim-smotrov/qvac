// @ts-expect-error brittle has no type declarations
import test from "brittle";
import {
  buildAutoCacheSaveHistory,
  getAutoCacheLookupHistory,
} from "@/server/utils/cache/auto-history";

test("auto kv-cache history: next-turn lookup matches prior saved turn", (t) => {
  const firstTurnHistory = [
    { role: "system", content: "You are a helpful assistant." },
    { role: "user", content: "What is the capital of France?" },
  ];

  const savedHistory = buildAutoCacheSaveHistory(firstTurnHistory, "Paris.");
  const nextTurnHistory = [
    ...savedHistory,
    { role: "user", content: "What about Germany?" },
  ];

  t.alike(getAutoCacheLookupHistory(nextTurnHistory), savedHistory);
});

test("auto kv-cache history: no lookup target for first turn", (t) => {
  t.alike(
    getAutoCacheLookupHistory([
      { role: "user", content: "What is the capital of France?" },
    ]),
    [],
  );
});
