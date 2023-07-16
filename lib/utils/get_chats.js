export async function getChats(client) {
    const contacts = await client.getAllChatsContacts();
    return contacts.map(contact => ({
        id: `${contact.id.user}@${contact.id.server}`,
        name: contact.contact.name,
        isGroup: contact.isGroup,
        timestamp: contact.t * 1000
    }));
}
export async function getPersonalChats(client) {
    const chats = await getChats(client);
    return chats.filter(chat => !chat.isGroup);
}
export async function getPersonalChatsSince(client, date) {
    const chats = await getPersonalChats(client);
    const timestamp = date.getTime();
    return chats.filter(chat => chat.timestamp >= timestamp);
}
//# sourceMappingURL=get_chats.js.map