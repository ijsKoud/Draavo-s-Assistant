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
var pandaBombCount = "5";

for(var i = 0; i < pandaBombCount;i++){
let {body} = await superagent
    .get(others.pandaRandomURL)

    if (!{body}) return message.channel.send("Oops, It looks like I broke myself! Please try again later.");

    var pandaEmbed = new discord.MessageEmbed()
        .setAuthor(`${serverName} Panda Bomb Footage Service`, serverIcon)
        .setImage(body.link)
        .setFooter(client.user.username)
        .setTimestamp()
        .setColor(colors.cornFlowerBlueColour)

    msg.edit("Generated!");
    message.channel.send(pandaEmbed);
};
};

module.exports.help = {
name: "pandabomb"

}