import select from "@inquirer/select";

export interface Command {
  name: string;
  trigger: () => Promise<void>;
}

export async function selectCommand(commands: Command[]): Promise<void> {
  const trigger = await select({
    message: "Select a command",
    choices: commands.map((command) => ({
      name: command.name,
      value: command.trigger,
    })),
  });
  await trigger();
}
