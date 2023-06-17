export type UsersLoginDto = {
    loginOrEmail: string;
    password: string;
};

export type UsersCheckCredentialsDto = {
    loginOrEmail: string;
    password: string;
};

export type UsersQueryRepositoryGetUsersDTO = {
    searchLoginTerm?: Nullable<string>;
    searchEmailTerm?: Nullable<string>;
    pageNumber: number;
    pageSize: number;
    sortBy: string;
    sortDirection: string;
};

export type UsersCreateUserServiceDTO = {
    login: string;
    password: string;
    email: string;
};

export type UsersCreateUserRepositoryDTO = {
    id: string;
    login: string;
    email: string;
    createdAt: string;
    passwordHash: string;
    passwordSalt: string;
};
