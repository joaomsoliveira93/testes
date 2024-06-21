import configs from '../config';
import {formatDate} from './utils';


export default class Logger
{
    public static info(msg: string): void
    {
        msg = this.trimMessage(msg);
        console.info(`${formatDate(new Date())} ${msg}`);
    }

    public static error(msg: string): void
    {
        msg = this.trimMessage(msg);
        
        console.error(`${formatDate(new Date())} ${msg}`);
    }

    private static trimMessage(msg: string): string
    {
        const suffix = msg.length > configs.MAX_LOG_MESSAGE_CHARS ? '...' : '';

        return `${msg.substring(0, configs.MAX_LOG_MESSAGE_CHARS)}${suffix}`;
    }
}
