const discord = require("discord.js");
const botConfig = require("./botConfig.json");
const colors = require("./data/colors.json");
const channelRoles = require("./data/channels_roles.json");
const others = require("./data/others.json");

const fs = require("fs")
const points = JSON.parse(fs.readFileSync("./data/deactivate.json" , "utf8"));

const client = new discord.Client();
client.commands = new discord.Collection();

var botID = others.botID;

client.login(botConfig.token);


if (!points[botID].points == 1){
    fs.readdir("./commands/" , (err, files) => {

    if(err) console.log(err);

    var jsFiles = files.filter(f => f.split(".").pop() === "js")

    if(jsFiles.lenght <= 0) {
    console.log("Can not find the files!");
    return;
    }

    jsFiles.forEach((f, i) => {
        var fileGet = require(`./commands/${f}`);
        console.log(`${f} Has succesfully been loaded!`);

        client.commands.set(fileGet.help.name , fileGet);
    });

    });
};

client.on("ready", async () => {

    console.log(`${client.user.username} active!`);

    client.user.setActivity("!help", { type: "LISTENING" });

});

client.on("message" , async message => {

if (message.author.bot) return;

if (message.channel.type === "dm") return;

var prefix = botConfig.prefix;

var messageArry = message.content.split(" ");

var command = messageArry[0];

var arguments = messageArry.slice(1);


var commands = client.commands.get(command.slice(prefix.length));

if(commands) commands.run(client, message, arguments);

if (command === `${botConfig.prefix}activate`){
    
    var botID = others.botID;

    if (points[botID].points === 0) return message.reply("I'm not de-activated yet!")
    if (!message.author.id === botConfig.botOwnerID) return message.reply("You can not Activate me!")   

    const activateReplyMessage = await message.channel.send("Activating...");
    
    const channel = message.guild.channels.cache.get(channelRoles.adminLogChannel);

    
    var botTag = others.botTag;
    

    var activateEmbed = new discord.MessageEmbed()
        .setColor(colors.greenColour)
        .setTimestamp(new Date())
        .setAuthor(botTag, others.botAvatarURL)
        .setDescription(`**ID:** ${botID}`, true)
        .addField("Status", `Activated!`, true)
        .setFooter(botConfig.footer)
    channel.send(activateEmbed);

    points[botID].points = points[botID].points - points[botID].points; {
        fs.writeFile("./data/deactivate.json" , JSON.stringify(points) , (error) => {
            if (error) console.log(error);
        });
    };

    
};

});

client.on("guildMemberAdd" , member => {

    const channel = member.guild.channels.cache.get(botConfig.logChannel)

        var joinMessage = new discord.MessageEmbed()
            .setThumbnail("https://cdn.discordapp.com/emojis/710073834652303360.png?v=1")
            .setTitle("Hey there!")
            .setColor(colors.greenColourgreenColour) //Green colour
            .setAuthor(`${member.user.tag}` , member.user.displayAvatarURL())
            .addField(`**Welcome to Draavo's Hangout, ${member.user.username}!**` , `Please verify in <#${botConfig.verifyChannel}> and read the rules in <#${botConfig.rulesChannel}> Have fun!`)
            .setFooter("Hi, I'm a footer! I server no purpose of life here.")
            .setTimestamp();

    channel.send(`<@${member.user.id}>`) && channel.send(joinMessage)
      
});

client.on("guildMemberRemove" , member => {

    const channel = member.guild.channels.cache.get(botConfig.logChannel)

        var leaveMessage = new discord.MessageEmbed()
            .setThumbnail("https://cdn.discordapp.com/emojis/710073834652303360.png?v=1")
            .setTitle("GoodBye!")
            .setColor(colors.redColour) //Red colour
            .setAuthor(`${member.user.tag}` , member.user.displayAvatarURL())
            .addField(`**${member.user.username} Just left the server!**` , "Bye bye😥")
            .setFooter("Hi, I'm a footer! I server no purpose of life here.")
            .setTimestamp();


    channel.send(leaveMessage);

});

client.on("messageUpdate", async (oldMessage, newMessage) => {
    if(oldMessage.content === newMessage.content) return;

    const adminLogchannel = newMessage.guild.channels.cache.get(channelRoles.adminLogChannel);

    if(newMessage.author.id === others.botID) return console.log(`${others.botName} Updated a message!`);

    var messageUpdateEmbed = new discord.MessageEmbed()
        .setAuthor(oldMessage.author.tag, oldMessage.author.avatarURL())
        .setTitle(`${oldMessage.author.tag} updated a message!`)
        .addFields(
            {name: "**Old Message: **" , value: `${oldMessage.content}`},
            {name: "**New Message: **" , value: `${newMessage.content}`},
            {name: "**Channel: **" , value: `${oldMessage.channel}`}
        )
        .setColor(colors.blueColour)
        .setTimestamp()
        .setFooter("Hi, I'm a footer! I server no purpose of life here.");

        adminLogchannel.send(messageUpdateEmbed);
});

client.on("messageDelete", async (deletedMessage) => {
    
    const adminLogchannel = deletedMessage.guild.channels.cache.get(channelRoles.adminLogChannel);

    if(deletedMessage.author.id === others.botID) return console.log(`${others.botName} Updated a message!`);

    var messageDeleter = deletedMessage.author.tag;

    var messageDeleteEmbed = new discord.MessageEmbed()
        .setAuthor(deletedMessage.author.tag, deletedMessage.author.avatarURL())
        .setTitle(`${deletedMessage.author.tag} deleted a message!`)
        .addFields(
            {name: "**Message: **" , value: `${deletedMessage.content}`},
            {name: "**Channel: **" , value: `${deletedMessage.channel}`}
        )
        .setColor(colors.redColour)
        .setTimestamp()
        .setFooter("Hi, I'm a footer! I server no purpose of life here.");

        adminLogchannel.send(messageDeleteEmbed);
});

