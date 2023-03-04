'use strict';

/**
 * @file File that defines the ping command.
 * @author Leonardo Natera
 * @since 1.0.0
 * @version 1.0.0
 */

const {
    CommandInteraction,
    PermissionsBitField,
    EmbedBuilder,
    SlashCommandBuilder
} = require('discord.js');
const Command = require('../../structures/Command');

/**
 * The ping command.
 * @class
 * @extends {Command}
 */
class Ping extends Command {
    constructor(client) {
        super(client, {
            name: 'ping',
            group: 'util',
            description: "Checks the bot's latency.",
            permissions: {
                client: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.EmbedLinks],
            },
            buildCommand: new SlashCommandBuilder()
                .setDMPermission(true)
                .setName('ping')
                .setDescription('Checks the bot\'s latency.')
                .setDescriptionLocalizations({
                    'en-US': 'Checks the bot\'s latency.',
                    'es-ES': 'Comprueba la latencia del bot.'
                })
        });
    }

    /**
     * Overwrites the run method.
     * @param {CommandInteraction} interaction The interaction object.
     * @return {void|Promise<void>}
     */
    async run(interaction) {
        try {
            const embed = new EmbedBuilder()
                .setDescription(':infinity: Pinging...')
                .setColor('Purple');

            await interaction.reply({ embeds: [embed], ephemeral: true });

            interaction.fetchReply().then(async (reply) => {
                embed.setTitle(':ping_pong: | Pong!')
                    .setDescription(
                        `:incoming_envelope: • Sending Messages: \`${reply.createdTimestamp - interaction.createdTimestamp
                        } ms\` \n:satellite: • Discord API \`${Math.round(this.client.ws.ping)} ms\``
                    );

                await interaction.editReply({ embeds: [embed] });
            });
        } catch (error) {
            return Promise.reject(error);
        }
    }
}

module.exports = Ping;
