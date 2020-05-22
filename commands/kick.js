const discord = require("discord.js");
const botConfig = require("../botConfig.json");
const colors = require("../data/colors.json");
const channelRoles = require("../data/channels_roles.json");
const others = require("../data/others.json");

module.exports.run = async(client, message, argument) => {

    const args = message.content.slice(botConfig.prefix.length).split(/ +/);
 
    if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply("sorry you don't have permission to do that!");

    if (!message.guild.me.hasPermission("KICK_MEMBERS")) return message.reply("Oops, It looks like I don't have permission to do that.");

    if (!args[1]) return message.reply("An error occurred while trying to kick: no user.");

    if (!args[2]) return message.reply("An error occurred while trying to kick: no reasons.");

    var kickUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[1]));

    if (kickUser.hasPermission("MANAGE_MESSAGES")) return message.reply("Sorry, you aren't able to kick one of the staff members!")

    var reason = args.slice(2).join(" ");

    if (!kickUser) return message.reply("Can not find the user!");

    var kickEmbed = new discord.MessageEmbed()
        .setColor(colors.greenColour)
        .setThumbnail("https://cdn.discordapp.com/emojis/710073834652303360.png?v=1")
        .setFooter("Hi, I'm a footer! I server no purpose of life here.")
        .setTimestamp()
        .setTitle(`${kickUser} has been kicked!`)
        .setDescription(`**Kicked by: ** ${message.author} \n **Reason: ** ${reason}`);


    message.channel.send(kickEmbed).then(async msg => {
    
        kickUser.kick(reason);

    })   
};

module.exports.help = {
name: "kick"

}