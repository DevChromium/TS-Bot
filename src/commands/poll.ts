import * as Discord from "discord.js";
import { IBotCommand } from '../structures/command';

export default class poll implements IBotCommand {

    private readonly _command = "poll";

    help(): string {
        return "Creates a basic poll";
    }

    isThisCommand(command: string): boolean {
        return command === this._command;
    }

    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {
       
        msgObject.delete(0);
        if (!msgObject.member.hasPermission("ADMINISTRATOR")) {
            msgObject.channel.send("Sorry pal! You do not seem to have the permission `ADMINISTRATOR`")
                .then(msg => {
                    (msg as Discord.Message).delete(5000);
                })
                .catch(console.error);
            return;
        }

        if(args.length < 1) { return; }
        let pollEmbed = new Discord.RichEmbed()
                    .setTitle("Poll")
                    .setDescription(args.join(" "))
                    .setColor("#f44842");

        let pollMsg = await msgObject.channel.send(pollEmbed);
        await (pollMsg as Discord.Message).react("✅");
        await (pollMsg as Discord.Message).react("❌");
        
        const filter = (reaction: Discord.MessageReaction) => reaction.emoji.name === "✅" || reaction.emoji.name === "❌";

        const results = await (pollMsg as Discord.Message).awaitReactions(filter, { time: 10000} );

        let resultEmbed = new Discord.RichEmbed()
        .setTitle("Poll results")
        .setDescription(`Results for the poll: ${args.join(" ")}`)
        .setColor("##29af0e")
        .addField("Amount of ✅", results.get("✅").count-1 == 1 ? `1 Vote` : `${results.get("✅").count-1} Votes`, true)
        .addField("Amount of ❌", results.get("❌").count-1 == 1 ? `1 Vote` : `${results.get("❌").count-1} Votes`, true);
        

        msgObject.channel.send(resultEmbed);
        (pollMsg as Discord.Message).delete(0);
    }


}