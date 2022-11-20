import { Command } from './interactions';
import { Client, Collection } from 'discord.js';
import { Config } from './config';
import ConfigJson from '../../util/config.json';

/**
 * Interface for the Leonies client.
 *
 * @interface
 */
export interface Leonies extends Client {
    readonly config: Config = ConfigJson;
    commands: Collection<string, Command>;
    invite: string = ConfigJson.discord;
    init: () => void | Promise<void>;
}
