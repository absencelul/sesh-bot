import { Client } from "discord.js";
import * as dotenv from "dotenv";

import { IntentOptions } from "./config/IntentOptions";
import { validateEnv } from "./utils/validation";
import { onInteraction } from "./events/onInteraction";
import { onReady } from "./events/onReady";

dotenv.config();

(async () => {
  if (!validateEnv()) {
    return;
  }

  const BOT = new Client({ intents: IntentOptions });

  BOT.on("ready", async () => await onReady(BOT));
  BOT.on("interactionCreate", async (interaction) => {
    await onInteraction(interaction);
  });

  await BOT.login(process.env.DISCORD_TOKEN);
})();
