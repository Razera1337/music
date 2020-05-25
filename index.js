require('dotenv').config();
const { Client } = require('discord.js');
const { MessageEmbed } = require('discord.js');
const client = new Client();
client.login(process.env.BOT_TOKEN);

client.on('ready', () => console.log(`${client.user.username} is online`))
client.user.setActivity("Hello", {type: "STREAMING", url:"https://twitch.tv/Strandable"});

client.on('message', async message => {
    if(message.author.bot) return;
    if(message.channel.id === '714503832914231397')
        await message.delete();
    if(message.content.toLowerCase() === '!!verify' && message.channel.id === '714503832914231397')
    {   
        await message.delete().catch(err => console.log(err));
        const role = message.guild.roles.cache.get('710167214476624020');
        if(role) {
            try {
                await message.member.roles.add(role);
                const embed = new MessageEmbed()
                .setColor('#00FFFF')
                .setColor(`**You Have Been Verified In This Server**`)
                return message.channel.send(embed).then(msg => {msg.delete(20000)});
            }
            catch(err) {
                console.log(err);
            }
            message.delete()
        }
    }
});

client.on('guildMemberAdd', member => {
    console.log(member.user.tag);
});
