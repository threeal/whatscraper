import { Whatsapp } from "venom-bot";
interface Contact {
    id: string;
    name: string;
    isGroup: boolean;
    timestamp: number;
}
export declare function getChatContacts(client: Whatsapp): Promise<Contact[]>;
export {};
