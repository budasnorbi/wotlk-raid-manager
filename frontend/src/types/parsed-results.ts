import { ChatType, Language } from "./chat"

export interface SMSG_MESSAGECHAT_RETURN {
  type: ChatType
  language: Language
  senderGUID: Buffer
  receiverGUID: Buffer
  messageLength: number
  message: string
  chatTag: number
}
