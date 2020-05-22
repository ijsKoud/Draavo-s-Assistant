const discord = require("discord.js");
const botConfig = require("../botConfig.json");
const colors = require("../data/colors.json");
const channelRoles = require("../data/channels_roles.json");
const others = require("../data/others.json");

module.exports.run = async(client, message, argument) => {

var botEmbed = new discord.MessageEmbed()
    .setTitle(`**${others.botName}**`)
    .setDescription("The personal assistant of Dave!")
    .setColor(colors.blueColour)
    .setThumbnail("https://imgur.com/RXad2Fr.png")
    .addFields(
        {name:"Name of the bot:" , value: `${others.botName}`},
        {name:"Builder" , value:"DaanGamesDG"},
        {name:"for help use:" , value:`${botConfig.prefix}help`},
        {name:"For server Information use:" , value:`${botConfig.prefix}serverinfo`}
    )
    .setFooter("Hi, I'm a footer! I server no purpose of life here.")
    .setTimestamp();

    return message.channel.send(botEmbed);
};

module.exports.help = {
name: "botinfo"

}