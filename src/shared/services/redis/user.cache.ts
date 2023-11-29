import Logger from "bunyan";
import { BaseCache } from "./base.cache"; 
import { logger } from "@configs/configLogs";
import { IUserDocument } from "@user/interfaces/userDocument.interface";
import { ServerError } from "@errors/serverError";
import { Generators } from "@generators/generators";

const log: Logger = logger.createLogger("userCahe"); 

export class UserCahe extends BaseCache {
    constructor(){
        super("userCache");
    }

    public async saveToUserCache(key: string, userUId: string, createdUser: IUserDocument): Promise<void> {
        const {
            _id,
            uId, 
            userName,
            email,
            avatarColor,
            postsCount,
            work,
            school,
            quote,
            location,
            blocked,
            blockedBy,
            followersCount,
            followingCount,
            notifications,
            social,
            bgImagenVersion,
            bgImageId,
            profilePicture,
            createdAt
         } = createdUser;

         const dataToSave = {
            _id: `${_id}`,
            uId: `${uId}`,
            userName: `${userName}`,
            email: `${email}`,
            avatarColor: `${avatarColor}`,
            createdAt: `${createdAt}`,
            postsCount: `${postsCount}`,
            blocked: JSON.stringify(blocked),
            blockedBy: JSON.stringify(blockedBy),
            profilePicture: `${profilePicture}`,
            followersCount: `${followersCount}`,
            followingCount: `${followingCount}`,
            notifications: JSON.stringify(notifications),
            social: JSON.stringify(social),
            work: `${work}`,
            location: `${location}`,
            school: `${school}`,
            quote: `${quote}`,
            bgImageId: `${bgImageId}`,
            bgImagenVersion: `${bgImagenVersion}`
         };
         
         try{
            if(!this.client.isOpen){
                await this.client.connect();
            }

            await this.client.ZADD('user',{ score: parseInt(userUId, 10), value: `${key}` });

            for(const[itemKey, itemValue] of Object.entries(dataToSave) ) {
                await this.client.HSET(`users: ${key}`, `${itemKey}`, `${itemValue}`);
            }

         }
         catch(error){
            log.error(error);
            throw new ServerError("Server Redis error. Try again.");
         }
    }

    public async getUserFromCache(userId: string): Promise<IUserDocument | null> {
        try{
            if(!this.client.isOpen){
                await this.client.connect();
            }

            const response: IUserDocument = (await this.client.HGETALL(`users:${userId}`)) as unknown as IUserDocument;
            response.createdAt = new Date(Generators.parseJson(`${response.createdAt}`));
            response.postsCount = Generators.parseJson(`${response.postsCount}`);
            response.blocked = Generators.parseJson(`${response.blocked}`);
            response.blockedBy = Generators.parseJson(`${response.blockedBy}`);
            response.notifications = Generators.parseJson(`${response.notifications}`);
            response.social = Generators.parseJson(`${response.social}`);
            response.followersCount = Generators.parseJson(`${response.followersCount}`);
            response.followingCount = Generators.parseJson(`${response.followingCount}`);

            return response;
        }
        catch(error){
            log.error(error);
            throw new ServerError("Server Redis error. Try again");
        }
    }
}