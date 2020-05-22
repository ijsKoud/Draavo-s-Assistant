const discord = require("discord.js");
const superagent = require("superagent");
const colors = require("../data/colors.json");
const channelRoles = require("../data/channels_roles.json");
const others = require("../data/others.json");
const client = new discord.Client();

module.exports.run = async(client, message, argument) => {

var serverName = others.serverName;
var serverIcon = others.catAvatarURL;
var msg = await message.channel.send("Generating...")

let {body} = await superagent
    .get(others.catFactRandomURL)

    if (!{body}) return message.channel.send("Oops, It looks like I broke myself! Please try again later.");

    var catFactEmbed = new discord.MessageEmbed()
        .setAuthor(`${serverName} Cat Fact Service`, serverIcon)
        .setDescription(body.fact)
        .setFooter(client.user.username)
        .setTimestamp()
        .setColor(colors.cornFlowerBlueColour)

    msg.edit("Generated!");
    message.channel.send(catFactEmbed);

};

module.exports.help = {
name: "catfact"

}