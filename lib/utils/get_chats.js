"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPersonalChatsSince = exports.getPersonalChats = exports.getChats = void 0;
async function getChats(client) {
    const contacts = await client.getAllChatsContacts();
    return contacts.map(contact => ({
        id: `${contact.id.user}@${contact.id.server}`,
        name: contact.contact.name,
        isGroup: contact.isGroup,
        timestamp: contact.t * 1000
    }));
}
exports.getChats = getChats;
async function getPersonalChats(client) {
    const chats = await getChats(client);
    return chats.filter(chat => !chat.isGroup);
}
exports.getPersonalChats = getPersonalChats;
async function getPersonalChatsSince(client, date) {
    const chats = await getPersonalChats(client);
    const timestamp = date.getTime();
    return chats.filter(chat => chat.timestamp >= timestamp);
}
exports.getPersonalChatsSince = getPersonalChatsSince;
//# sourceMappingURL=get_chats.js.map