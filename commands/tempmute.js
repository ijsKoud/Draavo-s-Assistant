const discord = require("discord.js");
const botConfig = require("../botConfig.json");
const client = new discord.Client();
const ms = require("../node_modules/ms");
const colors = require("../data/colors.json");
const channelRoles = require("../data/channels_roles.json");
const others = require("../data/others.json");

const fs = require("fs");
const points = JSON.parse(fs.readFileSync("./data/points.json" , "utf8"));

module.exports.run = async(client, message, argument) => {

    const args = message.content.slice(botConfig.prefix.length).split(/ +/);
 
    if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply("sorry you don't have permission to do that!");

    if (!message.guild.me.hasPermission("KICK_MEMBERS")) return message.reply("Oops, It looks like I don't have permission to do that.");

    if (!args[1]) return message.reply("An error occurred while trying to tempmute: no user.");

    if (!args[2]) return message.reply("An error occurred while trying to tempmute: no time.");

    if (!args[3]) return message.reply("An error occurred while trying to tempmute: no reason.");


    var tempMuteUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[1]));

    if (tempMuteUser.hasPermission("MANAGE_MESSAGES")) return message.reply("Sorry, you aren't able to warn one of the staff members!")

    var muteTime = args[2];
    var reason = args.slice(3).join(" ");
    var warnerName = message.author.username;
    var warnedUsername = tempMuteUser.username;
    var muteRole = message.guild.roles.cache.get(channelRoles.muteRole);

    if (!tempMuteUser) return message.reply("Can not find the user!");

    var tempMuteAdminLogEmbed = new discord.MessageEmbed()
        .setAuthor(tempMuteUser.user.tag)
        .setColor(colors.blackColour)
        .setFooter("Hi, I'm a footer! I server no purpose of life here.")
        .setTimestamp()
        .setTitle(`${tempMuteUser.user.tag} has been temp Muted!!`)
        .setDescription(`**Muted by: ** ${message.author} \n **Reason: ** ${reason} \n **Time: ** ${muteTime}`);

    var tempMuteDMEmbed = new discord.MessageEmbed()
        .setColor(colors.blackColour)
        .setFooter("Hi, I'm a footer! I server no purpose of life here.")
        .setTimestamp()
        .setTitle(`It looks like you have been muted on our discord server!!`)
        .setDescription(`**Muted by: ** ${message.author} \n **Reason: ** ${reason} \n **Time: ** ${muteTime} \n \n Please be kind and respectful next time! Don't forget to follow the rules as well!`);

    var tempMuteEmbed = new discord.MessageEmbed()
        .setColor(colors.blackColour)
        .setFooter("Hi, I'm a footer! I server no purpose of life here.")
        .setTimestamp()
        .setTitle(`${tempMuteUser.user.tag} has been temp Muted!!`)
        .setDescription(`**Muted by: ** ${message.author} \n **Reason: ** ${reason} \n **Time: ** ${muteTime}`);

    var unTempMuteEmbed = new discord.MessageEmbed()
        .setColor(colors.greenColour)
        .setFooter("Hi, I'm a footer! I server no purpose of life here.")
        .setTimestamp()
        .setTitle(`Yay! You are unmuted from our discord server!`)
        .setDescription("Please listen to staff members and follow the rules to avoid further punishments!");

    await(tempMuteUser.roles.add(muteRole.id));

    message.channel.send(tempMuteEmbed);
    let adminLogChannel = message.guild.channels.cache.get(channelRoles.adminLogChannel)
    if(adminLogChannel) adminLogChannel.send(tempMuteAdminLogEmbed);
    tempMuteUser.send(tempMuteDMEmbed);

    setTimeout(() => {

        tempMuteUser.roles.remove(muteRole.id);
        tempMuteUser.send(unTempMuteEmbed);

    }, ms(muteTime));
    


};

module.exports.help = {
name: "tempmute"

}