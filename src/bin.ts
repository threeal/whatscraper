#!/usr/bin/env node

import * as venom from "venom-bot";
import { Command, selectCommand } from "./internal/inputs.js";

const exitCommand: Command = {
  name: "Exit",
  trigger: () => {
    process.exit();
  },
};

await selectCommand([
  {
    name: "Run WhatsApp",
    trigger: async () => {
      await venom.create({ headless: false, session: "default" });
      setTimeout(() => {
        void selectCommand([exitCommand]);
      }, 1500);
    },
  },
  exitCommand,
]);
