#!/usr/bin/env node

import * as venom from "venom-bot";
import { selectCommand } from "./inputs";

async function launch() {
  await selectCommand([
    {
      name: "Run WhatsApp",
      trigger: async () => {
        await venom.create({ headless: false, session: "default" });
      },
    },
    {
      name: "Exit",
      trigger: () => {
        process.exit();
      },
    },
  ]);
}

launch();
