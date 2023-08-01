export interface Command {
    name: string;
    trigger: () => Promise<void>;
}
export declare function selectCommand(commands: Command[]): Promise<void>;
