const discord = require("discord.js");
const botConfig = require("./botConfig.json");

const fs = require("fs")

const client = new discord.Client();
client.commands = new discord.Collection();

client.login(botConfig.token);

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

})

client.on("guildMemberAdd" , member => {

    const channel = member.guild.channels.cache.get(botConfig.logChannel)

        var joinMessage = new discord.MessageEmbed()
            .setThumbnail("https://cdn.discordapp.com/emojis/710073834652303360.png?v=1")
            .setTitle("Hey there!")
            .setColor(botConfig.greenColour) //Green colour
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
            .setColor(botConfig.redColour) //Red colour
            .setAuthor(`${member.user.tag}` , member.user.displayAvatarURL())
            .addField(`**${member.user.username} Just left the server!**` , "Bye bye😥")
            .setFooter("Hi, I'm a footer! I server no purpose of life here.")
            .setTimestamp();


    channel.send(leaveMessage);

});


