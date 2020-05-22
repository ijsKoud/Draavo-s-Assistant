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

    var unBanUser = args[1];
    var reason = args.slice(2).join(" ");
    var BannerName = message.author.username;

    if (!unBanUser) return message.reply("Can not find the user!");

    var unBanEmbed = new discord.MessageEmbed()
        .setColor(colors.greenColour)
        .setThumbnail("https://cdn.discordapp.com/emojis/710073834652303360.png?v=1")
        .setFooter("Hi, I'm a footer! I server no purpose of life here.")
        .setTimestamp()
        .setTitle(`${unBanUser} has been unbanned!!`)
        .setDescription(`**unbanned by: ** ${message.author} \n **Reason: ** ${reason}`);

    var unBanLogEmbed = new discord.MessageEmbed()
        .setColor(colors.blackColour)
        .setThumbnail("https://cdn.discordapp.com/emojis/710073834652303360.png?v=1")
        .setFooter("Hi, I'm a footer! I server no purpose of life here.")
        .setTimestamp()
        .setTitle(`${unBanUser} has been unbanned!!`)
        .setDescription(`**unbanned by: ** ${message.author} \n **Reason: ** ${reason}`);
    
    var bannedDMEmbed = new discord.MessageEmbed()
        .setColor(colors.blackColour)
        .setThumbnail("https://cdn.discordapp.com/emojis/710073834652303360.png?v=1")
        .setFooter("Hi, I'm a footer! I server no purpose of life here.")
        .setTimestamp()
        .setTitle(`Oh no! It looks like you have been banned form our server!`)
        .setDescription(`**unbanned by: ** ${BannerName} \n **Reason: ** ${reason} \n Please be kind and respectful next time! Don't forget to follow the rules as well!`);

        if(unBanUser.startsWith("<@!") && unBanUser.endsWith(">")){
            unBanUserID = unBanUser.slice(3, -1);

            message.channel.send(unBanEmbed).then(async msg => {
                message.guild.members.unban(unBanUserID);
                let logChannel = message.guild.channel.get(channelRoles.logChannel);
                if(logChannel) return logChannel.send(unBanLogEmbed);
            });

        } else if (!argument[1].content.includes("#")) {
           message.channel.send(unBanEmbed).then(async msg => {
                    message.guild.members.unban(unBanUser);
            }); 
        };
        
};

module.exports.help = {
name: "unban"

}