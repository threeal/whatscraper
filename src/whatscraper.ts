#!/usr/bin/env node

import * as venom from "venom-bot";
import { Command, selectCommand } from "./inputs";

const exitCommand: Command = {
  name: "Exit",
  trigger: () => {
    process.exit();
  },
};

async function launch() {
  await selectCommand([
    {
      name: "Run WhatsApp",
      trigger: async () => {
        await venom.create({ headless: false, session: "default" });
        setTimeout(() => selectCommand([exitCommand]), 1500);
      },
    },
    exitCommand,
  ]);
}

launch();
