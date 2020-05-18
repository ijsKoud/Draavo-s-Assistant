const discord = require("discord.js");

module.exports.run = async(client, message, argument) => {

var botEmbed = new discord.MessageEmbed()
    .setTitle("**Dave's Assistant**")
    .setDescription("The personal assistant of Dave!")
    .setColor("#0099ff")
    .setThumbnail("https://imgur.com/RXad2Fr.png")
    .addFields(
        {name:"Name of the bot:" , value:"Dave's Assistant!"},
        {name:"Builder" , value:"DaanGamesDG"}
    )
    .setFooter("Hi, I'm a footer! I server no purpose of life here.")
    .setTimestamp();

    return message.channel.send(botEmbed);
};

module.exports.help = {
name: "botinfo"

}