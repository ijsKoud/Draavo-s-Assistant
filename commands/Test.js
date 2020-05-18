const discord = require("discord.js");

module.exports.run = async(client, message, argument) => {

console.log("Test succesful!");
message.channel.send("Test succesful!")

};

module.exports.help = {
name: "test"

}