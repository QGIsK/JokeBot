const { SlashCommandBuilder } = require('@discordjs/builders');
const JokeWrapper = require('@qgisk/jokeapi-wrapper');
const JokeClient = new JokeWrapper();

const { MessageEmbed } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder().setName('categories').setDescription('Replies with all available categories.'),
  async execute(interaction, settings) {
    const output = await JokeClient.categories({ ...settings });

    const formattedFields = await output.categories.map((category) => {
      const foundAlias = output.categoryAliases.find((x) => x.resolved === category);

      formattedCategory = {
        name: `name: ${category}`,
        value: foundAlias ? `alias: ${foundAlias.alias}` : `\u200b`,
        inline: true,
      };

      return formattedCategory;
    });

    console.log(formattedFields);

    const categoryEmbed = new MessageEmbed()
      .setTitle('Available Categories')
      .setURL('https://jokeapi.dev')
      .addFields(formattedFields);

    await interaction.channel.send({ embeds: [categoryEmbed] });
  },
};
