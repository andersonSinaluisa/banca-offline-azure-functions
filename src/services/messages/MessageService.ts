import { MessageSend } from "../../model/MessageSend";

export interface MessageService {

    receiveMessage(message: MessageSend): void;
    sendMessage(message: MessageSend): Promise<any>;
}
