#!/usr/bin/env node

import chalk from "chalk";
import * as venom from "venom-bot";
import { Chat, getPersonalChatsSince } from "./utils";
import { getFirstMessage } from "./utils/get_messages";

const startDate = new Date("2023-07-05");
const endDate = new Date("2023-07-12");
async function launch() {
  process.stdout.write("Initializing venom client...\n");
  const client = await venom.create({headless:false, session: "test"});

  process.stdout.write(`Getting personal chat since ${startDate.toLocaleDateString()}...\n`);
  const chats = await getPersonalChatsSince(client, startDate);

  process.stdout.write(`Found ${chats.length} chats\n`);
  for (const chat of chats) {
    const date = new Date(chat.timestamp);
    process.stdout.write(`  ${date.toLocaleDateString()} ${chat.id} ${chat.name}\n`);
  }
  process.stdout.write("\n");
  process.stdout.write(`Get first message from each chat concurrently...\n`);
  const chatProms: [Chat, Promise<venom.Message | undefined>][] = [];
  for (const chat of chats) {
    const prom = getFirstMessage(client, chat.id, startDate, endDate);
    chatProms.push([chat, prom]);
  }

  for (const [chat, prom] of chatProms) {
    const message = await prom;
    if (message === undefined) {
      process.stdout.write(chalk.blackBright(`${chat.id} ${chat.name}: no message\n`));
    } else {
      const date = new Date(message.timestamp * 1000);
      process.stdout.write(`${chat.id} ${chat.name}: on ${date.toLocaleDateString()} ${date.toLocaleTimeString()}\n`);
      process.stdout.write(`${message.body}\n\n`);
    }
  }

  process.stdout.write("Done");
}

launch();
