const { ownerid, prefix } = require("../../botconfig.json"); 
const Discord = require("discord.js");

module.exports = { 
    config: {
        name: "setgame",
        description: "",
        accessableby: "Bot Owner",
        category: "owner",
        type: "owner",
        usage: `setgame <game>`
    },
    run: async (bot, message, args) => {
          if(message.author.id == ownerid) {
                var gametoset = args.join(' ');
            if (!gametoset) gametoset = null;
            bot.user.setActivity(gametoset);
            const embed = new Discord.RichEmbed()
            .setColor("GREEN")
            .setDescription(`**The New Game Has Been Setted To** \`${gametoset}\``)
            message.channel.send(embed);
            } else {
            const embed2 = new Discord.RichEmbed()
            .setColor("RED")
            .setDescription("You do not have the permissions. Creator of the bot only. <a:Crossag:712271469064749066>")
            message.channel.send(embed2);
          }
    }
}