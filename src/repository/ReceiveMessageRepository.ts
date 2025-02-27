import { MessageReceive } from "../model/MessageReceive";


export interface ReceiveMessageRepository {
    save(message: MessageReceive): void;
    lastMessageByFrom(from: string): Promise<MessageReceive>;
    messagesByDate(from: string, to: string, date: Date): Promise<MessageReceive[]>;
    messagesByDateRange(from: string, to: string, startDate: Date, endDate: Date): Promise<MessageReceive[]>;

}