import { MessageSend } from "../../model/MessageSend";
import { ReceiveMessageRepository } from "../../repository/ReceiveMessageRepository";
import { SendMessageRepository } from "../../repository/SendMessageRepository";
import { MessageService } from "./MessageService";
import { Infobip, AuthType, } from "@infobip-api/sdk";

export class MessageServiceWhatsappImpl implements MessageService {
    constructor(private infobip: Infobip,
        private messageSentRepository: SendMessageRepository,
        private messageReceivedRepository: ReceiveMessageRepository
    ) {

    }
    async saveReceivedMessage(message: any): Promise<any> {
      return  await this.messageReceivedRepository.save(message)

    }
   async saveSentMessage(message: any): Promise<any> {
       return await this.messageSentRepository.save(message)
    }
    async receiveMessage(message: MessageSend) {
        throw new Error("Method not implemented.");
    }
    async sendMessage(message: MessageSend) {
        console.log("Sending message")
        const res = await this.infobip.channels.whatsapp.send(message)
        return res.data
    }

}