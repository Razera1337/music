const { RichEmbed } = require("discord.js")
const mapping = '¡"#$%⅋,)(*+\'-˙/0ƖᄅƐㄣϛ9ㄥ86:;<=>?@∀qƆpƎℲפHIſʞ˥WNOԀQɹS┴∩ΛMX⅄Z[/]^_`ɐqɔpǝɟƃɥᴉɾʞlɯuodbɹsʇnʌʍxʎz{|}~';
// Start with the character '!'
const OFFSET = '!'.charCodeAt(0);
const colours = require("../../colours.json")

module.exports = {
    config: {
        name: "flipword",
        aliases: ["upsidedown"],
        usage: "<word>",
        category: "games",
        description: "Flips the word u have given",
        accessableby: "Members"
    },
    run: async (bot, message, args) => {
            if (args.length < 1) {
              const embed = new RichEmbed()
              .setColor(colours.red)
              .setDescription("You Must Provide Text To Flip!")
              return message.channel.send(embed);
            }
  
            const embed2 = new RichEmbed()
            .setColor(colours.green)
            .setDescription(args.join(' ').split('')
                    .map(c => c.charCodeAt(0) - OFFSET)
                    .map(c => mapping[c] || ' ')
                    .reverse().join(''))
            message.channel.send(embed2);
    }
}
