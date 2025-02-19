import { MessageSend } from "../../model/MessageSend";
import { MessageService } from "./MessageService";
import { Infobip, AuthType } from "@infobip-api/sdk";


export class MessageServiceWhatsappImpl implements MessageService{
    constructor(private infobip: Infobip) {

    }
    receiveMessage(message: MessageSend): void {
        throw new Error("Method not implemented.");
    }
    sendMessage(message: MessageSend){
       return this.infobip.channels.whatsapp.sendMessage(message)
    }

}