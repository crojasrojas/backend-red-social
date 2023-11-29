import { Job, DoneCallback } from "bull";
import Logger from "bunyan";
import { userService } from "@services/db/user.service";
import { logger } from "@configs/configLogs";

const log: Logger = logger.createLogger("userWorker");

class UserWorker {

    async addUserToDB(job: Job, donce: DoneCallback):Promise<void> {
        try{
            const { value } = job.data;
            await userService.addUserData(value);
            job.progress(100);
            donce(null, job.data);
        }
        catch(error){
            log.error(error);
            donce(error as Error);
        }
    }
}

export const userWorker: UserWorker = new UserWorker();