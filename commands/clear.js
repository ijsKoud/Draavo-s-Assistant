const discord = require("discord.js");
const botConfig = require("../botConfig.json");

module.exports.run = async(client, message, argument) => {

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Sorry, You don't have permision to do that!");
    if(!argument[0]) return message.reply("Please fill in a number of messages!");
    if(Number.isInteger(parseInt(argument[0]))) {
        var amount = parseInt(argument[0]) + 1;
        
        message.channel.bulkDelete(amount) .then(() => {
            
            if(argument[0] <= 0){
                message.channel.send("Why did you want to delete 1 message?") .then(message => message.delete({timeout: 3000}))
            };

            if(argument[0] == 1){
                message.channel.send("1 message deleted!") .then(message => message.delete({timeout: 3000}))
            
            } else {
                message.channel.send(`${argument[0]} messages deleted!`) .then(message => message.delete({timeout: 3000}))
            };
        });

        const adminLogchannel = message.guild.channels.cache.get(botConfig.adminLogChannel);

        var messageDeleteByBotEmbed = new discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL())
        .setTitle(`${message.author.tag} bulk deleted a message!`)
        .addFields(
            {name: "**count: **" , value: `${amount}`},
            {name: "**Channel: **" , value: `${message.channel}`}
        )
        .setColor(botConfig.redColour)
        .setTimestamp()
        .setFooter("Hi, I'm a footer! I server no purpose of life here.");

        adminLogchannel.send(messageDeleteByBotEmbed);

    } else
        return message.reply("Please fill in a valid number of messages!");
    
};

module.exports.help = {
name: "clear"

}