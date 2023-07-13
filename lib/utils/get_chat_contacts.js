"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChatContacts = void 0;
async function getChatContacts(client) {
    const contacts = await client.getAllChatsContacts();
    return contacts.map(contact => ({
        id: `${contact.id.user}@${contact.id.server}`,
        name: contact.contact.name,
        isGroup: contact.isGroup,
        timestamp: contact.t * 1000
    }));
}
exports.getChatContacts = getChatContacts;
//# sourceMappingURL=get_chat_contacts.js.map