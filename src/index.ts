import * as Discord from "discord.js";
import * as ConfigFile from "./config";
import { IBotCommand } from "./structures/command";

const client: Discord.Client = new Discord.Client();

let commands: IBotCommand[] = [];

loadCommands(`${__dirname}/commands`)

client.on("ready", () => {

    console.log("Ready to go!");

});

client.on("message", msg => {
   
    if(msg.author.bot) { return; }
    if(!msg.content.startsWith(ConfigFile.config.prefix)) { return; }
     handleCommand(msg);

});

async function handleCommand(msg: Discord.Message) {
    
    let command = msg.content.split(" ")[0].replace(ConfigFile.config.prefix, "");
    let args = msg.content.split(" ").slice(1);

    for (const commandClass of commands) {
        try {
            if(!commandClass.isThisCommand(command)) {
                continue;
            }
            await commandClass.runCommand(args, msg, client);
        }
       catch(exception) {
           console.log(exception);
       }
    }
}

function loadCommands(commandsPath: string) {

    if(!ConfigFile.config || (ConfigFile.config.commands as string[]).length === 0 ) { return; }
    for(const commandName of ConfigFile.config.commands as string[]) {
        const commandClass = require(`${commandsPath}/${commandName}`).default;
        const command = new commandClass() as IBotCommand;
        commands.push(command);
    }

}

client.login(ConfigFile.config.token);