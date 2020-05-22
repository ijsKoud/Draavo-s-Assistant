const discord = require("discord.js");
const superagent = require("superagent");
const colors = require("../data/colors.json");
const channelRoles = require("../data/channels_roles.json");
const others = require("../data/others.json");
const client = new discord.Client();

module.exports.run = async(client, message, argument) => {

var serverName = others.serverName;
var serverIcon = others.pandaAvatarURL;
var msg = await message.channel.send("Generating...")

let {body} = await superagent
    .get(others.pandaFactRandomURL)

    if (!{body}) return message.channel.send("Oops, It looks like I broke myself! Please try again later.");

    var pandaFactEmbed = new discord.MessageEmbed()
        .setAuthor(`${serverName} Panda Fact Service`, serverIcon)
        .setDescription(body.fact)
        .setFooter(client.user.username)
        .setTimestamp()
        .setColor(colors.cornFlowerBlueColour)

    msg.edit("Generated!");
    message.channel.send(pandaFactEmbed);

};

module.exports.help = {
name: "pandafact"

}