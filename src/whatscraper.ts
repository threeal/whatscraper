#!/usr/bin/env node

import * as venom from "venom-bot";
import { Command, selectCommand } from "./inputs.js";

const exitCommand: Command = {
  name: "Exit",
  trigger: async () => {
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
