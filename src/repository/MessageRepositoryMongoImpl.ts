import { DbClient } from "../configuration/MongoClient";
import { MessageSend } from "../model/MessageSend";
import { MessageRepository } from "./MessageRepository";


export class MessageRepositoryMongoImpl implements MessageRepository {
    mongo: DbClient;
    constructor(mongo: DbClient) {
        this.mongo = mongo;
        
    }

    receiveMessage(message: MessageSend): void {
       const db = this.mongo.db;
       const collection = db.collection('message_received');
         collection.insertOne(message);
    }
    sendMessage(message: MessageSend): void {
        const db = this.mongo.db;
        const collection = db.collection('message_sent');
        collection.insertOne(message);
    }


}