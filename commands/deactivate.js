const discord = require("discord.js");
const botConfig = require("../botConfig.json");
const colors = require("../data/colors.json");
const channelRoles = require("../data/channels_roles.json");
const others = require("../data/others.json");

const fs = require("fs");
const points = JSON.parse(fs.readFileSync("./data/deactivate.json" , "utf8"));

module.exports.run = async(client, message, argument) => {

    if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply("Sorry, you can not de-activate me!")
    
    var botID = botConfig.botID;

    try {
        await message.channel.send("De-activating now...")

        const channel = message.guild.channels.cache.get(channelRoles.adminLogChannel);

        var botID = others.botID;
        const client = new discord.Client()
        var botTag = others.botTag;
        

        var deActivateEmbed = new discord.MessageEmbed()
            .setColor(colors.redColour)
            .setTimestamp(new Date())
            .setAuthor(botTag, others.botAvatarURL)
            .setDescription(`**ID:** ${botID}`, true)
            .addField("Status", `De-activated!`, true)
            .setFooter(others.footer)
        channel.send(deActivateEmbed);
       
        points[botID].points++; {
            fs.writeFile("./data/deactivate.json" , JSON.stringify(points) , (error) => {

            if (error) console.log(error);

        });

    };
        

    } catch (error) {
        message.channel.send(`ERROR: ${error.message}`)

    };

};

module.exports.help = {
name: "de-activate"

}