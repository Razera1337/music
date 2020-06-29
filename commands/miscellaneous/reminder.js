  
const Discord = require("discord.js");
const ms = require('ms');
const { red } = require("../../colours.json")
const { green } = require("../../colours.json")

module.exports= {
    config: {
        name: "reminder",
        description: "",
        usage: "reminder <time> <message>",
        category: "miscellaneous",
        accessableby: "Members",
        aliases: ["reminder", "setreminder"]
    },
    run: async (bot, message, args) => {
   if (!bot.lockit) bot.lockit = [];

  let time = args[0];
  let validUnlocks = ['release', 'unlock'];
  if (!time) {
    const embed = new Discord.RichEmbed()
    .setColor(red)
    .setDescription('Please set an amount of time you would like your reminder to be! `!reminder [TIME][M-S-H]`')
    return message.channel.send(embed).then(m => {m.delete(20000)});
  }
  if (validUnlocks.includes(time)) {
    message.channel.overwritePermissions(message.author.id, {
      SEND_MESSAGES: true,
    }).then(() => {
      const embed2 = new Discord.RichEmbed()
      .setColor(green)
      .setDescription(`${message.author}**Your reminder is up!**`)
      message.channel.send(embed2);
      clearTimeout(bot.lockit[message.channel.id]);
      delete bot.lockit[message.channel.id];
    }).catch(error => {
      console.log(error);
    });
  } else {
    message.channel.overwritePermissions(message.author.id, {
      SEND_MESSAGES: true
    }).then(() => {
      const embed3 = new Discord.RichEmbed()
      .setColor(green)
      .setDescription(`I will remind you about \`${args.slice(1).join(' ')}\` in __**${ms(ms(time), { long:true })}**__.`)
      message.reply(embed3).then(() => {

        bot.lockit[message.channel.id] = setTimeout(() => {
          message.channel.overwritePermissions(message.author.id, {
            SEND_MESSAGES: true
          })
          const embed55 = new Discord.RichEmbed()
          .setColor(green)
          .setDescription(`You had asked me to remind you, here is your reminder. The title of this reminder is "__**${args.slice(1).join(' ')}**__."`)
            message.reply(embed55).catch(console.error);
          delete bot.lockit[message.channel.id];
        }, ms(time));

      }).catch(error => {
        console.log(error);
      });
    });
  }
    }
}