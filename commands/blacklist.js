const { SlashCommandBuilder } = require('@discordjs/builders');

const JokeWrapper = require('@qgisk/jokeapi-wrapper');
const JokeClient = new JokeWrapper();

module.exports = {
  data: new SlashCommandBuilder()
    .setName('blacklist')
    .setDescription(`Blacklist certain flags for more pg jokes.`)
    .addStringOption((option) => option.setName('flag').setDescription(`${JokeWrapper.BLACKLIST_FLAGS.join(', ')}.`)),

  async execute(interaction, settings) {
    const flag = interaction.options.get('flag');

    if (!flag) return interaction.reply(`Please supply a flag, Available flags: ${JokeWrapper.BLACKLIST_FLAGS.join(', ')}`);
    if (!JokeWrapper.BLACKLIST_FLAGS.includes(flag.value))
      return interaction.reply(`Please supply a valid flag, Available flags: ${JokeWrapper.BLACKLIST_FLAGS.join(', ')}`);

    if (settings.blacklist.includes(flag.value)) settings.blacklist = settings.blacklist.filter((x) => x !== flag.value);
    else settings.blacklist.push(flag.value);

    await settings.save();

    return settings.blacklist.length > 0
      ? interaction.reply(`Blacklisted flags are now: ${settings.blacklist.join(', ')}.`)
      : interaction.reply('No blacklisted flags.');
  },
};
