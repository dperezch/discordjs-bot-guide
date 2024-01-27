//Requiere las clases necesarios de discord.js
require("dotenv/config");
const fs = require('node:fs');
const path = require('node:path');
const {Client, Collection, GatewayIntentBits } = require('discord.js');

//Crear nueva instancia de cliente
const client = new Client({
    intents: [GatewayIntentBits.Guilds],
})

client.commands = new Collection();

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for(const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    for (const file of commandFiles){
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        // Set a new item in the Collection with the key as the command name and the value as the exported module
        if('data' in command && 'execute' in command ) {
            client.commands.set(command.data.name, command);
        } else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }
}

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for(const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if(event.once){
        client.once(event.name, (...args)=> event.execute(...args));
    } else {
        client.on(event.name, (...args)=> event.execute(...args));
    }
}

//Log in en discord con tu token de cliente
client.login(process.env.DISCORD_TOKEN);


/* client.on(Events.InteractionCreate, async interaction => {
    if(!interaction.isChatInputCommand()) return;
    console.log(interaction);

    const command = interaction.client.commands.get(interaction.commandName);

    if(!command){
        console.error(`Ningún comando - ${interaction.commandName} - fue encontrado`);
        return;
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        if(interaction.replied || interaction.deferred){
            await interaction.followUp({content: '¡Hubo un error al ejecutar este comando!', ephemeral: true});
        } else {
            await interaction.reply({content: '¡Hubo un error al ejecutar este comando!', ephemeral: true});
        }
    }
});

//Cuando el cliente esta listo, corre este código una sola vez
client.once(Events.ClientReady, readyClient => {
    console.log(`Listo! Logeado como ${readyClient.user.tag}`);
}) */