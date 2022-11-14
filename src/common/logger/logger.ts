import { provide } from 'inversify-binding-decorators';
import { LoggerMethodErrorStrategy } from './logger-methods/strategies/logger-method-error.strategy';
import { LoggerMethodInfoStrategy } from './logger-methods/strategies/logger-method-info.strategy';
import { LoggerMethodWarningStrategy } from './logger-methods/strategies/logger-method-warning.strategy';
import { LOGGER_IDS } from './logger.constants';
import { ILoggerMethodStrategy } from './logger.types';

@provide(LOGGER_IDS.Logger)
export class Logger {
    private errorMethod: ILoggerMethodStrategy;
    private warningMethod: ILoggerMethodStrategy;
    private infoMethod: ILoggerMethodStrategy;

    constructor() {
        this.errorMethod = new LoggerMethodErrorStrategy();
        this.warningMethod = new LoggerMethodWarningStrategy();
        this.infoMethod = new LoggerMethodInfoStrategy();
    }

    public error(message: string, ...args: any[]): void {
        this.errorMethod.log(message, ...args);
    }

    public warning(message: string, ...args: any[]): void {
        this.warningMethod.log(message, ...args);
    }

    public info(message: string, ...args: any[]): void {
        this.infoMethod.log(message, ...args);
    }
}
