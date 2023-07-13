import { Message, Whatsapp } from "venom-bot";
export declare function getFirstMessage(client: Whatsapp, chatId: string, startDate: Date, endDate: Date): Promise<Message | undefined>;
