export async function getFirstNMessages(chatId, n, startTimestamp, endTimestamp) {
  const chat = await WAPI.getChat(chatId);
  const getFirstMessageId = async (chat, startTimestamp) => {
    let id = undefined;
    let count = 0;
    while (true) {
      for (const model of chat.msgs._models) {
        if (model.type.includes('notif')) continue;
        if (model.type === 'gp2') continue;
        if (model.type === 'protocol') continue;
        if (model.t < startTimestamp) return undefined;
        if (id === model.id._serialized) {
          if (++count >= 50) return id;
        } else {
          id = model.id._serialized;
          count = 0;
        }
        break;
      }
      if (chat.msgs.msgLoadState.noEarlierMsgs) return id;
      await chat.onEmptyMRM();
      await WAPI.sleep(100);
    }
  }

  const messageId = await getFirstMessageId(chat, startTimestamp);
  if (messageId !== undefined) {
    for (const [index, model] of chat.msgs._models.entries()) {
      if (model.id._serialized === messageId) {
        const messages = chat.msgs._models
          .slice(index, index + n)
          .filter(model => model.t < endTimestamp);
        return JSON.stringify(messages);
      }
    }
  }
  return "[]";
}
