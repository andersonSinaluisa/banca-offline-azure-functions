import { MongoClient as MongoDBClient } from 'mongodb';

export class DbClient {
    private client: MongoDBClient;
    private uri: string;
    private dbName: string;

    constructor(uri: string, dbName: string) {
        this.uri = uri;
        this.dbName = dbName;
        this.client = new MongoDBClient(this.uri, { });
    }

    async connect() {
        try {
            await this.client.connect();
            console.log('Connected to MongoDB');
        } catch (error) {
            console.error('Error connecting to MongoDB:', error);
        }
    }

    get db() {
        return this.client.db(this.dbName);
    }

    async close() {
        try {
            await this.client.close();
            console.log('Disconnected from MongoDB');
        } catch (error) {
            console.error('Error disconnecting from MongoDB:', error);
        }
    }
}

//obtener variables del local.settings.json
const uri = process.env.CosmosDBConnectionString;
const dbName = process.env.CosmosDBName;

export const mongo = new DbClient(uri, dbName);


