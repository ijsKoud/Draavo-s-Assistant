const discord = require("discord.js");
const botConfig = require("../botConfig.json");
const client = new discord.Client();

module.exports.run = async(client, message, argument) => {

    const args = message.content.slice(botConfig.prefix.length).split(/ +/);
 
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("sorry you don't have permission to do that!");

    if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.reply("Oops, It looks like I don't have permission to do that.");

    if (!args[1]) return message.reply("An error occurred while trying to say something: no channel or nothing to say.");

    //if (!args[2]) return message.reply("An error occurred while trying to say something: nothing to say.");
    
    var sayChannelID = args[1].slice(2, -1);
    if (args[1] === `<#${sayChannelID}>`){
        var sayMessage = args.slice(2).join(" ");
        return client.channels.cache.get(sayChannelID).send(sayMessage);

    };
    
    var sayMessage = args.slice(1).join(" ");
    return message.channel.send(sayMessage);

};

module.exports.help = {
name: "say"

}