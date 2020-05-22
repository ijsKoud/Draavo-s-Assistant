const discord = require("discord.js");
const dateformat = require('dateformat');
const botConfig = require("../botConfig.json");
const colors = require("../data/colors.json");
const channelRoles = require("../data/channels_roles.json");
const others = require("../data/others.json");

module.exports.run = async(client, message, argument) => {
    
        let icon = message.guild.iconURL({size: 2048}); // Server Avatar
        
        let region = {
          "brazil": "Brazil",
          "europe": "Europe",
          "singapore": "Singapore",
          "london": "London",
          "russia": "Russia",
          "japan": "Japan",
          "hongkong": "Hongkong",
          "sydney": "Sydney",
          "us-central": "U.S. Central",
          "us-east": "U.S. East",
          "us-south": "U.S. South",
          "us-west": "U.S. West",
          "eu-west": "Western Europe"
        }
        
        // Members
        let member = message.guild.members;
        let offline = member.cache.filter(m => m.user.presence.status === "offline").size,
            online = member.cache.filter(m => m.user.presence.status === "online").size,
            idle = member.cache.filter(m => m.user.presence.status === "idle").size,
            dnd = member.cache.filter(m => m.user.presence.status === "dnd").size,
            robot = member.cache.filter(m => m.user.bot).size,
            total = message.guild.memberCount;
        
        // Channels
        let channels = message.guild.channels;
        let text = channels.cache.filter(r => r.type === "text").size,
            vc = channels.cache.filter(r => r.type === "voice").size,
            category = channels.cache.filter(r => r.type === "category").size,
            totalchan = channels.cache.size;
        
        // Region
        let location = region[message.guild.region];
        
        // Date
        let x = Date.now() - message.guild.createdAt;
        let h = Math.floor(x / 86400000) // 86400000, 5 digits-zero.
        let created = dateformat(message.guild.createdAt); // Install "dateformat" first.
        
        const embed = new discord.MessageEmbed()
        .setColor(colors.cornFlowerBlueColour)
        .setTimestamp(new Date())
        .setThumbnail(icon)
        .setAuthor(message.guild.name, icon)
        .setDescription(`**ID:** ${message.guild.id}`)
        .addField("Region", location)
        .addField("Date Created", `${created} \nsince **${h}** day(s)`)
        .addField("Owner", `**${message.guild.owner.user.tag}** \n\`${message.guild.owner.user.id}\``)
        .addField(`Members [${total}]`, `Online: ${online} \nIdle: ${idle} \nDND: ${dnd} \nOffline: ${offline} \nBots: ${robot}`)
        .addField(`Channels [${totalchan}]`, `Text: ${text} \nVoice: ${vc} \nCategory: ${category}`)
        .setFooter(others.footer)
        message.channel.send(embed); // Let's see if it's working!

};

module.exports.help = {
name: "serverinfo"

}