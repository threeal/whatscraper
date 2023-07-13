import {Whatsapp} from "venom-bot";

export interface Chat {
  id: string;
  name: string;
  isGroup: boolean;
  timestamp: number;
}

export async function getChats(client: Whatsapp) : Promise<Chat[]> {
  const contacts = await client.getAllChatsContacts() as {
    id: { server: string; user: string };
    contact: { name: string };
    isGroup: boolean;
    t: number;
  }[];
  return contacts.map(contact => ({
    id: `${contact.id.user}@${contact.id.server}`,
    name: contact.contact.name,
    isGroup: contact.isGroup,
    timestamp: contact.t * 1000
  }));
}

export async function getPersonalChats(client: Whatsapp) : Promise<Chat[]> {
  const chats = await getChats(client);
  return chats.filter(chat => !chat.isGroup);
}

export async function getPersonalChatsSince(client: Whatsapp, date: Date) : Promise<Chat[]> {
  const chats = await getPersonalChats(client);
  const timestamp = date.getTime();
  return chats.filter(chat => chat.timestamp >= timestamp);
}
