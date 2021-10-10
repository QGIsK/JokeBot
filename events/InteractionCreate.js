const logger = require('../config/logger');

const DB = require('../db');

module.exports = {
  name: 'interactionCreate',
  async execute(interaction, client) {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    const settings = await DB.Server.findOneOrCreate({ guildID: interaction.guildId });

    try {
      await command.execute(interaction, settings);
    } catch (error) {
      logger.error(error);
      await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
  },
};
