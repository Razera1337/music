const json5 = require("json5");
const fs = require("fs");
const path = require("path");
const Discord = require("discord.js");
let userConfig;

// Try to find our config file from several options
const configFiles = [
  "config.json",
  "config.json5",
  "config.json.json",
  "config.json.txt",
  "config.js"
];

let foundConfigFile;

for (const configFile of configFiles) {
  try {
    fs.accessSync(__dirname + "/../" + configFile);
    foundConfigFile = configFile;
    break;
  } catch (e) {}
}

if (!foundConfigFile) {
  throw new Error(`Could not find config.json!`);
}

// Parse the config using JSON5
try {
  if (foundConfigFile.endsWith(".js")) {
    userConfig = require(`../${foundConfigFile}`);
  } else {
    const raw = fs.readFileSync(__dirname + "/../" + foundConfigFile);
    userConfig = json5.parse(raw);
  }
} catch (e) {
  throw new Error(
    `Error reading config file! The error given was: ${e.message}`
  );
}

const defaultConfig = {
  token: "NzIxOTQzMDc3MzU0MjA5Mjgx.Xur_-Q.fHRN6QJN0Rk50esRRjc82pOnMtc",
  mailGuildId: "687868462843953182",
  mainGuildId: "687868462843953182",
  logChannelId: "721942624042221608",

  prefix: "z!",
  snippetPrefix: "z!",

  status: "DM ME FOR ANY HELP!",
  statustype: "STREAMING",
  responseMessage:
    "**<a:l_9:722307982255456357> Our Team Will Response To Your Message As Soon As Possible.**",
  closeMessage: "**<a:wrong_5:720578264640258121> Your Conversation Has Been Closed**",

  newThreadCategoryId: "722071914402676796",
  mentionRole: "here",
  pingOnBotMention: true,

  inboxServerPermission: null,
  alwaysReply: false,
  alwaysReplyAnon: false,
  useNicknames: false,
  ignoreAccidentalThreads: true,
  threadTimestamps: false,
  allowMove: true,
  typingProxy: true,
  typingProxyReverse: true,

  enableGreeting: true,
  greetingMessage: "https://discord.gg/HGCuZX",
  greetingAttachment: "Please Join",

  requiredAccountAge: "24", // In hours
  accountAgeDeniedMessage:
    "Your Discord account is not old enough to contact our staff team through Hammer!",

  relaySmallAttachmentsAsAttachments: false,
  smallAttachmentLimit: 1024 * 1024 * 2,

  port: 8890,
  url: null,

  dbDir: path.join(__dirname, "..", "db"),
  knex: null,

  logDir: path.join(__dirname, "..", "logs")
};

const required = ["token", "mailGuildId", "mainGuildId", "logChannelId"];

const finalConfig = Object.assign({}, defaultConfig);

for (const [prop, value] of Object.entries(userConfig)) {
  if (!defaultConfig.hasOwnProperty(prop)) {
    throw new Error(`Invalid option: ${prop}`);
  }

  finalConfig[prop] = value;
}

// Default knex config
if (!finalConfig["knex"]) {
  finalConfig["knex"] = {
    client: "sqlite",
    connection: {
      filename: path.join(finalConfig.dbDir, "data.sqlite")
    },
    useNullAsDefault: true
  };
}

// Make sure migration settings are always present in knex config
Object.assign(finalConfig["knex"], {
  migrations: {
    directory: path.join(finalConfig.dbDir, "migrations")
  }
});

// Make sure all of the required config options are present
for (const opt of required) {
  if (!finalConfig[opt]) {
    console.error(`Missing required config.json value: ${opt}`);
    process.exit(1);
  }
}

if (finalConfig.smallAttachmentLimit > 1024 * 1024 * 8) {
  finalConfig.smallAttachmentLimit = 1024 * 1024 * 8;
  console.log("[WARN] smallAttachmentLimit capped at 8MB");
}

// Make sure mainGuildId is internally always an array
if (!Array.isArray(finalConfig["mainGuildId"])) {
  finalConfig["mainGuildId"] = [finalConfig["mainGuildId"]];
}

module.exports = finalConfig;
