const Discord = require("discord.js");
const { green } = require("../../colours.json")
module.exports= {
    config: {
        name: "serveremojis",
        description: "",
        usage: "",
        category: "info",
        accessableby: "Members",
        aliases: ["serveremoji", "semoji"]
    },
    run: async (bot, message, args) => {
        const emoji = message.guild.emojis;
  if (!emoji.size) return message.channel.send("Server has no emojis")
  const embed = new Discord.RichEmbed()
  .setColor(green)
  .setTitle("Server Emoji")
  .setDescription(emoji.map((e) => e).join(' '))
  message.channel.send({embed})
    }
}