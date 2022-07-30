export const formatBufferForPrint = (packetData: Buffer) =>
  packetData.toString("hex").match(/../g).join(" ")
