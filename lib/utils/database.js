import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
;
export async function setupDatabase() {
    const adapter = new JSONFile("db.json");
    const db = new Low(adapter, { contacts: {} });
    await db.read();
    return db;
}
//# sourceMappingURL=database.js.map