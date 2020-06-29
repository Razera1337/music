const { RichEmbed } = require("discord.js")
const colours = require("../../colours.json");

module.exports = {
    config: {
        name: "removerole",
        description: "Removes a role to a member of the guild!",
        usage: "!!removerole",
        category: "moderation",
        accessableby: "Moderators",
        aliases: ["rr", "roleremove"]
    },
    run: async (bot, message, args) => {

    if(!message.member.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) {
      const embed2 = new RichEmbed()
      .setColor(colours.red)
      .setDescription("You Don't Have Permission To Perform This Command!")
      return message.channel.send(embed2)
    }

    let rMember = message.mentions.members.first() || message.guild.members.find(m => m.user.tag === args[0]) || message.guild.members.get(args[0])
    if(!rMember) {
      const embed6 = new RichEmbed()
      .setColor(colours.red)
      .setDescription("Please Provide A User To Add A Role Too!")
      return message.channel.send(embed6)
    }
    let role = message.guild.roles.find(r => r.name == args[1]) || message.guild.roles.find(r => r.id == args[1]) || message.mentions.roles.first()
    if(!role) {
      const embed7 = new RichEmbed()
      .setColor(colours.red)
      .setDescription("Please Provide A Role To Add To Said User!")
      return message.channel.send(embed7) 
    }
    let reason = args.slice(2).join(" ")
    if(!reason) {
      const embed7 = new RichEmbed()
      .setColor(colours.red)
      .setDescription("Please Provide A Reason!")
      return message.channel.send(embed7)
    }

    if(!message.guild.me.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) {
      const embed8 = new RichEmbed()
      .setColor(colours.red)
      .setDescription("I Don't Have Permission To Perform This Command!")
      return message.channel.send(embed8)
    }

    if(!rMember.roles.has(role.id)) {
            const embed9 = new RichEmbed()
      .setColor(colours.green)
      .setDescription(`${rMember.displayName}, Doesnt Have The Role!`)
        return message.channel.send(embed9)
    } else {
        await rMember.removeRole(role.id).catch(e => console.log(e.message))
              const embed10 = new RichEmbed()
        .setColor(colours.green)
        .setDescription(`The Role, ${role.name}, Has Been Removed Form ${rMember.displayName}.`)
        message.channel.send(embed10)
    }

    let embed = new RichEmbed()
    .setColor("RANDOM")
    .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
    .addField("Moderation:", "Addrole")
    .addField("Mutee:", rMember.user.username)
    .addField("Moderator:", message.author.username)
    .addField("Reason:", reason)
    .addField("Date:", message.createdAt.toLocaleString())
    
        let sChannel = message.guild.channels.find(c => c.name === "audit-log")
        sChannel.send(embed)
    }   
}