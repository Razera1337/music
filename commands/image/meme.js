const { RichEmbed } = require("discord.js")
const { red } = require("../../colours.json");
const randomPuppy = require('random-puppy');
module.exports = { 
    config: {
        name: "meme",
        description: "Sends a meme from a website!",
        usage: "",
        category: "image",
        accessableby: "Members",
    },
    run: async (bot, message, args) => {

    let reddit = [
        "meme",
        "animemes",
        "MemesOfAnime",
        "animememes",
        "AnimeFunny",
        "dankmemes",
        "dankmeme",
        "wholesomememes",
        "MemeEconomy",
        "techsupportanimals",
        "meirl",
        "me_irl",
        "2meirl4meirl",
        "AdviceAnimals"
    ]

    let subreddit = reddit[Math.floor(Math.random() * reddit.length)];

            let msg = await message.channel.send("Generating...")
    
    randomPuppy(subreddit).then(async url => {
            await message.channel.send({
                files: [{
                    attachment: url,
                    name: 'meme.png'
                }]
            });
                  msg.delete();
    }).catch(err => console.error(err));
    }
}