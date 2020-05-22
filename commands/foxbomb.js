const discord = require("discord.js");
const superagent = require("superagent");
const colors = require("../data/colors.json");
const channelRoles = require("../data/channels_roles.json");
const others = require("../data/others.json");
const client = new discord.Client();

module.exports.run = async(client, message, argument) => {

var serverName = others.serverName;
var serverIcon = others.foxAvatarURL;
var msg = await message.channel.send("Generating...")
var foxBombCount = "5";

for(var i = 0; i < foxBombCount;i++){
let {body} = await superagent
    .get(others.foxRandomURL)

    if (!{body}) return message.channel.send("Oops, It looks like I broke myself! Please try again later.");

    var foxEmbed = new discord.MessageEmbed()
        .setAuthor(`${serverName} Fox Bomb Footage Service`, serverIcon)
        .setImage(body.link)
        .setFooter(client.user.username)
        .setTimestamp()
        .setColor(colors.cornFlowerBlueColour)

    msg.edit("Generated!");
    message.channel.send(foxEmbed);
};
};

module.exports.help = {
name: "foxbomb"

}