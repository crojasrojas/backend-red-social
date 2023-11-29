import { model, Model, Schema } from 'mongoose';
import { IAuthDocument } from '../interfaces/authDocument.interface';
import { compare } from 'bcryptjs';

const authSchema: Schema = new Schema(
  {
    username: { type: String },
    uId: { type: String },
    email: { type: String },
    password: { type: String },
    avatarColor: { type: String },
    createdAt: { type: Date, default: Date.now() },
    modifiedAt: { type: Date },
    passwordResetToken: { type: String, default: '' },
    passwordResetExpires: { type: Number }
  },
  {
    toJSON: {
        transform(_doc, ret) {
            delete ret.password;
            return ret;
        }
    }
  }

);

authSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
    const hashedPassword: string = (this as IAuthDocument).password!;
    return compare(password, hashedPassword);
};

const AuthModel: Model<IAuthDocument> = model<IAuthDocument>('Auth', authSchema, 'Auth');
export { AuthModel };