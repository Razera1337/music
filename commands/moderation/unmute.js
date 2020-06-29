const Discord = require("discord.js");
const botconfig = require("../../botconfig.json");
const colours = require("../../colours.json");
const superagent = require("superagent");


module.exports.run = async (bot, message, args) => {
if(!message.member.hasPermission("MANAGE_ROLES") || !message.guild.owner) {
        const embed2 = new Discord.RichEmbed()
      .setColor(colours.red)
      .setDescription("You Don't Have Permission To Perform This Command!")
      return message.channel.send(embed2)
}

if(!message.guild.me.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) {
        const embed8 = new Discord.RichEmbed()
      .setColor(colours.red)
      .setDescription("I Don't Have Permission To Perform This Command!")
      return message.channel.send(embed8)
}



let mutee = message.mentions.members.first() || message.guild.member.get(args[0]);
if(!mutee) {
          const embed3 = new Discord.RichEmbed()
      .setColor(colours.red)
      .setDescription("Please Supply A User To Be Unmuted!")
  return message.channel.send(embed3);
}

let reason = args.slice(1).join(" ");
if(!reason) reason = "No reason given"


let muterole = message.guild.roles.find(r => r.name === "Muted")
if(!muterole) {
            const embed4 = new Discord.RichEmbed()
      .setColor(colours.red)
      .setDescription("There Is No Muted Role To Remove!")
  return message.channel.send(embed4)
}

mutee.removeRole(muterole.id).then(() => {
    message.delete()
    mutee.send(`Hello, you have been unmuted in ${message.guild.name} for: ${reason}`).catch(err => console.log(err))
      const embed11 = new Discord.RichEmbed()
  .setColor(colours.green)
  .setDescription(`**${mutee.user.username}** Was Succesfully Unmuted.`)
    message.channel.send(embed11)
})

let embed = new Discord.RichEmbed()
.setColor(colours.green)
.setAuthor(`${message.guild.name} Auditlogs`, message.guild.conURL)
.addField("Moderation:", "unmute")
.addField("Mutee:", mutee.user.username)
.addField("Moderator:", message.author.username)
.addField("Reason:", reason)
.addField("Date:", message.createdAt.toLocaleString())

let sChannel = message.guild.channels.find(c => c.name === "audit-log")
sChannel.send(embed)
}


module.exports.config = {
    name: "unmute",
    description: "Unmutes a member in the discord!",
    usage: "!unmute <user> <reason>",
    accessableby: "Members",
    category: "moderation",
    aliases: ["unm", "speak"]
}