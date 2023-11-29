import { BaseQueue } from "./base.queue";
import { config } from "@configs/configEnvs";
import { userWorker } from "@services/workers/user.worker";
import { IUserJob } from "@user/interfaces/userJob.interface";

class UserQueue extends BaseQueue {

    constructor(){
        super("user");
        this.processJob("addUserToDB", config.NUMBER_CONCURRENCY_USER_QUEUE, userWorker.addUserToDB);
    }

    public addUserJob(name: string, data: IUserJob): void{
        this.addUserJob(name, data);
    }
}

export const userQueue: UserQueue = new UserQueue();