import { setupDatabase } from "./utils/index.js";
// 441 tgl 10
// 392 tgl 11
// 313 tgl 12
// 190 tgl 13
const startDate = new Date("2023-07-13");
const startTimestamp = startDate.getTime();
setupDatabase().then(db => {
    // process.stdout.write(`Processing new leads since ${startDate.toLocaleDateString()}\n`);
    // const chats: Chat[] = [];
    // for (const id in db.data.contacts) {
    //   const contact = db.data.contacts[id];
    //   if (contact.firstMessage !== undefined) {
    //     const msg = contact.firstMessage.raw as { t: number; body: string };
    //     const timestamp = msg.t * 1000;
    //     if (timestamp >= startTimestamp) {
    //       chats.push({id, timestamp, message: msg.body});
    //     }
    //   }
    // }
    // process.stdout.write(`Found ${chats.length} new leads\n`);
    // const categories: {[category: string]: number} = {
    //   "Hello Mediamaz Translation (ads)": 0,
    //   "Hello Mediamaz Translation (os)": 0,
    //   "Hello Mediamaz Translation (sc)": 0,
    //   "Hello Mediamaz TS (bali) (ps)": 0,
    //   "Hello Mediamaz TS (apostille) (ps)": 0,
    //   "Hello Mediamaz TS (apostille)": 0,
    //   "Hello Mediamaz TS (penerjemahtersumpah)": 0,
    //   "Hello Mediamaz TS (proofreading) (ps)": 0,
    //   "Hello Mediamaz TS (os)": 0,
    //   "Hello Mediamaz Translation (sc-ads)": 0,
    //   "Mediamaz Translation Service (os)": 0,
    //   "Hello Mediamaz Work (ps)": 0,
    //   "Hello Bootcamp Mediamaz (ps)": 0,
    //   "[G-A] Hello Go-Penerjemah": 0,
    // };
    // const unknownChats: Chat[] = [];
    // for (const chat of chats) {
    //   let unknown = true;
    //   if (chat.message !== undefined) {
    //     for (const category in categories) {
    //       if (chat.message.includes(category)) {
    //         ++categories[category];
    //         unknown = false;
    //       }
    //     }
    //   }
    //   if (unknown)
    //     unknownChats.push(chat);
    // }
    // process.stdout.write("\nNew leads categories:\n");
    // for (const category in categories) {
    //   const count = categories[category];
    //   process.stdout.write(`- ${category}: ${count} new leads\n`);
    // }
    // process.stdout.write(`\nFound ${unknownChats.length} New Leads unknown categories:\n`);
    // for (const chat of unknownChats) {
    //   const date = new Date(chat.timestamp);
    //   process.stdout.write(`\n${date.toLocaleDateString()} ${chat.id}\n${chat.message}\n`);
    // }
});
//# sourceMappingURL=read.js.map