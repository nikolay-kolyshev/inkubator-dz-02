export interface ILoggerMethodStrategy {
    log(message: string, ...args: any[]): void;
}
