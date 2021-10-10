const { SlashCommandBuilder } = require('@discordjs/builders');

const { MessageEmbed } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder().setName('settings').setDescription('See current settings'),

  async execute(interaction, settings) {
    console.log(
      { name: 'safemode', value: `${settings.safemode ? 'on' : 'off'}`, inline: true },
      { name: 'lang', value: settings.lang, inline: true },
      { name: 'blacklist', value: settings.blacklist.join(', ') ?? 'No blacklisted flags yet.' }
    );
    const settingsEmbed = new MessageEmbed()
      .setTitle('Settings for JokeBot')
      .addFields(
        { name: 'safemode', value: `${settings.safemode ? 'on' : 'off'}`, inline: true },
        { name: 'lang', value: settings.lang, inline: true },
        {
          name: 'blacklist',
          value: settings.blacklist.length > 0 ? settings.blacklist.join(', ') : 'No blacklisted flags yet.',
        }
      );

    await interaction.reply({ embeds: [settingsEmbed] });
  },
};
