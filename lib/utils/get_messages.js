"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFirstMessage = void 0;
const get_first_message_id_1 = require("./get_first_message_id");
async function getFirstMessage(client, chatId, startDate, endDate) {
    const messageId = await client.page.evaluate(get_first_message_id_1.getFirstMessageId, chatId, startDate.getTime() / 1000);
    if (messageId === undefined)
        return undefined;
    const message = await client.getMessageById(messageId);
    if (message.timestamp * 1000 > endDate.getTime())
        return undefined;
    return message;
}
exports.getFirstMessage = getFirstMessage;
//# sourceMappingURL=get_messages.js.map