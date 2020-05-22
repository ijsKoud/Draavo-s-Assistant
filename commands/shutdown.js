const discord = require("discord.js");
const botConfig = require("../botConfig.json");

module.exports.run = async(client, message, argument) => {

    if (!message.author.id === botConfig.botOwnerID) return message.reply("Sorry, you are not my owner. Only my owner can do that!")

    try {
        await message.channel.send("Bot is now shutting down...")
            process.exit();

    } catch (error) {
        message.channel.send(`ERROR: ${error.message}`)

    };

};

module.exports.help = {
name: "shutdown"

}