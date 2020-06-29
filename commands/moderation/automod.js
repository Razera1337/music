const Discord = require("discord.js");
const { green } = require("../../colours.json")
module.exports= {
    config: {
        name: "serverrole",
        description: "",
        usage: "",
        category: "info",
        accessableby: "Members",
        aliases: ["serverroles"]
    },
    run: async (bot, message, args) => {
            const role = message.guild.roles;
  const embed = new Discord.RichEmbed()
    .setColor(green)
    .addField("Server Roles", role.map((e) => e).join(', '))
  message.channel.send({embed}) 
    }
}