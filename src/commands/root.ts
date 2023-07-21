import select from "@inquirer/select";
import * as venom from "venom-bot";

export async function selectCommand() {
  const command = await select({
    message: "Select a command",
    choices: [
      { name: "Run WhatsApp", value: "run-wa" },
      { name: "Exit", value: "exit" },
    ],
  });

  switch (command) {
    case "run-wa": {
      await venom.create({ headless: false, session: "default" });
      break;
    }
    case "exit": {
      process.exit();
      break;
    }
    default:
      throw new Error(`Unknown command: ${command}`);
  }
}
