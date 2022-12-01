const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('oi')
		.setDescription('Replies with hello!'),
	async execute(interaction) {
		await interaction.reply('Olá!');
	},
};
