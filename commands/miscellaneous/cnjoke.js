const { RichEmbed } = require("discord.js")
let giveMeAJoke = require('give-me-a-joke');;

module.exports = {
    config: {
        name: "cnjoke",
        aliases: ["cnjk"],
        usage: "!!cnjoke",
        category: "miscellaneous",
        description: "Send joke!",
        accessableby: "Members"
    },
    run: async (bot, message, args) => {
        giveMeAJoke.getRandomCNJoke(function(joke){
          const embed = new RichEmbed()
          .setColor("RANDOM")
          .setDescription(joke)
            message.channel.send(embed)
        })
    }
}