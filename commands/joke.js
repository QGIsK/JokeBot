const { SlashCommandBuilder } = require('@discordjs/builders');
const JokeWrapper = require('@qgisk/jokeapi-wrapper');
const JokeClient = new JokeWrapper();

module.exports = {
  data: new SlashCommandBuilder()
    .setName('joke')
    .setDescription('Replies with a joke!')
    .addStringOption((option) => option.setName('category').setDescription(`${JokeWrapper.CATEGORIES.join(', ')}.`)),
  async execute(interaction, settings) {
    const category = interaction.options.get('category');

    category ? (settings.categories = category.value) : 'any';

    const output = await JokeClient.getJoke(settings);

    if (!output.joke && !output.setup)
      return interaction.reply(
        'No jokes in this category, Please check set categories, language and blacklisted flags. /settings'
      );

    if (output.type == 'single') {
      return interaction.reply(output.joke);
    }

    await interaction.reply(output.setup);
    setTimeout(() => {
      return interaction.channel.send(output.delivery);
    }, 2000);
  },
};
