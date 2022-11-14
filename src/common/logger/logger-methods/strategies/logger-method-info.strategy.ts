import { ILoggerMethodStrategy } from '../../logger.types';
import { LoggerMethodAbstract } from '../logger-method.abstract';

export class LoggerMethodInfoStrategy extends LoggerMethodAbstract implements ILoggerMethodStrategy {
    log(message: string, ...args: any[]): void {
        console.info(message, ...args);
    }
}
