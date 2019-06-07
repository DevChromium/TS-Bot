import * as Discord from "discord.js";
import { IBotCommand } from '../structures/command';

export default class ban implements IBotCommand {

    private readonly _command = "ban";

    help(): string {
        return "[ADMIN ONLY] Bans the mentioned user.";
    }

    isThisCommand(command: string): boolean {
        return command === this._command;
    }

    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {

        let mentionedUser = msgObject.mentions.users.first();
        let suppliedReason = args.slice(2).join(" ") || "";
        let banLength = Number(args[1])
        if (isNaN(banLength)) { 
            msgObject.channel.send("Sorry pal! You have to give me an amount of days to ban the person.`")
                .then(msg => {
                    (msg as Discord.Message).delete(5000);
                })
                .catch(console.error);
            return;
        }
        let banLog = `${msgObject.author.username}: ${suppliedReason} | Length: ${banLength} days`;

        msgObject.delete(0);
        if (!msgObject.member.hasPermission("BAN_MEMBERS")) {
            msgObject.channel.send("Sorry pal! You do not seem to have the permission `BAN_MEMBERS`")
                .then(msg => {
                    (msg as Discord.Message).delete(5000);
                })
                .catch(console.error);
            return;
        }
        if (!mentionedUser) {
            msgObject.channel.send("Sorry pal! I couldn't find the person you were referring to.")
                .then(msg => {
                    (msg as Discord.Message).delete(5000);
                })
                .catch(console.error);
            return;
        }


        msgObject.guild.ban(mentionedUser, { days: banLength, reason: banLog})
            .then(console.log)
            .catch(console.error)

    }


}