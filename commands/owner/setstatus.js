const { ownerid, prefix } = require("../../botconfig.json"); 
const Discord = require("discord.js");

module.exports = { 
    config: {
        name: "setstatus",
        description: "",
        accessableby: "Bot Owner",
        category: "owner",
        type: "owner",
        usage: `setstatus <status>`
    },
    run: async (bot, message, args) => {
          if(message.author.id == ownerid) {
            var argresult = args.join(' ');
            bot.user.setStatus(argresult);
            const embed = new Discord.RichEmbed()
            .setColor("GREEN")
            .setDescription(`**The Status Has Been Setted To** \`${argresult}\``)
            message.channel.send(embed);
        } else {
            const embed2 = new Discord.RichEmbed()
            .setColor("RED")
            .setDescription("You do not have the permissions. Creator of the bot only. <a:Crossag:712271469064749066>")
            message.channel.send(embed2);
        }
    }
}