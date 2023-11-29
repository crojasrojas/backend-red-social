import { UserModel } from "@user/models/user.schema";
import { IUserDocument } from "@user/interfaces/userDocument.interface";

class UserService {
    
    public async addUserData(data: IUserDocument): Promise<void> {
        await UserModel.create(data);
    }

}

export const userService:UserService = new UserService();

