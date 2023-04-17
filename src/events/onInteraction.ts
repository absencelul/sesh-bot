import { Interaction } from "discord.js";

import { CommandList } from "../commands/_CommandList";

export async function onInteraction(interaction: Interaction) {
  if (interaction.isCommand()) {
    for (const Command of CommandList) {
      if (Command.data.name === interaction.commandName) {
        await Command.execute(interaction);
        break;
      }
    }
  }
}
