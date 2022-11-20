import { PermissionsBitField, SlashCommandBuilder } from 'discord.js';
import { Leonies } from './client';

/**
 * The command interaction options structure.
 *
 * @interface
 */
export interface CommandInterface {
    readonly client: Leonies;
    name: string;
    description: string;
    group?: string;
    permissions?: {
        user: PermissionsBitField[];
        client: PermissionsBitField[];
    };
    config?: CommandConfig;
    buildCommand: SlashCommandBuilder;
}

export interface CommandConfig {
    guildOnly?: boolean = false;
    ownerOnly?: boolean = false;
    disabled?: boolean = false;
    cooldown?: number = 3;
}
