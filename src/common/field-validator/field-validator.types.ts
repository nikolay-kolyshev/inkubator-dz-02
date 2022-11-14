export interface IFieldValidator {
    addFieldValidation(config: { errorCondition: boolean; fieldName: string; errorMessage: string }): void;
}
