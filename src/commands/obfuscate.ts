import { SlashCommandBuilder } from "@discordjs/builders";

import { Command } from "../interfaces/Command";
import { Attachment } from "discord.js";

export const obfuscate: Command = {
  data: new SlashCommandBuilder()
    .setName("obfuscate")
    .setDescription("Obfuscates a Lua script")
    .addAttachmentOption((option) =>
      option
        .setName("file")
        .setDescription("The Lua script to obfuscate.")
        .setRequired(true)
    ),
  execute: async (interaction) => {
    await interaction.deferReply();
    const attachment: Attachment = interaction.options.get("file")
      ?.attachment as Attachment;
    if (!attachment) {
      await interaction.editReply("An error occurred.");
      return;
    }
    const headers = new Headers({
      "content-type": "application/json; charset=UTF-8",
      apikey: process.env.LUA_OBFUSCATOR_API_KEY as string,
    });
    try {
      const fileResponse = await fetch(attachment.url);
      if (!fileResponse.ok) {
        await interaction.editReply("An error occurred.");
        return;
      }

      const script = await fileResponse.text();
      const URL =
        (process.env.LUA_OBFUSCATOR_URI ||
          "https://luaobfuscator.com/api/obfuscator") + "/one-click/hard";
      if (script) {
        const response = await fetch(URL, {
          method: "POST",
          headers,
          body: script,
        });
        const responseJSON = await response.json();
        if (responseJSON.message) {
          await interaction.editReply(responseJSON.message);
          return;
        }
        await interaction.editReply({
          content: "Here is your obfuscated script:",
          files: [
            {
              name: attachment.name,
              attachment: Buffer.from(responseJSON.code),
            },
          ],
        });
      }
    } catch (error) {
      await interaction.editReply("An error occurred.");
    }
  },
};
