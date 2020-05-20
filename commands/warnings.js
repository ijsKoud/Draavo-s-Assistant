const discord = require("discord.js");
const botConfig = require("../botConfig.json");
const client = new discord.Client();
const ms = require("ms");

const fs = require("fs");
const points = JSON.parse(fs.readFileSync("./data/points.json" , "utf8"));


module.exports.run = async(client, message, argument) => {

    const args = message.content.slice(botConfig.prefix.length).split(/ +/);
 
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("sorry you don't have permission to do that!");

    if (!message.guild.me.hasPermission("MANAGES_MESSAGES")) return message.reply("Oops, It looks like I don't have permission to do that.");

    if (!args[1]) return message.reply("An error occurred while trying to warn: no user.");

    if (!args[2]) return message.reply("An error occurred while trying to warn: no reasons.");

    var warnUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[1]));

    if (warnUser.hasPermission("MANAGE_MESSAGES")) return message.reply("Sorry, you aren't able to warn one of the staff members!")

    var reason = args.slice(2).join(" ");
    var warnerName = message.author.username;
    var warnedUsername = warnUser.username;

    if (!warnUser) return message.reply("Can not find the user!");

    points[warnUser.id].points++; {
        fs.writeFile("points.json" , JSON.stringify(points) , (error) => {

            if (error) console.log(error);

        });
    };

    var warnEmbed = new discord.MessageEmbed()
        .setColor(botConfig.greenColour)
        .setFooter("Hi, I'm a footer! I server no purpose of life here.")
        .setTimestamp()
        .setTitle(`${warnUser.user.tag} has been warned!!`)
        .setDescription(`**warned by: ** ${message.author} \n **Reason: ** ${reason} \n **Warning Count: ** ${points[warnUser.id].points}`);

    var warnedDMEmbed = new discord.MessageEmbed()
        .setColor(botConfig.blackColour)
        .setFooter("Hi, I'm a footer! I server no purpose of life here.")
        .setTimestamp()
        .setTitle(`Oh no! It looks like you have been warned on our server!`)
        .setDescription(`**warned by: ** ${warnerName} \n **Reason: ** ${reason} \n **Warning count: ** ${points[warnUser.id].points}  \n \n Please be kind and respectful next time! Don't forget to follow the rules as well!`);

    if(!points[warnUser.id]) points[warnUser.id] = {
        points: 0
    };  
    
    
          
    warnUser.send(warnedDMEmbed);

    message.channel.send(warnEmbed).then(async msg => {
        
    });

    if (points[warnUser.id].points == 2){

        var mutTime = "5m"
        var autoMuteReason = "You got 2 moderation points which means an auto Temp mute of 5 minutes!"
        var muteRole = message.guild.roles.cache.get(botConfig.muteRole);

        var tempMuteAdminLogEmbed = new discord.MessageEmbed()
        .setColor(botConfig.blackColour)
        .setFooter("Hi, I'm a footer! I server no purpose of life here.")
        .setTimestamp()
        .setTitle(`${tempMuteUser.user.tag} has been temp Muted!!`)
        .setDescription(`**Muted by: ** ${client.user.tag} \n **Reason: ** ${autoMuteReason} \n **Time: ** ${muteTime}`);

    var tempMuteDMEmbed = new discord.MessageEmbed()
        .setColor(botConfig.blackColour)
        .setFooter("Hi, I'm a footer! I server no purpose of life here.")
        .setTimestamp()
        .setTitle(`It looks like you have been muted on our discord server!!`)
        .setDescription(`**Muted by: ** ${client.user.tag} \n **Reason: ** ${autoMuteReason} \n **Time: ** ${muteTime} \n \n Please be kind and respectful next time! Don't forget to follow the rules as well!`);

    var tempMuteEmbed = new discord.MessageEmbed()
        .setColor(botConfig.blackColour)
        .setFooter("Hi, I'm a footer! I server no purpose of life here.")
        .setTimestamp()
        .setTitle(`${tempMuteUser.user.tag} has been temp Muted!!`)
        .setDescription(`**Muted by: ** ${client.user.tag} \n **Reason: ** ${autoMuteReason} \n **Time: ** ${muteTime}`);

    var unTempMuteEmbed = new discord.MessageEmbed()
        .setColor(botConfig.greenColour)
        .setFooter("Hi, I'm a footer! I server no purpose of life here.")
        .setTimestamp()
        .setTitle(`Yay! You are unmuted from our discord server!`)
        .setDescription("Please listen to staff members and follow the rules to avoid further punishments!");

    await(tempMuteUser.roles.add(muteRole.id));

    message.channel.send(tempMuteEmbed);
    let adminLogChannel = message.guild.channels.cache.get(botConfig.adminLogChannel)
    if(adminLogChannel) adminLogChannel.send(tempMuteAdminLogEmbed);
    tempMuteUser.send(tempMuteDMEmbed);

    setTimeout(() => {

        tempMuteUser.roles.remove(muteRole.id);
        tempMuteUser.send(unTempMuteEmbed);

    }, ms(muteTime));

    };

    if (points[warnUser.id].points == 16) {
        
        var reason = ("You got the maximum of 16 moderation points!")
        var bannerName = (`${botConfig.botName}`)

        var banEmbed = new discord.MessageEmbed()
        .setColor(botConfig.greenColour)
        .setThumbnail("https://cdn.discordapp.com/emojis/710073834652303360.png?v=1")
        .setFooter("Hi, I'm a footer! I server no purpose of life here.")
        .setTimestamp()
        .setTitle(`${warnUser.user.tag} has been banned!!`)
        .setDescription(`**banned by: ** ${message.author} \n **Reason: ** ${reason}`);

        var banLogEmbed = new discord.MessageEmbed()
        .setColor(botConfig.blackColour)
        .setThumbnail("https://cdn.discordapp.com/emojis/710073834652303360.png?v=1")
        .setFooter("Hi, I'm a footer! I server no purpose of life here.")
        .setTimestamp()
        .setTitle(`${warnUser.user.tag} has been banned!!`)
        .setDescription(`**banned by: ** ${message.author} \n **Reason: ** ${reason} \n \n That is one big oof there, don't you think? :hammer:
        `);

        var bannedDMEmbed = new discord.MessageEmbed()
        .setColor(botConfig.blackColour)
        .setThumbnail("https://cdn.discordapp.com/emojis/710073834652303360.png?v=1")
        .setFooter("Hi, I'm a footer! I server no purpose of life here.")
        .setTimestamp()
        .setTitle(`Oh no! It looks like you have been banned form our server!`)
        .setDescription(`**banned by: ** ${bannerName} \n **Reason: ** ${reason} \n \n Please be kind and respectful next time! Don't forget to follow the rules as well!`);

        
        warnUser.send(bannedDMEmbed);

        message.channel.send(banEmbed).then(async msg => {
            warnUser.ban(reason);
            let logChannel = msg.guild.channels.cache.get(botConfig.logChannel)
            if(logChannel) return logChannel.send(banLogEmbed);
        });

    }
};

module.exports.help = {
name: "warn"

}