const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("user")
    .setDescription("Entrega información acerca del usuario."),
  async execute(interaction) {
    await interaction.reply(`
        Este comando fue activado por ${interaction.user.username}, quien se unió en ${interaction.member.joinedAt}.`);
  },
};
