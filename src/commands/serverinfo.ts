import * as Discord from "discord.js";
import { IBotCommand } from '../structures/command';

export default class serverinfo implements IBotCommand {

    private readonly _command = "serverinfo";

    help(): string {
        return "This command does absolutely nothing!";
    }

    isThisCommand(command: string): boolean {
        return command === this._command;
    }

    async  runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {
        let created= new Date(msgObject.guild.createdTimestamp).toLocaleDateString("en-US")
        let embed = new Discord.RichEmbed()
            .setColor("#f44248")
            .setTitle("Server information")
            .setFooter(`Server ID: ${msgObject.guild.id}`)
            .setDescription(`Information of the guild ${msgObject.guild}`)
            .setThumbnail(msgObject.guild.iconURL)
            .addField(`Humans`, msgObject.guild.members.size, true)
            .addField(`Server owner`,msgObject.guild.owner.user.username, true)
            .addField(`Created on`, created, true)
            .addField(`Region`, msgObject.guild.region, true)
            .addField(`Channels`, msgObject.guild.channels.size, true)
            .addField(`Large`, msgObject.guild.large, true)
            .addField(`Roles`, msgObject.guild.roles.size, true)


        
        msgObject.channel.send({embed: embed})
            .catch(console.error)
    }


}