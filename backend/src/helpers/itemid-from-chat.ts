export const getItemIdFromMessage = (message: string): number => {
  const entryIdStartIndex = message.indexOf("item:") + 5
  const entryIdEndIndex = message.indexOf(":", entryIdStartIndex + 1)
  return parseInt(message.substring(entryIdStartIndex, entryIdEndIndex))
}
