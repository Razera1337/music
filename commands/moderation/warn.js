const { RichEmbed } = require("discord.js");
const fs = require("fs");
const colours = require("../../colours.json")

module.exports= {
    config: {
        name: "warn",
        description: "Warns a member in the guild!",
        usage: "<user> <reason>",
        category: "moderation",
        accessableby: "Moderators",
        aliases: ["warn"]
    },
    run: async (bot, message, args) => {
        if(!message.member.hasPermission("MANAGE_MESSAGES")) {
                const embed2 = new RichEmbed()
      .setColor(colours.red)
      .setDescription("You Don't Have Permission To Perform This Command!")
      return message.channel.send(embed2)
        }
        let reason = args.slice(1).join(' ');
        let user = message.mentions.users.first();
      const embed6 = new RichEmbed()
      .setColor("Green")
      .setDescription(" Must Have Mention User To Warn")
        if (message.mentions.users.size < 1) return message.channel.send(embed6);
        if (reason.length < 1) return message.reply('You must have a reason for The warning.');
      
        let dmsEmbed = new RichEmbed()
        .setTitle("Warn")
        .setColor("#00ff00")
        .setDescription(`You have been warned on \`${message.guild.name}\``)
        .addField("Warned by", message.author.tag)
        .addField("Reason", reason);
      
        user.send(dmsEmbed);
      
        message.delete();
        
          const embed11 = new RichEmbed()
  .setColor(colours.green)
  .setDescription(`**${user.tag}** Has Been Warned.`)
    message.channel.send(embed11)
    }
}