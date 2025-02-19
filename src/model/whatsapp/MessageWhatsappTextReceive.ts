import { MessageReceive } from "../MessageReceive"

export interface MessageWhatsappTextReceive extends MessageReceive{
    results: [
        {
            from: string,
            to: string,
            integrationType: string,
            receivedAt: string,
            messageId: string,
            pairedMessageId: string,
            callbackData: string,
            message: {
                type: string,
                text: string
            },
            contact: {
                name: string
            },
            price: {
                pricePerMessage: number,
                currency: string
            }
        }
    ],
    messageCount: number,
    pendingMessageCount: number
}