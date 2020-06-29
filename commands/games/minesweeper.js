const { RichEmbed } = require("discord.js")
const Minesweeper = require('discord.js-minesweeper');

module.exports = {
    config: {
        name: "minesweeper",
        aliases: ["mine"],
        usage: "",
        category: "games",
        description: "",
        accessableby: "Members"
    },
    run: async (bot, message, args) => {
      const minesweeper = new Minesweeper({
          returnType: 'emoji'
        });
        var mines = minesweeper.start()
        message.channel.send(mines)
  
    }
}