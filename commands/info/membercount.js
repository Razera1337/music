const { RichEmbed } = require("discord.js")

module.exports = {
    config: {
        name: "membercount",
        aliases: ["mcount"],
        usage: "membercount",
        category: "info",
        description: "",
        accessableby: "Members"
    },
    run: async (bot, message, args) => {
         const role = message.guild.roles.size;
   const online = (message.guild.members.filter(m => m.presence.status != 'offline').size - message.guild.members.filter(m=>m.user.bot).size)
      const embed = new RichEmbed()
            .setAuthor("Servername: " + message.guild.name, message.guild.iconURL)
            .setColor(0x00A2E8)
            .addField('Members', `${message.guild.memberCount - message.guild.members.filter(m=>m.user.bot).size}`, true)
            .addField('Online', `${online}`, true)
            .addField("Bots", message.guild.members.filter(m=>m.user.bot).size)
            .setTimestamp()
            .setFooter(bot.user.username, bot.user.avatarURL);
      message.channel.send({embed}) 
    }
}