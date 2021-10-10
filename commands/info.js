const { SlashCommandBuilder } = require('@discordjs/builders');

const JokeWrapper = require('@qgisk/jokeapi-wrapper');
const JokeClient = new JokeWrapper();

const { MessageEmbed } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder().setName('info').setDescription('Replies with Joke api information!'),
  async execute(interaction, settings) {
    const output = await JokeClient.info(settings);

    console.log(
      { name: 'version', value: output.version },
      { name: 'JokeCount', value: String(output.jokes.totalCount) },
      { name: 'Joke Types', value: output.jokes.types.join(' & ') },
      { name: 'Information', value: output.info }
    );

    const infoEmbed = new MessageEmbed()
      .setTitle('Joke API & Bot Information')
      .setURL('https://jokeapi.dev')
      .addFields(
        { name: 'version', value: output.version, inline: true },
        { name: 'JokeCount', value: String(output.jokes.totalCount), inline: true },
        { name: 'Joke Types', value: output.jokes.types.join(' & '), inline: true },
        { name: 'Information Joke API', value: output.info },
        {
          name: 'Information JokeBot',
          value: 'For help with the joke bot please message me on discord here https://discord.gg/WUTJfjhhuY',
        }
      );

    await interaction.reply({ embeds: [infoEmbed] });
  },
};
