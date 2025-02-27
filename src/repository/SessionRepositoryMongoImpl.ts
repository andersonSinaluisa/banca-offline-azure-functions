import { DbClient } from "../configuration/MongoClient";
import { Session } from "../model/Session";
import { SessionRepository } from "./SessionRepository";



export class SessionRepositoryMongoImpl implements SessionRepository {
    mongo: DbClient;
    collection_name: string = 'session';
    constructor(mongo: DbClient) {
        this.mongo = mongo;

    }
     save(session: Session): void {
        const db = this.mongo.db;
        const collection = db.collection(this.collection_name);
        collection.insertOne({...session})
        
    }


    async findByPhoneNumber(phoneNumber: string): Promise<Session | null> {
        const db = this.mongo.db;
        const collection = db.collection(this.collection_name);
        const res = await collection
        .find({phoneNumber: phoneNumber})
        .sort({lastMessageReceivedAt: -1})
        .limit(1)
        .toArray();
        console.log(res);
        return res.length > 0 ? res[0] as unknown as Session : null;
    }
    update(session: Session): void {
        const db = this.mongo.db;
        const collection = db.collection(this.collection_name);
        collection
        .updateOne({phoneNumber: session.phoneNumber}, {$set: session})
        
    }
    lastMessageSentAt(phoneNumber: string): Promise<Date> {
        const db = this.mongo.db;
        const collection = db.collection(this.collection_name);
        const res = collection
        .find({phoneNumber: phoneNumber})
        .sort({lastMessageSentAt: -1})
        .limit(1)
        .toArray();
        return res[0] ? res[0].lastMessageSentAt : null;
    }
    lastMessageReceivedAt(phoneNumber: string): Promise<Date> {
        const db = this.mongo.db;
        const collection = db.collection(this.collection_name);
        const res = collection
        .find({phoneNumber:
            phoneNumber})
        .sort({lastMessageReceivedAt: -1})
        .limit(1)
        .toArray();
        return res[0] ? res[0].lastMessageReceivedAt : null;
        
    }

}