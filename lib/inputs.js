"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectCommand = void 0;
const select_1 = __importDefault(require("@inquirer/select"));
async function selectCommand(commands) {
    const trigger = await (0, select_1.default)({
        message: "Select a command",
        choices: commands.map((command) => ({
            name: command.name,
            value: command.trigger,
        })),
    });
    await trigger();
}
exports.selectCommand = selectCommand;
//# sourceMappingURL=inputs.js.map