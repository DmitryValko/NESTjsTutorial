export interface IToken {
    readonly token: string;
}

export interface JwtPayload {
    _id: string;
    email: string;
    name: string;
    iat: string;
    exp: string; //время окончания действия текущего токена.
}