const Discord = require("discord.js")
const botconfig = require("../../botconfig.json");
const colours = require("../../colours.json");
const prefix = botconfig.prefix


module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) {
      const embed = new Discord.RichEmbed()
      .setColor(colours.red)
      .setDescription("You Do Not Have Permission To Use This Command!")
      return message.channel.send(embed)
    }

    let bannedMember = await bot.fetchUser(args[0])
        if(!bannedMember) {
          const embed2 = new Discord.RichEmbed()
          .setColor(colours.red)
          .setDescription("Please Provide A User Id To Unban Someone!")
          return message.channel.send(embed2)
        }

    let reason = args.slice(1).join(" ")
        if(!reason) reason = "No reason given!"

    if(!message.guild.me.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) {
      const embed4 = new Discord.RichEmbed()
      .setColor(colours.red)
      .setDescription("I Dont Have Permission To Perform This Command!")
      return message.channel.send(embed4)
    }
    message.delete()
    try{
        message.guild.unban(bannedMember, {reason: reason})
      const embed6 = new Discord.RichEmbed()
      .setColor(colours.green)
      .setDescription(`__**${bannedMember.tag}**__ Has Been Unbanned From The Guild!`)
        message.channel.send(embed6)
    } catch(e){
        console.log(e.message)
    }

    let embed = new Discord.RichEmbed()
    .setColor(colours.green) 
    .setAuthor(`${message.guild.name} Auditlogs`, message.guild.conURL)
    .addField("Moderation:", "unban")
    .addField("Unbanned Member:", `${bannedMember.username} (${bannedMember.id})`)
    .addField("Moderator:", message.author.username)
    .addField("Reason:", reason)
    .addField("Date:", message.createdAt.toLocaleString())

    let sChannel = message.guild.channels.find(c => c.name === "audit-log")
    sChannel.send(embed)

}

module.exports.config = {
    name: "unban",
    description: "Unban a user from the guild!",
    usage: "!!unban",
    category: "moderation",
    accessableby: "Administrators",
    aliases: ["unbanish"]
}