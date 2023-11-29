import { AuthModel } from "@auth/models/auth.schema";
import { IAuthDocument } from "@auth/interfaces/authDocument.interface";

class AuthService {
    
    public async createAuthUser(data: IAuthDocument): Promise<void> {
        await AuthModel.create(data);
    }

    public async getUserByUserNameOrEmail(username: string, email: string): Promise<IAuthDocument> {
        const query = {
            $or: [{ username: username }, { email: email }]
        };
        
        const user: IAuthDocument = (await AuthModel.findOne(query).exec()) as IAuthDocument;
        return user;
    }
}

export const authService: AuthService = new AuthService();