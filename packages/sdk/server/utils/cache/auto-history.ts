export interface CacheMessage {
  role: string;
  content: string;
  attachments?: { path: string }[] | undefined;
}

export function getAutoCacheLookupHistory(
  currentHistory: CacheMessage[],
) {
  if (currentHistory.length <= 1) {
    return [];
  }

  return currentHistory.slice(0, -1);
}

export function buildAutoCacheSaveHistory(
  currentHistory: CacheMessage[],
  assistantResponse: string,
) {
  return [
    ...currentHistory,
    {
      role: "assistant",
      content: assistantResponse,
    },
  ];
}
