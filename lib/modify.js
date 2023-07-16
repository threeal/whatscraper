import { setupDatabase } from "./utils/index.js";
setupDatabase().then(db => {
    for (const key in db.data.contacts) {
        const contact = db.data.contacts[key];
        // delete contact["raw"];
        db.data.contacts[key] = contact;
    }
    db.write();
});
//# sourceMappingURL=modify.js.map