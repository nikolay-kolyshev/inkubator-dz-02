export const STATUS_CODES: Record<string, 200 | 201 | 204 | 400 | 401 | 404 | 500> = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
};
