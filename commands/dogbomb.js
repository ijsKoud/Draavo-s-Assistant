const discord = require("discord.js");
const superagent = require("superagent");
const colors = require("../data/colors.json");
const channelRoles = require("../data/channels_roles.json");
const others = require("../data/others.json");
const client = new discord.Client();

module.exports.run = async(client, message, argument) => {

    var serverName = others.serverName;
    var serverIcon = others.dogAvatarURL;
    var msg = await message.channel.send("Generating...");
    var dogBombCount = "5";

    for(var i = 0; i < dogBombCount;i++){
        let {body} = await superagent
            .get(others.dogRandomURL)

            if (!{body}) return message.channel.send("Oops, It looks like I broke myself! Please try again later.");

            var dogEmbed = new discord.MessageEmbed()
                .setAuthor(`${serverName} dogBomb Footage Service`, serverIcon)
                .setImage(body.link)
                .setFooter(client.user.username)
                .setTimestamp()
                .setColor(colors.cornFlowerBlueColour)

            msg.edit("Generated!");
            message.channel.send(dogEmbed);

        };
    };
    
    

module.exports.help = {
name: "dogbomb"

}