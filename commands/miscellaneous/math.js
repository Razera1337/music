  
const Discord = require("discord.js");
const math = require('mathjs');
const { red } = require("../../colours.json")
const emojiID = require("../../botconfig.json")

module.exports = {
    config: {
        name: "nick",
        aliases: ["nickname"],
        usage: "nick <mentiob> <name>",
        category: "moderation",
        description: "",
        accessableby: "Moderators"
    },
    run: async (bot, message, args) => {
      if (!message.member.hasPermission("MANAGE_NICKNAMES")) {
        const embed = new Discord.RichEmbed()
        .setColor(red)
        .setDescription("You do not have permission to change the bot's nickname <a:Crossag:712271469064749066>")
        return message.channel.send(embed);
      }
      if (!message.guild.member(bot.user).hasPermission('MANAGE_NICKNAMES')) {
        const embed2 = new Discord.RichEmbed()
        .setColor(red)
        .setDescription('Sorry, i dont have the perms to do this cmd i need MANAGE_NICKNAMES. <a:Crossag:712271469064749066>')
        return message.channel.send(embed2)
    }
      if (message.mentions.users.size < 1) {
        const embed3 = new Discord.RichEmbed()
        .setColor(red)
        .setDescription('You must mention someone to change the users nickname. <a:Crossag:712271469064749066>')
        return message.channel.send(embed3)
      }
      let user = message.guild.member(message.mentions.users.first());
      if (user.highestRole.position >= message.member.highestRole.position ) {
        const embed4 = new Discord.RichEmbed()
        .setColor(red)
        .setDescription('I cant change that members nickname. They are the same level as you or higher. <a:Crossag:712271469064749066>')
        return message.channel.send(embed4);
      }
      let newusername = args.slice(1).join(' ')
      if (newusername.length < 1) {
        const embed5 = new Discord.RichEmbed()
        .setColor(red)
        .setDescription('You must supply a new name for the user. <a:Crossag:712271469064749066>')
        return message.reply(embed5)
      }
       message.guild.members.get(user.user.id).setNickname(newusername);
        const embed = new Discord.RichEmbed()
        .setColor(0x00A2E8)
        .addField("Username set successfully!", newusername + " is now the nickname for " + user.user.username + " <a:yes:726360824372920341>");
        message.channel.send({embed})
    }
}