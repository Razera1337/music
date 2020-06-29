const { RichEmbed } = require("discord.js")
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
         * Ban the member
         * Make sure you run this on a member, not a user!
         * There are big differences between a user and a member
         * Read more about what ban options there are over at
         * https://discord.js.org/#/docs/main/master/class/GuildMember?scrollTo=ban
         */
        member
          .ban({
            reason: 'They were bad!',
          })
          .then(() => {
            // We let the message author know we were able to ban the person
          const embed = new RichEmbed()
          .setColor(colours.green)
          .setDescription(`**__${user.tag}__** **This User Has Been Banned From This Guild**`)
            message.channel.send(embed);
          })
          .catch(err => {
          const embed2 = new RichEmbed()
          .setColor(colours.red)
          .setDescription("**I Was Unable To Ban The Member**")
            // An error happened
            // This is generally due to the bot not being able to ban the member,
            // either due to missing permissions or role hierarchy
            message.channel.send(embed2);
            // Log the error
            console.error(err);
          });
      } else {
        const embed3 = new RichEmbed()
        .setColor(colours.red)
        .setDescription("**That User Isn't In This Guild!**")
        // The mentioned user isn't in this guild
        message.channel.send(embed3);
      }
    } else {
      const embed4 = new RichEmbed()
      .setColor(colours.red)
      .setDescription("**You Didn't Mention The User To Ban!**")
      // Otherwise, if no user was mentioned
      message.channel.send(embed4);
    }
  }



module.exports.config = {
    name: "ban",
    description: "Ban a user from the guild!",
    usage: "!!ban",
    category: "moderation",
    accessableby: "Administrators",
    aliases: ["banish", "remove"]
}