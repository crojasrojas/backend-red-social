import { IError } from "./interfaces/error.interface";

export abstract class CustomError extends Error{

    abstract statusCode: number;
    abstract status: string;

    constructor(message: string) {
        super(message);
    }

    serializeError(): IError {
        return {
            message: this.message,
            status: this.status,
            statusCode: this.statusCode
        }
    }

}