const Discord = require("discord.js")
const botconfig = require("../../botconfig.json");
const colours = require("../../colours.json");
const prefix = botconfig.prefix


module.exports.run = async (bot, message, args) => {

    const user = message.mentions.users.first();
    // If we have a user mentioned
    if (user) {
      // Now we get the member from the user
      const member = message.guild.member(user);
      // If the member is in the guild
      if (member) {
        /**
         * Kick the member
         * Make sure you run this on a member, not a user!
         * There are big differences between a user and a member
         */
        member
          .kick('Optional reason that will display in the audit logs')
          .then(() => {
            // We let the message author know we were able to kick the person
            const embed2 = new Discord.RichEmbed()
            .setColor(colours.green)
            .setDescription(`__**${user.tag}**__ **This User Has Been Kicked From This Guild**`)
            message.channel.send(embed2);
          })
          .catch(err => {
            // An error happened
            // This is generally due to the bot not being able to kick the member,
            // either due to missing permissions or role hierarchy
            const embed = new Discord.RichEmbed()
            .setColor(colours.red)
            .setDescription("I Was Unable To Kick This Member ")
            message.channel.send(embed);
            // Log the error
            console.error(err);
          });
      } else {
        // The mentioned user isn't in this guild
        const embed5 = new Discord.RichEmbed()
        .setColor(colours.red)
        .setDescription("That User Isn't In This Guild!")
        message.channel.send(embed5);
      }
      // Otherwise, if no user was mentioned
    } else {
      const embed6 = new Discord.RichEmbed()
      .setColor(colours.red)
      .setDescription("You Didn't Mention The User To Kick!")
      message.channel.send(embed6);
    }

}

module.exports.config = {
    name: "kick",
    description: "Kick a user from the guild!",
    usage: "!!kick",
    category: "moderation",
    accessableby: "Moderator",
    aliases: ["kick"]
}