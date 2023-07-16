import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { SimpleMessage } from "./get_simple_message.js";

interface Schema {
  contacts: {[id: string]: {
    lastChatTimestamp: number;
    firstNMessages: SimpleMessage[];
  }};
};

export async function setupDatabase(): Promise<Low<Schema>> {
  const adapter = new JSONFile<Schema>("db.json");
  const db = new Low<Schema>(adapter, { contacts: {}});
  await db.read();
  return db;
}
