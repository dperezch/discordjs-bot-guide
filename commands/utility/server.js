const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("server")
    .setDescription("Entrega información acerca del servidor"),
  async execute(interaction) {
    await interaction.reply(`
        Este servidor es ${interaction.guild.name} y tiene ${interaction.guild.memberCount} miembros.`);
  },
};
