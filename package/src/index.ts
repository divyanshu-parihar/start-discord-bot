const { Client, Intents, Message } = require("discord.js");
import intialinitializeMongoDB from "./services/database/index";
import { readdir } from "fs";
import config from "config";
import Collection from "@discordjs/collection";

//setting node_env
process.env.NODE_ENV = "dev";
export interface runEvent {
  message: typeof Message;
  client: typeof Client;
  args: string[];
  dev: boolean;
}
const dev =
  process.env.NODE_ENV == "dev" || process.env.NODE_ENV == "local"
    ? true
    : false;
const commands: Collection<string[], (event: runEvent) => any> =
  new Collection();

readdir("./src/commands", (err, allFiles) => {
  if (err) console.log(err);
  let files = allFiles.filter(
    (f) => f.split(".").pop() === (dev ? "ts" : "js")
  );
  if (files.length <= 0) console.log("No commands found!");
  else
    for (let file of files) {
      const props = require(`./commands/${file}`) as {
        names: string[];
        run: (event: runEvent) => any;
      };
      commands.set(props.names, props.run);
    }
});

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on("messageCreate", async (message: any) => {
  //any type due to config module
  const prefix: any = config.get("app.prefix");
  if (
    message.channel.type === "dm" ||
    message.author.bot ||
    !message.content.startsWith(prefix)
  )
    return;
  // message.member = await message.guild.fetchMember(message.author);

  const args = message.content.split(/ +/);
  // if (args.length < 1) return;
  const command = args.shift().toLowerCase().slice(prefix.length);
  const commandFile = commands.find((_r, n) => n.includes(command));
  if (!commandFile) return;
  else
    commandFile({
      message,
      args,
      client,
      dev,
    });
});

if (dev) {
  client.on("debug", (e: runEvent) => {
    console.log(e);
  });
}

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
intialinitializeMongoDB();
client.login(config.get("app.token"));
