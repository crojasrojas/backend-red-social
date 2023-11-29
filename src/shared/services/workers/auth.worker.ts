import { Job, DoneCallback } from "bull";
import Logger from "bunyan";
import { authService } from "@services/db/auth.service";
import { logger } from "@configs/configLogs";

const log: Logger = logger.createLogger("authWorker");

class AuthWorker {

    async addAuthUserToDB(job: Job, done: DoneCallback ): Promise<void> {
        try{
            const { value } = job.data;
            await authService.createAuthUser(value);
            job.progress(100);
            done(null, job.data);
        }
        catch(error){
            log.error(error);
            done(error as Error);
        }
    }
    
}

export const authWorker: AuthWorker = new AuthWorker();