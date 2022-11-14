import { ILoggerMethodStrategy } from '../../logger.types';
import { LoggerMethodAbstract } from '../logger-method.abstract';

export class LoggerMethodWarningStrategy extends LoggerMethodAbstract implements ILoggerMethodStrategy {
    log(message: string, ...args: any[]): void {
        console.warn(message, ...args);
    }
}
