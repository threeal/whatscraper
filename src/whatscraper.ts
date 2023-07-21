#!/usr/bin/env node

import * as commands from "./commands";

async function launch() {
  await commands.selectCommand();
}

launch();
