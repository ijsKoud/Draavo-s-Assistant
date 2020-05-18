const discord = require("discord.js");
const botConfig = require("../botConfig.json");

module.exports.run = async(client, message, argument) => {

    try{
        var messageAuthor = message.author.username
            var botEmbed = new discord.MessageEmbed()
            .setTitle("**Daavo's Assistant Commands**")
            .setDescription(`All the commands that ${client.user.username} will execute!`)
            .addFields(
            {name:"**Basic Commands:**" , value:`${botConfig.prefix}help: You know what it does \n ${botConfig.prefix}info: Gives you all the information about the bot. \n ${botConfig.prefix}test: Checks if the bot is working!`},
            {name:"**Moderator Commands:**" , value:`${botConfig.prefix}warn: Warns the given user with the given reason. It also shows you how many warnings the user already has.
            \n ${botConfig.prefix}removewarns: Will remove all the warnings of a user! 
            \n ${botConfig.prefix}kick: Will kick the given user with and will show this in the logs with a reason. 
            \n ${botConfig.prefix}ban: Will ban the given user and shows this is the logs with a reason. 
            \n ${botConfig.prefix}unban: Will unban the given user with a reason that is shown in the logs!
            \n ${botConfig.prefix}clear: Will clear the certain amout of messages(max is 99 messages!).`},    
    
         );

         return message.reply("Help is on the way! please check your DMs for the commands.") && message.author.send(botEmbed);
    
    } catch (error) {
        message.reply("Could not send the help because you don't accept DMs!")
    };
    
};

module.exports.help = {
name: "help"

}