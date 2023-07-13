import { Message, Whatsapp } from "venom-bot";
import { getFirstMessageId } from "./get_first_message_id";

export async function getFirstMessage(client: Whatsapp, chatId: string, startDate: Date, endDate: Date): Promise<Message | undefined> {
  const messageId = await client.page.evaluate(getFirstMessageId, chatId, startDate.getTime() / 1000);
  if (messageId === undefined) return undefined;
  const message = await client.getMessageById(messageId);
  if (message.timestamp * 1000 > endDate.getTime()) return undefined;
  return message;
}
