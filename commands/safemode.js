const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder().setName('safemode').setDescription('Toggle safemode'),

  async execute(interaction, settings) {
    settings.safemode = !settings.safemode;

    await settings.save();

    await interaction.reply(`Safemode is now: ${settings.safemode ? 'on' : 'off'} `);
  },
};
