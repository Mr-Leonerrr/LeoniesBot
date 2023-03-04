'use strict';

/**
 * @file File that contains the interactionCreate event.
 * @author Leonardo Natera
 * @since 1.0.0
 * @version 1.0.0
 */

const { CommandInteraction, EmbedBuilder } = require('discord.js');
const Command = require('../structures/Command');
const client = require('../util/bot');
const { getPermissionsLabel } = require('../util/util');

module.exports.data = {
    name: 'interactionCreate'
};

/**
 * Detect the interaction type and run the command.
 * @param {CommandInteraction} interaction
 */
module.exports.run = async (interaction) => {
    if (interaction.isCommand()) {
        /** @type {Command} */
        const command = client.commands.get(interaction.commandName);

        if (!command) {
            return interaction.reply({ content: 'Command not found.', ephemeral: true });
        }

        if (command?.config?.disabled) {
            return await interaction.reply({
                content: 'The command is currently disabled due to technical limitations!',
                ephemeral: true,
            });
        }

        const EmbedPermissions = new EmbedBuilder()
            .setTitle(':stop_sign: Missing Permissions!')
            .setFooter({
                text: 'Thank you for using me in your server!',
                iconURL: client.user.avatarURL(),
            })
            .setColor('Red')
            .setTimestamp();

        interaction.member = interaction.guild.members.cache.get(interaction.user.id);

        if (command.permissions.user) {
            const channelPermissions = interaction.channel.permissionsFor(interaction.member);
            const permissionsLabel = getPermissionsLabel(command.permissions.user);
            EmbedPermissions
                .setDescription(
                    `You don't have the permissions to use this command. \nPlease try again or join [support server](${client.config.discord}) for help.\n**Missing:** \`${permissionsLabel}\``
                );
            if (!channelPermissions.has(command.permissions.user)) {
                return await interaction.reply({ embeds: [EmbedPermissions], ephemeral: true });
            }
        }

        if (command.permissions.client) {
            const channelPermissions = interaction.channel.permissionsFor(client.user);
            const permissionsLabel = getPermissionsLabel(command.permissions.client);
            EmbedPermissions
                .setDescription(
                    `I don't have the permissions to use this command. \nPlease try again or join [support server](${client.config.discord}) for help.\n**Missing:** \`${permissionsLabel}\``
                );
            if (!channelPermissions.has(command.permissions.client)) {
                return await interaction.reply({ embeds: [EmbedPermissions], ephemeral: true });
            }
        }

        try {
            await command.run(interaction);
        } catch (error) {
            console.error(error);
            return Promise.reject(error);
        }
    }
};
