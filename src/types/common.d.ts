import { STATUS_CODES } from '../common/constants';

declare global {
    type Nullable<Type> = Type | null;
    type Undefinedtable<Type> = Type | undefined;
    namespace ServiceMethod {
        type Error = {
            message: string;
            code: typeof STATUS_CODES[keyof typeof STATUS_CODES];
        };

        type Result<Response> = {
            response?: Response;
            error?: ServiceMethodError;
        };
    }
}
