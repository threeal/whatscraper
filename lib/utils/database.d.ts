import { Low } from "lowdb";
import { SimpleMessage } from "./get_simple_message.js";
interface Schema {
    contacts: {
        [id: string]: {
            lastChatTimestamp: number;
            firstNMessages: SimpleMessage[];
        };
    };
}
export declare function setupDatabase(): Promise<Low<Schema>>;
export {};
