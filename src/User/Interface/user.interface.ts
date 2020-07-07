import { Document } from 'mongoose';

export interface IUser extends Document {
    readonly email: string;
    readonly password: string;
    readonly name: string;
    readonly _id: string;
    readonly tokens: string[];
    readonly addRefreshToken?: (reftoken: string) => Promise<void>;
    readonly removeToken?: (reftoken: string) => Promise<void>;
    readonly checkToken?: (reftoken: string) => boolean;
    readonly removeAllToken?: () => Promise<void>
}

