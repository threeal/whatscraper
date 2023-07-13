import { Whatsapp } from "venom-bot";
export interface Chat {
    id: string;
    name: string;
    isGroup: boolean;
    timestamp: number;
}
export declare function getChats(client: Whatsapp): Promise<Chat[]>;
export declare function getPersonalChats(client: Whatsapp): Promise<Chat[]>;
export declare function getPersonalChatsSince(client: Whatsapp, date: Date): Promise<Chat[]>;
