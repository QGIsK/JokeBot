const { SlashCommandBuilder } = require('@discordjs/builders');

const langOptions = ['cs', 'de', 'en', 'es', 'fr', 'pt'];

module.exports = {
  data: new SlashCommandBuilder()
    .setName('lang')
    .setDescription(`Set a language for jokes to be returned in.`)
    .addStringOption((option) => option.setName('lang').setDescription(`options: ${langOptions.join(', ')}.`)),

  async execute(interaction, settings) {
    const language = interaction.options.get('lang').value;

    if (!langOptions.includes(language))
      return interaction.reply(`Lang code not supported, Supported languages: ${langOptions.join(', ')}`);

    settings.lang = language;

    await settings.save();

    await interaction.reply(`Language is now set to : ${settings.lang} `);
  },
};
