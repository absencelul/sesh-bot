import { SlashCommandBuilder } from "@discordjs/builders";

import { Command } from "../interfaces/Command";

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
    const script = interaction.options.get("script")?.value;
    const headers = new Headers({
      "content-type": "application/json; charset=UTF-8",
      apikey: process.env.LUA_OBFUSCATOR_API_KEY as string,
    });

    try {
      const response = await fetch(
        `${process.env.LUA_OBFUSCATOR_URI}/one-click/hard`,
        {
          method: "POST",
          headers,
          body: script as string,
        }
      );
      const responseJSON = await response.json();
      if (responseJSON.message) {
        await interaction.editReply(responseJSON.message);
        return;
      }
      await interaction.editReply({
        content: "Here is your obfuscated script:",
        files: [
          {
            name: "obf.lua",
            attachment: Buffer.from(responseJSON.code),
          },
        ],
      });
    } catch (error) {
      console.error(error);
      await interaction.editReply("An error occurred.");
      return;
    }
  },
};
