import { DbClient } from "../configuration/MongoClient";
import { MessageSend } from "../model/MessageSend";
import { SendMessageRepository } from "./SendMessageRepository";

export class SendMessageMongoImpl implements SendMessageRepository {
    mongo: DbClient;
    collection_name: string = 'message_send';
    constructor(mongo: DbClient) {
        this.mongo = mongo;

    }
    save(message: MessageSend): void {
        const db = this.mongo.db;
        const collection = db.collection(this.collection_name);
        collection.insertOne({
            ...message,
            timestamp: new Date()
        });
    }
    async lastMessageByTo(to: string): Promise<MessageSend> {
        const db = this.mongo.db;
        const collection = db.collection(this.collection_name);
        const res = await collection.findOne({ to: to });
        return res.results;
    }
    async lastMessageByFrom(from: string): Promise<MessageSend> {
        const db = this.mongo.db;
        const collection = db.collection(this.collection_name);
        const res = await collection.findOne({ from: from });
        return res.results;
    }
    messagesByDate(from: string, to: string, date: Date): Promise<MessageSend[]> {
        const db = this.mongo.db;
        const collection = db.collection(this.collection_name);
        const filter = collection.find({ from: from, to: to, date: date });
        const res = filter.stream().toArray();
        return res;
    }
    messagesByDateRange(from: string, to: string, startDate: Date, endDate: Date): Promise<MessageSend[]> {
        const db = this.mongo.db;
        const collection = db.collection(this.collection_name);
        const filter = collection.find({ from: from, to: to, date: { $gte: startDate, $lte: endDate } });
        const res = filter.stream().toArray();
        return res;
    }

}