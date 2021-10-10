const { SlashCommandBuilder } = require('@discordjs/builders');

const JokeWrapper = require('@qgisk/jokeapi-wrapper');
const JokeClient = new JokeWrapper();

const { MessageEmbed } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder().setName('flags').setDescription('Replies with Joke api flags avaliable to blacklist!'),
  async execute(interaction, settings) {
    const output = await JokeClient.flags(settings);

    await interaction.reply(output.flags.join(', '));
  },
};
