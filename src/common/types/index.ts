import { STATUS_CODES } from '../constants';

export type Nullable<Type> = Type | null;

export type ServiceMethodError = {
    message: string;
    code: typeof STATUS_CODES[keyof typeof STATUS_CODES];
};

export type ServiceMethodResult<Response> = {
    response?: Response;
    error?: ServiceMethodError;
};
