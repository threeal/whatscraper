export async function getFirstMessageId(chatId, startTimestamp) {
    const chat = WAPI.getChat(chatId);
    let id = undefined;
    let count = 0;
    while (true) {
        for (const model of chat.msgs._models) {
            if (model.type.includes('notif'))
                continue;
            if (model.type === 'gp2')
                continue;
            if (model.t < startTimestamp)
                return undefined;
            if (id === model.id._serialized) {
                if (++count >= 50)
                    return { id: id };
            }
            else {
                id = model.id._serialized;
                count = 0;
            }
            break;
        }
        if (chat.msgs.msgLoadState.noEarlierMsgs)
            return { id: id };
        await chat.onEmptyMRM();
        await WAPI.sleep(100);
    }
}
//# sourceMappingURL=get_first_message_id.js.map