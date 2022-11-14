import { ILoggerMethodStrategy } from '../../logger.types';
import { LoggerMethodAbstract } from '../logger-method.abstract';

export class LoggerMethodErrorStrategy extends LoggerMethodAbstract implements ILoggerMethodStrategy {
    log(message: string, ...args: any[]): void {
        console.error(message, ...args);
    }
}
