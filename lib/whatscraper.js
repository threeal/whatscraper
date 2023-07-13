#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const venom = __importStar(require("venom-bot"));
const utils_1 = require("./utils");
const get_messages_1 = require("./utils/get_messages");
const startDate = new Date("2023-07-05");
const endDate = new Date("2023-07-12");
async function launch() {
    process.stdout.write("Initializing venom client...\n");
    const client = await venom.create({ headless: false, session: "test" });
    process.stdout.write(`Getting personal chat since ${startDate.toLocaleDateString()}...\n`);
    const chats = await (0, utils_1.getPersonalChatsSince)(client, startDate);
    process.stdout.write(`Found ${chats.length} chats\n`);
    for (const chat of chats) {
        const date = new Date(chat.timestamp);
        process.stdout.write(`  ${date.toLocaleDateString()} ${chat.id} ${chat.name}\n`);
    }
    process.stdout.write("\n");
    process.stdout.write(`Get first message from each chat concurrently...\n`);
    const chatProms = [];
    for (const chat of chats) {
        const prom = (0, get_messages_1.getFirstMessage)(client, chat.id, startDate, endDate);
        chatProms.push([chat, prom]);
    }
    for (const [chat, prom] of chatProms) {
        const message = await prom;
        if (message === undefined) {
            process.stdout.write(chalk_1.default.blackBright(`${chat.id} ${chat.name}: no message\n`));
        }
        else {
            const date = new Date(message.timestamp * 1000);
            process.stdout.write(`${chat.id} ${chat.name}: on ${date.toLocaleDateString()} ${date.toLocaleTimeString()}\n`);
            process.stdout.write(`${message.body}\n\n`);
        }
    }
    process.stdout.write("Done");
}
launch();
//# sourceMappingURL=whatscraper.js.map