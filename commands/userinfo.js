const discord = require("discord.js");
const dateformat = require('dateformat');
const botConfig = require("../botConfig.json");
const colors = require("../data/colors.json");
const channelRoles = require("../data/channels_roles.json");
const others = require("../data/others.json");

module.exports.run = async(client, message, argument) => {
        


        let user = message.mentions.users.first() || message.author;
        let icon = user.avatarURL({size: 2048}); // user avatar
        
        // Status
        if (user.presence.status === "dnd") user.presence.status = "Do Not Distrub";
        if (user.presence.status === "idle") user.presence.status = "Idle";
        if (user.presence.status === "online") user.presence.status = "Online";
        if (user.presence.status === "offline") user.presence.status = "Invisible/Offline";
        
        // Date Account Creation
        let x = Date.now() - user.createdAt;
        let h = Math.floor(x / 86400000) // 86400000, 5 digits-zero.
        let created = dateformat(user.createdAt); // Install "dateformat" first.
        
        // Date Join Server
        let xJoined = Date.now() - message.guild.members.cache.get(user.id).joinedAt;
        let hJoined = Math.floor(xJoined / 86400000) // 86400000, 5 digits-zero.
        let joined = dateformat(message.guild.members.cache.get(user.id).joinedAt); // Install "dateformat" first.

        // game Status
        function game() {
          let game;
          if (user.presence.activities.length >= 1){
            if (user.presence.activities[0].type === "CUSTOM_STATUS") game = "none"
            else game = `${user.presence.activities[0].type} ${user.presence.activities[0].name}`;
          } if (user.presence.activities.length < 1) game = "none";
          return game;
        };

        let status = user.presence.status;

        const embed = new discord.MessageEmbed()
        .setColor(colors.cornFlowerBlueColour)
        .setTimestamp(new Date())
        .setThumbnail(icon)
        .setAuthor(user.tag, icon)
        .setDescription(`**ID:** ${user.id}`, true)
        .addField("Date Created Account", `${created} \nsince **${h}** day(s)`, true)
        .addField("Date Joined This Server", `${joined} \nsince **${hJoined}** day(s)`,true)
        .addField(`Status` , status, true)
        .addField("Game", game())
        .setFooter(others.footer)
        message.channel.send(embed); // Let's see if it's working!

};

module.exports.help = {
name: "info"

}