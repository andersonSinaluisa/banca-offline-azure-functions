import { MessageSend } from "../../model/MessageSend";
import { MessageRepository } from "../../repository/MessageRepository";
import { MessageService } from "./MessageService";
import { Infobip, AuthType, } from "@infobip-api/sdk";

export class MessageServiceWhatsappImpl implements MessageService {
    constructor(private infobip: Infobip,private messageRepository: MessageRepository) {

    }
    async saveReceivedMessage(message: any): Promise<any> {
        await this.messageRepository.receiveMessage(message)

    }
   async saveSentMessage(message: any): Promise<any> {
        await this.messageRepository.sendMessage(message)
    }
    async receiveMessage(message: MessageSend) {
        throw new Error("Method not implemented.");
    }
    async sendMessage(message: MessageSend) {
        const res = await this.infobip.channels.whatsapp.send(message)
        return res.data
    }

}