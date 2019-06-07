import * as Discord from "discord.js";
import { IBotCommand } from '../structures/command';

export default class kick implements IBotCommand {

    private readonly _command = "kick";

    help(): string {
        return "[ADMIN ONLY] Kicks the mentioned user.";
    }

    isThisCommand(command: string): boolean {
        return command === this._command;
    }

    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {
        
        let mentionedUser = msgObject.mentions.users.first();
        let suppliedReason = args.slice(1).join(" ") || "";
        let kickLog = `${msgObject.author.username}: ${suppliedReason}`;

        msgObject.delete(0);
        if(!msgObject.member.hasPermission("KICK_MEMBERS")){
            msgObject.channel.send("Sorry pal! You do not seem to have the permission `KICK_MEMBERS`")
            .then(msg => {
                (msg as Discord.Message).delete(5000);
            })
            .catch(console.error);
            return;
        }
        if(!mentionedUser) {
            msgObject.channel.send("Sorry pal! I couldn't find the person you were referring to.")
                .then(msg => {
                    (msg as Discord.Message).delete(5000);
                })
                .catch(console.error);
            return;
        }
      

        msgObject.guild.member(mentionedUser).kick(kickLog)
        .then()
        .catch(console.error)

    }


}