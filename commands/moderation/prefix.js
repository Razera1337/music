const { RichEmbed } = require("discord.js")
const colours = require("../../colours.json")
const db = require("quick.db")
const { default_prefix } = require("../../botconfig.json")

module.exports= {
    config: {
        name: "prefix",
        description: "",
        usage: "",
        category: "Moderation",
        accessableby: "Moderators",
        aliases: ["pf", "pfchange"]
    },
    run: async (bot, message, args) => {
         if(!message.member.hasPermission("ADMINISTRATOR")) {
            const embed2 = new RichEmbed()
      .setColor(colours.red)
      .setDescription("You Don't Have Permission To Perform This Command!")
      return message.channel.send(embed2)
    }
        if(!args[0]) {
          const embed = new RichEmbed()
          .setColor(colours.red)
          .setDescription("Please Give The Prefix That You Want To Set!")
      return message.channel.send(embed)
    }
         if(args[1]) {
          const embed2 = new RichEmbed()
          .setColor(colours.red)
          .setDescription("You Can Not Set Prefix A Double Argument!")
      return message.channel.send(embed2)
    }
       if(args[0].length > 3) {
          const embed3 = new RichEmbed()
          .setColor(colours.red)
          .setDescription("You Can Not Send Prefix More Than 3 Characters!")
      return message.channel.send(embed3)
    }
       if(args.join("") === default_prefix) {
      db.delete(`prefix_${message.guild.id}`)
         const embed6 = new RichEmbed()
         .setColor(colours.green)
         .setDescription("Reseted Prefix <a:yes:726360824372920341>")
     return await message.channel.send(embed6)
    }
          db.set(`prefix_${message.guild.id}`, args[0])
      const embed5 = new RichEmbed()
      .setColor("Random")
      .setDescription(`Prefix Is Set To \`${args[0]}\``)
  await message.channel.send(embed5)
    }
}