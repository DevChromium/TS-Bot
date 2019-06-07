import * as Discord from "discord.js";
import {IBotCommand} from '../structures/command';

export default class templateCommand implements IBotCommand {
    
    private readonly _command = "templatecommand";
    
    help(): string {
        return "This command does absolutely nothing!";
    } 

    isThisCommand(command: string): boolean {
        return command === this._command;
    }

    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {
        msgObject.channel.send("It worked!");
    }


}