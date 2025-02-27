import { MessageSend } from "../model/MessageSend";



export interface SendMessageRepository{
    save(message: MessageSend): void;
    lastMessageByTo(to: string): Promise<MessageSend>;
    lastMessageByFrom(from: string): Promise<MessageSend>;
    messagesByDate(from: string, to: string, date: Date): Promise<MessageSend[]>;
    messagesByDateRange(from: string, to: string, startDate: Date, endDate: Date): Promise<MessageSend[]>;
    
}