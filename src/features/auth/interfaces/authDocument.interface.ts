import { Document } from "mongoose";
import { ObjectId } from "mongodb";

export interface IAuthDocument extends Document {
    _id: string | ObjectId;
    uId: string;
    usernames: string;
    email: string;
    password?: string;
    avatarColor: string;
    createdAt: Date;
    modifiedAt?: Date;
    passwordResetToken?: string;
    passwordResetExpires?: number;
    comparePassword(password: string): Promise<boolean>;
};