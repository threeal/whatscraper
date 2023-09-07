#!/usr/bin/env node

import * as venom from "venom-bot";
import { getFirstNSimpleMessages, getPersonalChats, setupDatabase } from "./utils/index.js";

const startDate = new Date("2023-08-28");
const endDate = new Date("2024-01-01");
async function launch() {
  process.stdout.write("Initializing venom client...\n");
  const client = await venom.create({headless:false, session: "test"});

  process.stdout.write("Initializing database...\n");
  const db = await setupDatabase();

  process.stdout.write(`Getting personal chat since ${startDate.toLocaleDateString()}...\n`);
  const chats = await getPersonalChats(client);

  const newChatCounts = chats.length - Object.keys(db.data.contacts).length;
  process.stdout.write(`Found ${chats.length} chats, ${newChatCounts} new chats\n`);
  for (const chat of chats) {
    const date = new Date(chat.timestamp);
    process.stdout.write(`  ${date.toLocaleDateString()} ${date.toLocaleTimeString()} ${chat.id} ${chat.name}\n`);
  }
  process.stdout.write("\n");

  process.stdout.write(`Get first 6 messages from each chat concurrently...\n`);
  let i = 0;
  for (const chat of chats) {
    if (Number.isNaN(chat.timestamp)) {
      continue;
    }

    if (chat.id in db.data.contacts) {
      if (db.data.contacts[chat.id].firstNMessages.length > 0) {
        process.stdout.write(`skipping ${++i} ${chat.id}\n`);
        continue;
      }
    }

    const messages = await getFirstNSimpleMessages(client, 6, chat.id, startDate, endDate);
    // if (chat.id in db.data.contacts) {
    //   const firstNMessages = db.data.contacts[chat.id].firstNMessages;
    //   if (firstNMessages.length > 0 && messages.length > 0) {
    //     if (firstNMessages[0].timestamp < messages[0].timestamp) {
    //       process.stdout.write(`skipping ${++i} ${chat.id}, newer timestamp\n`);
    //       continue;
    //     } else {
    //       process.stdout.write(`replacing ${chat.id}, older timestamp\n`);
    //     }
    //   }
    // }

    db.data.contacts[chat.id] = {
      lastChatTimestamp: chat.timestamp,
      firstNMessages: messages,
    };
    await db.write();
    process.stdout.write(`processed ${++i} ${chat.id} ${messages.length}\n`);
  }

  process.stdout.write("Done");
}

launch();
