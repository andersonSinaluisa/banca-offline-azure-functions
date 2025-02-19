import { MessageSend } from "../model/MessageSend";

export interface MessageRepository {
    receiveMessage(message: MessageSend): void;
    sendMessage(message: MessageSend): void;
}