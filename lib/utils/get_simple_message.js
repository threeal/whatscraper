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
            case "video":
                content = `[video] ${message.caption}`;
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
            case "vcard":
                content = "[vcard]";
                break;
            case "audio":
                content = "[audio]";
                break;
            case "location":
                content = "[location]";
                break;
            case "product":
                content = "[product]";
                break;
            case "e2e_notification":
                content = "[e2e_notification]";
                break;
            case "gp2":
                content = "[gp2]";
                break;
            case "poll_creation":
                content = "[poll_creation]";
                break;
            case "multi_vcard":
                content = "[multi_vcard]";
                break;
            case "unknown":
                content = "[unknown]";
                break;
            case "ciphertext":
                content = "[ciphertext]";
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