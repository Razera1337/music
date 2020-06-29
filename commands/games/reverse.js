const { RichEmbed } = require("discord.js")
const colours = require("../../colours.json")

module.exports = {
    config: {
        name: "reverse",
        aliases: ["rvc"],
        usage: "<word>",
        category: "games",
        description: "Reverse the word you have given!",
        accessableby: "Members"
    },
    run: async (bot, message, args) => {
        if (args.length < 1) {
          const embed = new RichEmbed()
          .setColor(colours.red)
          .setDescription('You Must Input Text To Be Reversed!')
            throw embed;
        }
          const embed2 = new RichEmbed()
          .setColor(colours.red)
          .setDescription(args.join(' ').split('').reverse().join(''))
        message.channel.send(embed2);
    }
}