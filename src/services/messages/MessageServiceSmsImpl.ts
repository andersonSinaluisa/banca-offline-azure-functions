import { Infobip } from "@infobip-api/sdk";
import { MessageService } from "./MessageService";
import { MessageSend } from "../../model/MessageSend";


export class MessageServiceSmsImpl implements MessageService{
    constructor(private infobip: Infobip) {

    }
    saveReceivedMessage(message: any): Promise<any> {
        throw new Error("Method not implemented.");
    }
    saveSentMessage(message: any): Promise<any> {
        throw new Error("Method not implemented.");
    }
    async receiveMessage(message: MessageSend) {
        throw new Error("Method not implemented.");
    }
    sendMessage(message: MessageSend){
       return this.infobip.channels.sms.sendMessage(message)
    }

}