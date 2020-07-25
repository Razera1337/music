
module.exports = {
  name: "ready",
  async execute(client) {
    client.user.setActivity(`!help | 🎶`, {
      type: "STREAMING",
    });
    console.log(`- Activated -`);
  },
};