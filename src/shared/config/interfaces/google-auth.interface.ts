export interface IGoogleSheets {
    access_token: string;
    refresh_token: string;
    scope: string;
    token_type: string;
}

export interface AuthCredentialsInterface {
    clientID: string;
    clientSecret: string;
}
