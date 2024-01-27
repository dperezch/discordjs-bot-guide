require("dotenv/config");
const {REST, Routes} = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');

const commands = [];
// Toma todas las carpetas de comandos del directorio de comandos que creaste anteriormente
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders){
    // Toma todos los archivos de comandos del directorio de comandos que creaste anteriormente
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    // Toma la salida SlashCommandBuilder#toJSON() de los datos de cada comando para su implementación
    for(const file of commandFiles){
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        if('data' in command && 'execute' in command){
            commands.push(command.data.toJSON());
        } else {
            console.log(`[WARNING] El comando en ${filePath} no contiene la propiedad "data" o "execute" requerida`);
        }
    }
}

// Construir y preparar una instancia del módulo REST
const rest = new REST().setToken(process.env.DISCORD_TOKEN);

// ¡y despliega tus comandos!
(async ()=>{
    try {
        console.log(`Comenzó a actualizar ${commands.length} comandos de aplicación (/)`);

        // El método put se utiliza para actualizar completamente todos los comandos del gremio con el conjunto actual
        const data = await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: commands},
        );

        console.log(`Se recargaron con éxito ${data.length} comandos de aplicación (/)`);
    } catch (error) {
        console.error(error);
    }
})();