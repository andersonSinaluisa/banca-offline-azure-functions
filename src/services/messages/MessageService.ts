import { MessageSend } from "../../model/MessageSend";

export interface MessageService {

    receiveMessage(message: MessageSend): Promise<any>;
    sendMessage(message: MessageSend): Promise<any>;

    saveReceivedMessage(message: any): Promise<any>;
    saveSentMessage(message: any): Promise<any>;

}
