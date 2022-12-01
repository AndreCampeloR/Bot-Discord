
const prefixo = '$'

// Require the necessary discord.js classes

const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits, Message, Events } = require('discord.js');
const { token } = require('./config.json');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();

// eventos

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

// comandos

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

// comandos de chat

client.on(Events.InteractionCreate, interaction => {
	if (!interaction.isChatInputCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'oi') {
		interaction.reply('Olá!');
	} else if (commandName === 'beep') {
		interaction.reply('Boop.');
	} else if (commandName === 'server') {
		interaction.reply('Guild name: ' + interaction.guild.name + '\nTotal members: ' + interaction.guild.memberCount);
	} else if (commandName === 'user-info') {
		interaction.reply('Your username: ' + interaction.user.username + '\nYour ID: ' + interaction.user.id);
	}
});

// quiz


// Log in to Discord with your client's token
client.login(token);














// const Discord = require('discord.js');
// const client = new Discord.Client();

// client.on("ready", () => {
//     console.log('estou online!!');
// });

// client.on("message", async (msg) => {

//     // filtros
//      if(!msg.guild) return;
     
//      if(!msg.content.startsWith(prefixo)) return;

//     // comandos
//     if(msg.content == prefixo + 'join') {  //$join
//        await msg.member.voice.channel.join();
//     }
//     if(msg.content == 'oi') {
//        msg.reply('olá!');
//     }
//     if(msg.content == 'olá') {
//        msg.channel.send('olá ' + msg.author.username);
//     }
// });

// client.login(TOKEN);