const { RichEmbed } = require("discord.js")
const colours = require("../../colours.json")

module.exports = {
    config: {
        name: "clear",
        aliases: ["purge", "nuke"],
        usage: "<clear>",
        category: "moderation",
        description: "Clears the chat!",
        accessableby: "Moderators"
    },
    run: async (bot, message, args) => {
        if (message.deletable) {
            message.delete();
        }
    
        // Member doesn't have permissions
        if (!message.member.hasPermission("MANAGE_MESSAGES")) {
            const embed8 = new RichEmbed()
            .setColor(colours.red)
            .setDescription("You Don't Have Permission To Perform This Command!")
            return message.channel.send(embed8).then(m => m.delete(5000))
        }

        // Check if args[0] is a number
        if (isNaN(args[0]) || parseInt(args[0]) <= 0) {
                  const embed9 = new RichEmbed()
            .setColor(colours.red)
            .setDescription("I Can't Delete 0 Message By The Way!")
            return message.channel.send(embed9).then(m => m.delete(5000))
        }

        // Maybe the bot can't delete messages
        if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) {
          const embed = new RichEmbed()
          .setColor("RANDOM")
          .setDescription("I Don't Have Permission To Perform This Command!")
            return message.channel.send(embed).then(m => m.delete(5000));
        }

        let deleteAmount;

        if (parseInt(args[0]) > 100) {
            deleteAmount = 100;
        } else {
            deleteAmount = parseInt(args[0]);
        }
        message.channel.bulkDelete(deleteAmount, true)
        const embed5 = new RichEmbed()
        .setColor("RANDOM")
        .setDescription(`I Have Deleted ${args[0]} Messages!. This Message Will Be Deleted In 5 Sec...`)
        message.channel.send(embed5).then(m => m.delete(5000))
            .catch(err => message.reply(`Something went wrong... ${err}`));
    }
}
