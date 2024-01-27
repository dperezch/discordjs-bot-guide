const {SlashCommandBuilder} = require('discord.js');
const { request } = require('undici');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("cat")
        .setDescription("Muestra un gato"),
    async execute(interaction){
        const catResult = await request('https://api.thecatapi.com/v1/images/search');
        const cat = await catResult.body.json();
        console.log('DESDE API: ', cat[0].url);
        interaction.reply({ content: cat[0].url, ephemeral: true });
    }
}