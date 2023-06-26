export type AuthLoginInputDto = {
    loginOrEmail: string;
    password: string;
};

export type AuthRegistrationInputDto = {
    login: string;
    password: string;
    email: string;
};

export type AuthRegistrationConfirmationInputDto = {
    code: string;
};

export type AuthRegistrationEmailResendingInputDto = {
    email: string;
};
