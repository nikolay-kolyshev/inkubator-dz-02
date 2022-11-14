import { FieldValidator } from '../../common/field-validator/field-validator';
import { AVAILABLE_RESOLUTIONS } from './videos.constants';
import { CreateVideoDto, UpdateVideoDto } from './videos.dto';
import { EAvailableResolution } from './videos.types';

export class VideosValidator {
    static validateCreateVideo(dto: CreateVideoDto) {
        const { title, author, availableResolutions } = dto;

        let fieldValidator = new FieldValidator();
        fieldValidator = VideosValidator.validateAvailableResolutions(fieldValidator, availableResolutions);
        fieldValidator = VideosValidator.validateCommonInputFields(fieldValidator, title, author, availableResolutions);
        const errorsMessages = fieldValidator.finishAndReturnErrorMessages;

        return errorsMessages;
    }
    static validateUpdateVideo(dto: UpdateVideoDto) {
        const { title, author, availableResolutions, minAgeRestriction, publicationDate, canBeDownloaded } = dto;

        let fieldValidator = new FieldValidator();
        fieldValidator = VideosValidator.validateAvailableResolutions(fieldValidator, availableResolutions);
        fieldValidator = VideosValidator.validateCommonInputFields(fieldValidator, title, author, availableResolutions);
        const errorsMessages = fieldValidator
            .addFieldValidation({
                fieldName: 'minAgeRestriction',
                errorMessage: `MinAgeRestriction should be between 0 and 18`,
                errorCondition:
                    !minAgeRestriction ||
                    minAgeRestriction < 1 ||
                    minAgeRestriction > 18 ||
                    typeof minAgeRestriction !== 'number',
            })
            .addFieldValidation({
                fieldName: 'publicationDate',
                errorMessage: `PublicationDate should be string`,
                errorCondition: !publicationDate || typeof publicationDate !== 'string',
            })
            .addFieldValidation({
                fieldName: 'canBeDownloaded',
                errorMessage: `CanBeDownloaded should be boolean`,
                errorCondition: typeof canBeDownloaded !== 'boolean',
            }).finishAndReturnErrorMessages;

        return errorsMessages;
    }

    static validateAvailableResolutions(
        fieldValidator: FieldValidator,
        availableResolutions: EAvailableResolution[] | undefined,
    ) {
        availableResolutions?.map((value) => {
            fieldValidator.addFieldValidation({
                fieldName: 'availableResolutions',
                errorMessage: 'Resolution is not correct',
                errorCondition: !AVAILABLE_RESOLUTIONS.includes(value),
            });
        });
        return fieldValidator;
    }

    static validateCommonInputFields(
        fieldValidator: FieldValidator,
        title: CreateVideoDto['title'],
        author: CreateVideoDto['author'],
        availableResolutions: CreateVideoDto['availableResolutions'],
    ) {
        fieldValidator
            .addFieldValidation({
                fieldName: 'title',
                errorMessage: `Title is incorrect`,
                errorCondition: !title || title.length > 40 || title.trim().length === 0 || typeof title !== 'string',
            })
            .addFieldValidation({
                fieldName: 'author',
                errorMessage: `Author is incorrect`,
                errorCondition:
                    !author || author.length > 20 || author.trim().length === 0 || typeof author !== 'string',
            })
            .addFieldValidation({
                fieldName: 'availableResolutions',
                errorMessage: `AvailableResolutions is not provided`,
                errorCondition:
                    !availableResolutions ||
                    availableResolutions.length > AVAILABLE_RESOLUTIONS.length ||
                    availableResolutions.length === 0,
            });
        return fieldValidator;
    }
}
