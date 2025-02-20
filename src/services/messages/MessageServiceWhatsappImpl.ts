import { MessageSend } from "../../model/MessageSend";
import { MessageService } from "./MessageService";
import { Infobip, AuthType, } from "@infobip-api/sdk";

export class MessageServiceWhatsappImpl implements MessageService{
    channel: any
    constructor(private infobip: Infobip) {
        this.channel = infobip.channels.whatsapp
    }
    receiveMessage(message: MessageSend): void {
        throw new Error("Method not implemented.");
    }
    async sendMessage(message: MessageSend){
        
        const res = await this.channel.send(message)
        const data = res.data
        console.log(data)
        return data
        
    }

}