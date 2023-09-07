import { setupDatabase } from "./utils/index.js";

const startDate = new Date("2023-09-04");
const endDate = new Date("2023-09-11");
const startTimestamp = startDate.getTime();
const endTimestamp = endDate.getTime();

interface Chat {
  id: string;
  firstMessage: string;
}

setupDatabase().then(db => {
  process.stdout.write(`Processing new leads since ${startDate.toLocaleDateString()}\n`);
  const chats: Chat[] = [];
  for (const id in db.data.contacts) {
    const contact = db.data.contacts[id];
    if (contact.firstNMessages.length > 0) {
      if (contact.firstNMessages[0].fromMe) continue;
      const timestamp = contact.firstNMessages[0].timestamp;
      if (timestamp >= startTimestamp && timestamp < endTimestamp) {
        chats.push({ id, firstMessage: contact.firstNMessages[0].content });
      }
    }
  }

  process.stdout.write(`Found ${chats.length} new leads\n`);
  const categories: {[category: string]: number} = {
    "Halo Times (ps)": 0,
    "Halo Times (wb)": 0,
    "Halo Times": 0,
  };

  const unknownChats: Chat[] = [];
  for (const chat of chats) {
    let unknown = true;
    if (chat.firstMessage !== undefined) {
      for (const category in categories) {
        if (chat.firstMessage.includes(category)) {
          ++categories[category];
          unknown = false;
          break;
        }
      }
    }

    if (unknown)
      unknownChats.push(chat);
  }

  process.stdout.write("\nNew leads categories:\n");
  for (const category in categories) {
    const count = categories[category];
    process.stdout.write(`- ${category}: ${count} new leads\n`);
  }

  process.stdout.write(`\nFound ${unknownChats.length} New Leads unknown categories:\n`);
  for (const chat of unknownChats) {
    const contact = db.data.contacts[chat.id];
    const date = new Date(contact.firstNMessages[0].timestamp);
    process.stdout.write(`\n\n${date.toLocaleDateString()} ${chat.id}\n`);

    for (const message of contact.firstNMessages) {
      const date = new Date(message.timestamp);
      const content = `${date.toLocaleTimeString()}\n${message.content}`;

      const shift = message.fromMe ? "\t\t" : "\t";
      const shiftedContent = content
        .split("\n")
        .map(line => `${shift}${line}`)
        .join("\n");

      process.stdout.write(`\n${shiftedContent}\n`);
      if (message.fromMe) break;
    }
  }
});
