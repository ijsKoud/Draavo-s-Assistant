const discord = require("discord.js");
const botConfig = require("../botConfig.json");
const client = new discord.Client();
const colors = require("../data/colors.json");
const channelRoles = require("../data/channels_roles.json");
const others = require("../data/others.json");

const fs = require("fs");
const points = JSON.parse(fs.readFileSync("./data/points.json" , "utf8"));

module.exports.run = async(client, message, argument) => {

    const args = message.content.slice(botConfig.prefix.length).split(/ +/);
 
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("sorry you don't have permission to do that!");

    if (!message.guild.me.hasPermission("MANAGES_MESSAGES")) return message.reply("Oops, It looks like I don't have permission to do that.");

    if (!args[1]) return message.reply("An error occurred while trying to remove the warns: no user.");
    
    var removeWarnUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[1]));

    if(!points[removeWarnUser.id]) return message.reply("This user doesn't have any warnings!");
    if(points[removeWarnUser.id].points == null) return message.reply("This user doesn't have any warnings!")

    var removeWarnsMessageEmbed = new discord.MessageEmbed()
        .setColor(colors.greenColour)
        .setFooter("Hi, I'm a footer! I server no purpose of life here.")
        .setTimestamp()
        .setTitle(`The warnings of ${removeWarnUser.user.tag} have been removed!!`)

    var removeWarnsMessageDMEmbed = new discord.MessageEmbed()
        .setColor(colors.greenColour)
        .setFooter("Hi, I'm a footer! I server no purpose of life here.")
        .setTimestamp()
        .setTitle(`Your warnings have been removed!!`)
    
        const adminLogChannel = message.guild.channels.cache.get(channelRoles.adminLogChannel);

    message.channel.send(removeWarnsMessageEmbed);
    removeWarnUser.send(removeWarnsMessageDMEmbed);
    adminLogChannel.send(removeWarnsMessageEmbed);
    console.log(`Removed warnings from ${removeWarnUser}`);

    points[removeWarnUser.id].points = points[removeWarnUser.id].points - points[removeWarnUser.id].points; {
        fs.writeFileSync("points.json" , JSON.stringify(points) , (error) => {

            if (error) console.log(error);

        });
    };
}

module.exports.help = {
    name: "removewarns" 
}
   
