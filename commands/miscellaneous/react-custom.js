const config = require("../../botconfig.json")

module.exports= {
    config: {
        name: "react-custom",
        description: "",
        usage: "react-custom",
        category: "miscellaneous",
        accessableby: "Members",
        aliases: ["reactcustom", "react-random", "reactrandom"]
    },
    run: async (bot, message, args) => {
       const emoji = bot.emojis.get(config.emojiID);
        message.react(emoji);
    }
}