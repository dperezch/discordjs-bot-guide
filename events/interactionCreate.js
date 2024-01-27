const { Events } = require("discord.js");

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    if (!interaction.isChatInputCommand()) return;
    console.log(interaction);

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
      console.error(
        `Ningún comando - ${interaction.commandName} - fue encontrado`
      );
      return;
    }

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: "¡Hubo un error al ejecutar este comando!",
          ephemeral: true,
        });
      } else {
        await interaction.reply({
          content: "¡Hubo un error al ejecutar este comando!",
          ephemeral: true,
        });
      }
    }
  },
};
