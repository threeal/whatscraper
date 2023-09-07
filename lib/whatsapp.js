#!/usr/bin/env node
import * as venom from "venom-bot";
async function launch() {
    process.stdout.write("Initializing venom client...\n");
    await venom.create({ headless: false, session: "test" });
    process.stdout.write("Done");
}
launch();
//# sourceMappingURL=whatsapp.js.map