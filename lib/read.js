import { setupDatabase } from "./utils/index.js";
const startDate = new Date("2023-08-28");
const endDate = new Date("2023-09-04");
const startTimestamp = startDate.getTime();
const endTimestamp = endDate.getTime();
setupDatabase().then(db => {
    let earliestLastChatTimestamp = endTimestamp;
    let latestLastChatTimestamp = startTimestamp;
    ;
    let timestamps = [];
    process.stdout.write(`Processing new leads since ${startDate.toLocaleDateString()}\n`);
    const chats = [];
    for (const id in db.data.contacts) {
        const contact = db.data.contacts[id];
        if (contact.firstNMessages.length > 0) {
            if (contact.firstNMessages[0].fromMe)
                continue;
            const timestamp = contact.firstNMessages[0].timestamp;
            if (timestamp >= startTimestamp && timestamp < endTimestamp) {
                timestamps.push([timestamp, id]);
                chats.push({ id, firstMessage: contact.firstNMessages[0].content });
                if (contact.lastChatTimestamp < earliestLastChatTimestamp) {
                    earliestLastChatTimestamp = contact.lastChatTimestamp;
                }
            }
        }
        if (contact.lastChatTimestamp > latestLastChatTimestamp) {
            latestLastChatTimestamp = contact.lastChatTimestamp;
        }
    }
    // for (const [timestamp, id] of timestamps.sort((a, b) => a[0] - b[0])) {
    //   const date = new Date(timestamp);
    //   console.log(`${date.toLocaleDateString()} ${date.toLocaleTimeString()} ${id}`);
    // }
    let earliestLastChatDate = new Date(earliestLastChatTimestamp);
    process.stdout.write(`Earliest last chat is ${earliestLastChatDate.toLocaleDateString()} ${earliestLastChatDate.toLocaleTimeString()}\n`);
    let latestLastChatDate = new Date(latestLastChatTimestamp);
    process.stdout.write(`Latest last chat is ${latestLastChatDate.toLocaleDateString()} ${latestLastChatDate.toLocaleTimeString()}\n`);
    process.stdout.write(`Found ${chats.length} new leads\n`);
    const categories = {
        "Hello Mediamaz Translation (ads)": 0,
        "Hello Mediamaz Translation (os)": 0,
        "Hello Mediamaz Translation (sc)": 0,
        "Hello Mediamaz Translation (sc-ads)": 0,
        "Hello Mediamaz Translation (ps)": 0,
        "Hello Mediamaz Translation (mt-ps)": 0,
        "Hello Mediamaz Translation": 0,
        "Hello Mediamaz TS (bali) (ps)": 0,
        "Hello Mediamaz TS (apostille) (ps)": 0,
        "Hello Mediamaz TS (apostille)": 0,
        "Hello Mediamaz TS (penerjemahtersumpah) (ps)": 0,
        "Hello Mediamaz TS (penerjemahtersumpah)": 0,
        "Hello Mediamaz TS (proofreading) (ps)": 0,
        "Hello Mediamaz TS (os)": 0,
        "Hello Mediamaz TS": 0,
        "Mediamaz Translation Service (os)": 0,
        "Hello Bootcamp Mediamaz (ps)": 0,
        "Hello Bootcamp Mediamaz": 0,
        "[G-A] Hello Go-Penerjemah": 0,
        "[OS] Hello Go-Penerjemah": 0,
        "Halo Go Penerjemah (os)": 0,
        "Hello Go Penerjemah (sc)": 0,
        "Hello Mediamaz Work (os)": 0,
        "Hello Mediamaz Work (ps)": 0,
        "Hello Mediamaz Work (SC)": 0,
        "Halo Mediamaz Work": 0,
        "Hallo Penerjemah Website (Microsite)": 0,
        "Mediamaz Translation Service (ps)": 0,
        "(SC) Halo, saya mau tanya terkait Interpreter": 0,
        "(SC) Halo, saya ingin tanya soal Bootcamp": 0,
        "(SC) Halo Mediamaz": 0,
        "(SC) Halo, Apa Diskon Bootcamp untuk mahasiswa Unas masih?": 0,
        "(SC) Halo, Apa Diskon Bootcampnya masih?": 0,
        "(SC) Halo, saya mau daftar lowongan (Penerjemah Dokumen/Interpreter)": 0,
        "(SC) Halo Times Penerjemah": 0,
        "(SC) Hallo Mega Penerjemah": 0
    };
    const unknownChats = [];
    for (const chat of chats) {
        let unknown = true;
        if (chat.firstMessage !== undefined) {
            for (const category in categories) {
                if (chat.firstMessage.toLowerCase().includes(category.toLowerCase())) {
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
            if (message.fromMe)
                break;
        }
    }
});
//# sourceMappingURL=read.js.map