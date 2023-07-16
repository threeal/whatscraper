import { getFirstNMessages } from "./get_message.js";
export async function getFirstNSimpleMessages(client, n, chatId, startDate, endDate) {
    const startTimestamp = startDate.getTime() / 1000;
    const endTimestamp = endDate.getTime() / 1000;
    const raw = await client.page.evaluate(getFirstNMessages, chatId, n, startTimestamp, endTimestamp);
    const messages = JSON.parse(raw);
    return messages.map(message => {
        let content = message.body;
        switch (message.type) {
            case "chat": break;
            case "document":
                content = `[${message.filename}] ${message.caption}`;
                break;
            case "image":
                content = message.caption;
                break;
            case "sticker":
                content = "[sticker]";
                break;
            case "revoked":
                content = "[message is revoked]";
                break;
            case "call_log":
                content = "[call log]";
                break;
            case "ptt":
                content = "[voice note]";
                break;
            default:
                content = JSON.stringify(message);
        }
        return {
            timestamp: message.t * 1000,
            fromMe: message.id.fromMe,
            content: content,
        };
    });
}
//# sourceMappingURL=get_simple_message.js.map