export type AuthLoginView = {
    accessToken: string;
};

export type AuthRefreshTokenView = {
    accessToken: string;
};

export type GetMeView = {
    email: string;
    login: string;
    userId: string;
};
