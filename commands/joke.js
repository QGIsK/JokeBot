const { SlashCommandBuilder } = require('@discordjs/builders');
const JokeWrapper = require('@qgisk/jokeapi-wrapper');
const JokeClient = new JokeWrapper();

module.exports = {
  data: new SlashCommandBuilder().setName('joke').setDescription('Replies with a joke!'),
  async execute(interaction, settings) {
    const output = await JokeClient.getJoke({ ...settings });

    if (output.type == 'single') {
      return interaction.reply(output.joke);
    }

    await interaction.reply(output.setup);
    setTimeout(() => {
      return interaction.channel.send(output.delivery);
    }, 2000);
  },
};
