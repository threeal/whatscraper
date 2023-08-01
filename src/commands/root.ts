import select from "@inquirer/select";
import * as venom from "venom-bot";

export async function selectCommand() {
  const trigger = await select({
    message: "Select a command",
    choices: [
      {
        name: "Run WhatsApp",
        value: async () => {
          await venom.create({ headless: false, session: "default" });
        },
      },
      {
        name: "Exit",
        value: () => {
          process.exit();
        },
      },
    ],
  });

  await trigger();
}
