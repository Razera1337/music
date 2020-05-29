require('dotenv').config();
const { Client } = require('discord.js');
const { RichEmbed } = require('discord.js');
const client = new Client();
client.login(process.env.BOT_TOKEN);
const guildInvites = new Map();

client.on("ready", async () => {
    console.log(`${client.user.username} is online`)
    client.user.setActivity("Hello World", {type: "STREAMING", url:"https://twitch.tv/Strandable"});
    client.guilds.cache.forEach(guild => {
        guild.fetchInvites()
            .then(invites => guildInvites.set(guild.id, invites))
            .catch(err => console.log(err));
    });
})

client.on('message', async message => {
    if(message.author.bot) return;
    if(message.channel.id === '715102809791660063')
        await message.delete();
    if(message.content.toLowerCase() === '!!verify' && message.channel.id === '715102809791660063')
    {   
        await message.delete().catch(err => console.log(err));
        const role = message.guild.roles.get('715060227485204481');
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
        }
    }
});

client.on('guildMemberAdd', member => {
    console.log(member.user.tag);
});

client.on('guildMemberAdd', async member => {
    const cachedInvites = guildInvites.get(member.guild.id);
    const newInvites = await member.guild.fetchInvites();
    guildInvites.set(member.guild.id, newInvites);
    try {
        const usedInvite = newInvites.find(inv => cachedInvites.get(inv.code).uses < inv.uses);
        const embed = new RichEmbed()
            .setDescription(`${member.user.tag} is the ${member.guild.memberCount} to join.\nJoined using ${usedInvite.inviter.tag}\nNumber of uses: ${usedInvite.uses}`)
            .setTimestamp()
            .setTitle(`${usedInvite.url}`);
        const welcomeChannel = member.guild.channels.find(channel => channel.id === '715061320831074325');
        if(welcomeChannel) {
            welcomeChannel.send(embed).catch(err => console.log(err));
        }
    }
    catch(err) {
        console.log(err);
    }
});
