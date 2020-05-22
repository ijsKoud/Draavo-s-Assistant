const discord = require("discord.js");
const botConfig = require("../botConfig.json");
const client = new discord.Client();
const colors = require("../data/colors.json");
const channelRoles = require("../data/channels_roles.json");
const others = require("../data/others.json");

module.exports.run = async(client, message, argument) => {

    const args = message.content.slice(botConfig.prefix.length).split(/ +/);
 
    if (!message.member.hasPermission("BAN_MEMBERS")) return message.reply("sorry you don't have permission to do that!");

    if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.reply("Oops, It looks like I don't have permission to do that.");

    if (!args[1]) return message.reply("An error occurred while trying to ban: no user.");

    if (!args[2]) return message.reply("An error occurred while trying to ban: no reasons.");

    var banUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[1]));

    if (banUser.hasPermission("MANAGE_MESSAGES")) return message.reply("Sorry, you aren't able to ban one of the staff members!")

    var reason = args.slice(2).join(" ");
    var bannerName = message.author.username;
    var bannedUsername = banUser.username;

    if (!banUser) return message.reply("Can not find the user!");

    var banEmbed = new discord.MessageEmbed()
        .setColor(colors.greenColour)
        .setThumbnail(others.botAvatarURL)
        .setFooter("Hi, I'm a footer! I server no purpose of life here.")
        .setTimestamp()
        .setTitle(`${banUser} has been banned!!`)
        .setDescription(`**banned by: ** ${message.author} \n **Reason: ** ${reason}`);

    var banLogEmbed = new discord.MessageEmbed()
        .setColor(colors.blackColour)
        .setThumbnail("https://cdn.discordapp.com/emojis/710073834652303360.png?v=1")
        .setFooter("Hi, I'm a footer! I server no purpose of life here.")
        .setTimestamp()
        .setTitle(`${banUser} has been banned!!`)
        .setDescription(`**banned by: ** ${message.author} \n **Reason: ** ${reason} \n \n That is one big oof there, don't you think? :hammer:
        `);

    var bannedDMEmbed = new discord.MessageEmbed()
        .setColor(colors.blackColour)
        .setThumbnail("https://cdn.discordapp.com/emojis/710073834652303360.png?v=1")
        .setFooter("Hi, I'm a footer! I server no purpose of life here.")
        .setTimestamp()
        .setTitle(`Oh no! It looks like you have been banned form our server!`)
        .setDescription(`**banned by: ** ${bannerName} \n **Reason: ** ${reason} \n \n Please be kind and respectful next time! Don't forget to follow the rules as well!`);

        
    banUser.send(bannedDMEmbed);

    message.channel.send(banEmbed).then(async msg => {
        banUser.ban(reason);
        let logChannel = msg.guild.channels.cache.get(botConfig.logChannel)
        if(logChannel) return logChannel.send(banLogEmbed);

    });
};

module.exports.help = {
name: "ban"

}