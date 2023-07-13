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

  process.stdout.write("Done");
}

launch();
