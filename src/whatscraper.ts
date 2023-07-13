#!/usr/bin/env node

import * as venom from "venom-bot";

async function launch() {
  await venom.create({ headless: false, session: "default" });
}

launch();
