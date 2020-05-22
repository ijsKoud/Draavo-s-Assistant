const discord = require("discord.js");
const botConfig = require("../botConfig.json");
const client = new discord.Client();
const colors = require("../data/colors.json");
const channelRoles = require("../data/channels_roles.json");
const others = require("../data/others.json");

module.exports.run = async(client, message, argument) => {

    const args = message.content.slice(botConfig.prefix.length).split(/ +/);
 
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("sorry you don't have permission to do that!");

    if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.reply("Oops, It looks like I don't have permission to do that.");

    if (!args[1]) return message.reply("An error occurred while trying to say something: no channel.");

    if (!args[2]) return message.reply("An error occurred while trying to say something: nothing to say.");
    
    var sayChannelID = args[1].slice(2, -1);
    var sayMessage = args.slice(2).join(" ");

    var announcementEmbed = new discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL())
        .setTitle(`**New Announcment** | ${message.author.username} Has something to say!`)
        .setDescription(`${sayMessage}`)
        .setColor(colors.blueColour)
        .setFooter(colors.footer)
        .setTimestamp()

    message.delete();
    client.channels.cache.get(sayChannelID).send(`@everyone`) && client.channels.cache.get(sayChannelID).send(announcementEmbed);

};

module.exports.help = {
name: "announce"

}