const { Events } = require('discord.js');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (!interaction.isChatInputCommand()) return;

		const command = interaction.client.commands.get(interaction.commandName);
        
		if (!command) {
			console.error(`No command matching ${interaction.commandName} was found.`);
			return;
		}

		try {
			await command.execute(interaction);
		} catch (error) {
			console.error(`Error executing ${interaction.commandName}`);
			console.error(error);
		};
		
		const { commandName } = interaction
		if (commandName === 'oi') {
			interaction.reply('Olá!');
		} else if (commandName === 'beep') {
			interaction.reply('Boop.');
		} else if (commandName === 'server') {
			interaction.reply('Guild name: ' + interaction.guild.name + '\nTotal members: ' + interaction.guild.memberCount);
		} else if (commandName === 'user-info') {
			interaction.reply('Your username: ' + interaction.user.username + '\nYour ID: ' + interaction.user.id);
		}
		
	},

};