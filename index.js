require('dotenv').config();
const { Client } = require('discord.js');
const { RichEmbed } = require('discord.js');
const client = new Client();
client.login(process.env.BOT_TOKEN);

client.on("ready", async () => {
    console.log(`${client.user.username} is online`)
    client.user.setActivity("Hello World", {type: "STREAMING", url:"https://twitch.tv/Strandable"});
})

client.on('message', async message => {
    if(message.author.bot) return;
    if(message.channel.id === '714503832914231397')
        await message.delete();
    if(message.content.toLowerCase() === '!!verify' && message.channel.id === '714503832914231397')
    {   
        await message.delete().catch(err => console.log(err));
        const role = message.guild.roles.get('710167214476624020');
        if(role) {
            try {
                await message.member.addRole(role);
                const embed = new RichEmbed()
                .setColor('#00FFFF')
                .setDescription(`**You Have Been Verified In This Server**`)
                return message.channel.send(embed).then(msg => {msg.delete(20000)});
            }
            catch(err) {
                console.log(err);
            }
            message.delete()
        }
    }
    
    if(message.author.bot) return;
  console.log(message.mentions);
  if(message.content.toLowerCase().startsWith('!stats')) {
    const args = message.content.split(' ');
    console.log(args);
    if(args.length > 2) {
      message.channel.send(`\```Incorrect Usage: !stats | !stats <user_id> | !stats @mention\````);
    } else if(args.length === 2) {
      const member = message.mentions.members.size === 1 ? 
        message.mentions.members.first() :
        message.guild.members.get(args[1]);
      if(member) {
        const embed = new RichEmbed()
          .setAuthor(`${member.user.tag} (${member.id})`, member.user.displayAvatarURL)
          .setThumbnail(member.user.displayAvatarURL)
          .addField('Created On', member.user.createdAt.toLocaleString(), true)
          .addField('Joined On', member.joinedAt, true)
          .addField('Kickable', member.kickable, false)
          .addField('Voice Channel', member.voice.channel ? member.voice.channel.name + `(${member.voice.channel.id})` : 'None')
          .addField('Presence', member.presence.status)
          .setDescription(`${member.roles.cache.map(role => role.toString()).join(' ')}`);
        message.channel.send(embed);
      } else {
        message.channel.send(`I couldn't find that member with ID ${args[1]}`);
      }
      
    } else {
      const { guild } = message;
      const embed = new RichEmbed()
        .setAuthor(`${guild.name} (${guild.id})`, guild.iconURL)
        .setThumbnail(guild.iconURL())
        .addField('Created On', guild.createdAt.toLocaleString(), true)
        .addField('Guild Owner', guild.owner.user.tag)
        .addField('Total Members', guild.memberCount, true)
        .addField('Total Real Members', guild.members.cache.filter(member => !member.user.bot).size, true)
        .addField('Total Bots', guild.members.cache.filter(member => member.user.bot).size, true)
        .addField('Total Channels', guild.channels.cache.size, true)
        .addField('Total Text Channels', guild.channels.cache.filter(ch => ch.type === 'text').size, true)
        .addField('Total Voice Channels', guild.channels.cache.filter(ch => ch.type === 'voice').size, true)
        .setColor('#5CC5FF')
        .setDescription(`${guild.roles.map(role => role.toString()).join(' ')}`);
      message.channel.send(embed);
    }
  }
});

client.on('guildMemberAdd', member => {
    console.log(member.user.tag);
});
