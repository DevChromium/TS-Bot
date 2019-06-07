import * as Discord from "discord.js";
import { IBotCommand } from '../structures/command';
import { SSL_OP_NETSCAPE_CHALLENGE_BUG } from "constants";

export default class purge implements IBotCommand {

    private readonly _command = "purge";

    help(): string {
        return "[ADMIN ONLY] Deletes thee desired number of messages from the channel.";
    }

    isThisCommand(command: string): boolean {
        return command === this._command;
    }

   async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {
        
        msgObject.delete(0);

        if (!msgObject.member.hasPermission("MANAGE_MESSAGES")) {
            msgObject.channel.send("Sorry pal! You do not seem to have the permission `MANAGE_MESSAGES`")
                .then(msg => {
                    (msg as Discord.Message).delete(5000);
                })
                .catch(console.error);
            return;
        }

        if(!args[0]) {
            msgObject.channel.send("Sorry pal! You have to supply an amount of messages to delete.")
                .then(msg => {
                    (msg as Discord.Message).delete(5000);
                })
                .catch(console.error);
            return;
        }

        let amount = Number(args[0]);
        if(isNaN(amount)) {
            msgObject.channel.send("Sorry pal! You haven't entered a valid number.")
                .then(msg => {
                    (msg as Discord.Message).delete(5000);
                })
                .catch(console.error);
            return;
        }
        amount = Math.round(amount + 1);
        msgObject.channel.bulkDelete(amount)
        .catch(console.error)

    }


}