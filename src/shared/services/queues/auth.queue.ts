import { BaseQueue } from "./base.queue";
import { config } from "@configs/configEnvs";
import { IAuthJob } from "@auth/interfaces/authJob.interface";
import { authWorker } from "@services/workers/auth.worker";

class AuthQueue extends BaseQueue{
    constructor(){
        super("auth");
        this.processJob("addAuthUserToDB", config.NUMBER_CONCURRENCY_AUTH_QUEUE, authWorker.addAuthUserToDB);
    }

    public addAuthUserJob(name: string, data: IAuthJob): void{
        this.addJob(name, data);
    }
}

export const authQueue: AuthQueue = new AuthQueue();