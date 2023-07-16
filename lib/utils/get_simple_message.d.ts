import { Whatsapp } from "venom-bot";
export interface SimpleMessage {
    timestamp: number;
    fromMe: boolean;
    content: string;
}
export declare function getFirstNSimpleMessages(client: Whatsapp, n: number, chatId: string, startDate: Date, endDate: Date): Promise<SimpleMessage[]>;
