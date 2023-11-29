import { Request, Response } from "express";
import { signupSchema } from "@auth/schemas/signup";
import { joiValidation } from "@decorators/joiValidation.decorators";
import { BadRequestError } from "@errors/badRequestError";
import { authService } from "@services/db/auth.service";

export class SignUpController {

    @joiValidation(signupSchema)
    public async register(req: Request, _res: Response): Promise<void> {
        const { username, email, password, avatarColor, avatarImage } = req.body;
        const checkIfUserExist = await authService.getUserByUserNameOrEmail(username, email);

        if(checkIfUserExist){
            throw new BadRequestError("Invalid credentials for this user.");
        }
    }

}