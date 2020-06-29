const discord = require('discord.js');
const snekfetch = require("snekfetch")

module.exports= {
    config: {
        name: "advice",
        description: "",
        usage: "advice",
        category: "miscellaneous",
        accessableby: "Members",
        aliases: ["advice"]
    },
    run: async (bot, message, args) => {
          try {
        		const { body } = await snekfetch.get('http://api.adviceslip.com/advice');
            const embed = new discord.RichEmbed()
            .setColor("RANDOM")
            .setDescription(JSON.parse(body.toString()).slip.advice)
        		message.channel.send(embed);
        	} catch (err) {
            const embed2 = new discord.RichEmbed()
            .setColor("RANDOM")
            .setDescription(`An error occurred: \`${err.message}\`. Try again later!`)
        		message.channel.send(embed2);
        	}
    }
}