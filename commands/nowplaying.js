module.exports = {
  name: "nowplaying",
  alias: ["np", "playing"],
  usage: "",
  description: "See the currently playing song position and length.",
  category: "music",
  async execute(msg, args, client, Discord, command) {
    const queue = client.queue.get(msg.guild.id);
    if (!queue) return msg.channel.send(client.messages.noServerQueue);
    let songTime = (queue.songs[0].info.lengthSeconds * 1000).toFixed(0);
    let completed = (
      queue.connection.dispatcher.streamTime + queue.time
    ).toFixed(0);
    let barlength = 20;
    let completedpercent = ((completed / songTime) * barlength).toFixed(0);
    let array = [];
    for (let i = 0; i < completedpercent - 1; i++) {
      array.push(`[■](${queue.songs[0].url})`);
    }
    array.push(`[■](${queue.songs[0].url})`);
    for (let i = 0; i < barlength - completedpercent - 1; i++) {
      array.push("□");
    }
    const embed = new Discord.MessageEmbed()
      .setAuthor(`Playing | ${queue.volume}% 🔉`, "https://media.discordapp.net/attachments/734734747976073306/735033357435404288/496793735946960916.gif")
      .setTitle("<:yt:735031497148334132> | Playback In Progress")
      .setDescription(
        `**[${
          queue.songs[0].title
        }](${queue.songs[0].url})** Posted By **${queue.songs[0].info.author.name}**`
      )
      .addField(
        "**Player Information**", `Queue Length: **${client.funcs.msToTime(songTime, "hh:mm:ss")}**\nTrack Time Length: **${client.funcs.msToTime(songTime, "hh:mm:ss")}**`, true
      )
      .addField(
        "**Requested By**", `${queue.songs[0].author.tag}`, true
      )
      .addField("**Length**", `**${client.funcs.msToTime(
          completed,
          "hh:mm:ss"
        )}** | ${array.join("")} | **${client.funcs.msToTime(songTime, "hh:mm:ss")}**`
      )
      .setThumbnail(queue.songs[0].info.thumbnail.thumbnails[4].url)
      .setColor(client.config.embedColor);
    if (queue.nigthCore)
      embed.setDescription(
        `[${queue.songs[0].title}](${queue.songs[0].url}) Posted By **${queue.songs[0].info.author.name}**`
      );
    return msg.channel.send(embed);
  },
};