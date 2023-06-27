export enum AuthType {
    Basic = 'basic',
    Bearer = 'bearer',
    OAuth = 'oauth',
}

export const BASIC_AUTH_CREDENTIALS = {
    username: 'admin',
    password: 'qwerty',
};

export const REFRESH_TOKEN_COOKIE_NAME = 'refreshToken';
