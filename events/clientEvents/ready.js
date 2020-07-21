module.exports = {
  name: "ready",
  async execute(client) {
    client.user.setActivity(`!help | 🎶`, {
      type: "LISTENING",
    });
    console.log(`- Activated -`);
  },
};