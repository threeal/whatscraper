"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFirstMessageId = void 0;
async function getFirstMessageId(chatId, startTimestamp) {
    const chat = WAPI.getChat(chatId);
    let id = undefined;
    let count = 0;
    while (true) {
        if (chat.msgs._models.length > 0) {
            const model = chat.msgs._models[0];
            if (model.t < startTimestamp)
                return undefined;
            if (id === model.id._serialized) {
                if (++count >= 10)
                    return id;
            }
            else {
                id = model.id._serialized;
                count = 0;
            }
        }
        if (chat.msgs.msgLoadState.noEarlierMsgs)
            return id;
        await chat.onEmptyMRM();
        await WAPI.sleep(100);
    }
}
exports.getFirstMessageId = getFirstMessageId;
//# sourceMappingURL=get_first_message_id.js.map