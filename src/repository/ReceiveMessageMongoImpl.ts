import { DbClient } from "../configuration/MongoClient";
import { MessageReceive } from "../model/MessageReceive";
import { ReceiveMessageRepository } from "./ReceiveMessageRepository";


export class ReceiveMessageMongoImpl implements ReceiveMessageRepository {
    mongo: DbClient;
    collection_name: string = 'message_received';
    constructor(mongo: DbClient) {
        this.mongo = mongo;

    }
    save(message: MessageReceive): void {
        const db = this.mongo.db;
        const collection = db.collection(this.collection_name);
        collection.insertOne({
            ...message,
            timestamp: new Date()
        });
    }
    async lastMessageByFrom(from: string): Promise<MessageReceive> {
        const db = this.mongo.db;
        const collection = db.collection(this.collection_name);
        const res = await collection.findOne({ from: from });
        return res.results;
    }
    async messagesByDate(from: string, to: string, date: Date): Promise<MessageReceive[]> {
        const db = this.mongo.db;
        const collection = db.collection(this.collection_name);
        const filter = await collection.find({ from: from, to: to, date: date });
        const res = filter.stream().toArray();
        return res;
    }
    messagesByDateRange(from: string, to: string, startDate: Date, endDate: Date): Promise<MessageReceive[]> {
        const db = this.mongo.db;
        const collection = db.collection(this.collection_name);
        const filter = collection.find({ from: from, to: to, date: { $gte: startDate, $lte: endDate } });
        const res = filter.stream().toArray();
        return res;
    }

}