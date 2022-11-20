import { CommandInterface } from './interactions';
import { Client, Collection } from 'discord.js';
import { Config } from './config';

/**
 * Interface for the Leonies client.
 *
 * @interface
 */
export interface Leonies extends Client {
    readonly config: Config;
    commands: Collection<string, CommandInterface>;
    invite: string;
    init: () => void | Promise<void>;
}
