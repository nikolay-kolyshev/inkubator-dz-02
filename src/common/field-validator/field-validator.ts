import { IFieldValidator } from './field-validator.types';

export class FieldValidator implements IFieldValidator {
    private errorsMessages: { message: string; field: string }[] = [];

    public addFieldValidation(config: {
        errorCondition: boolean;
        fieldName: string;
        errorMessage: string;
    }): FieldValidator {
        if (config.errorCondition) {
            this.errorsMessages.push({
                message: config.errorMessage,
                field: config.fieldName,
            });
        }
        return this;
    }

    public get finishAndReturnErrorMessages(): { message: string; field: string }[] {
        const errorsMessages = this.errorsMessages;
        this.errorsMessages = [];
        return errorsMessages;
    }
}
