const discord = require("discord.js")
const { token, prefix, ownerid } = require("../../botconfig.json")
const db = require("quick.db")
const Canvas = require('canvas');

const applyText = (canvas, text) => {
	const ctx = canvas.getContext('2d');
	let fontSize = 70;

	do {
		ctx.font = `${fontSize -= 10}px sans-serif`;
	} while (ctx.measureText(text).width > canvas.width - 300);

	return ctx.font;
};

module.exports = (bot, message) => {
      console.log(" _________________________________________");
      console.log("|                BOT PAGE                |");
      console.log("|             BOT NOW ACTIVE             |");
      console.log("|----------------------------------------|");
      console.log("|      Logging Alix Now Start...         |");
      console.log("|________________________________________|");
     const FF = new discord.RichEmbed()
  .setAuthor(bot.user.username, bot.user.displayAvatarURL)
  .setColor("RANDOM")
  .setDescription(`<a:tickag:724216971260067862> | **${bot.user.username}** is online on \`${bot.guilds.size}\` servers!`)
  .setTimestamp()
  bot.channels.get("727088758071099432").send(FF)
 
  bot.on("guildCreate", guild => {
      const gdgdgd = new discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription(`**New guild joined: ${ guild.name }. This guild has ${ guild.memberCount } members!**`)
    .setTimestamp()
    bot.channels.get('727088758071099432').send(gdgdgd)
})

  bot.on('guildDelete', guild => {
    const ffffff = new discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription(`**I have been kicked out from ${ guild.name }. that guild has ${ guild.memberCount } members!**`)
    .setTimestamp()
    bot.channels.get('727088758071099432').send(ffffff)
  })
  
  bot.on('message', async message => {
	if (message.content === '!!join') {
		bot.emit('guildMemberAdd', message.member || await message.guild.fetchMember(message.author));
	}
    if(message.content === `!!reboot`) {
   	if (message.author.id !== "462518905806520322") {
      const embedg = new discord.RichEmbed()
      .setColor("RED")
      .setDescription("**Your Are Not The Bot Owner**")
      return message.channel.send(embedg);
    }
  
      const embef = new discord.RichEmbed()
      .setColor("RANDOM")
      .setDescription("**Restarted** <a:yes:726360824372920341>")
      message.channel.send(embef).then(m => {
        bot.destroy().then(() => {
          bot.login(token);
        });
      });
    }
});

    bot.user.setActivity(`!!help || ${bot.guilds.size} Servers`, {type: "WATCHING"})
    bot.user.setStatus("idle")
};
