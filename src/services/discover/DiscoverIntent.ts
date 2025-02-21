import { MessageReceive } from "../../model/MessageReceive";

import { Intent } from "./actions/Intent";
import { AvailableIntents } from "./availableIntents/AvailableIntents";


export class DiscoverIntent {

    availableIntents: {
        keys: string[],
        intent: Intent
    }[] = [];

    message: MessageReceive;
    constructor(text: MessageReceive, availableIntents: AvailableIntents) {
        this.message = text;
        this.availableIntents = availableIntents.getAvailableIntents();

    }

    /*{
    "results": [
        {
            "entityId": "chatbot-bank",
            "applicationId": "default",
            "from": "593959998855",
            "to": "447860064956",
            "integrationType": "WHATSAPP",
            "receivedAt": "2025-02-21T20:44:23.000+0000",
            "messageId": "wamid.HBgMNTkzOTU5OTk4ODU1FQIAEhgUM0E1NjE1RTlEQUM5MkRDNDBDNDAA",
            "pairedMessageId": "64a47cb5-9310-4527-965d-c5abd64cd862",
            "callbackData": null,
            "message": {
                "id": "consultar_saldo",
                "title": "consultar saldo",
                "context": {
                    "from": "447860064956",
                    "id": "64a47cb5-9310-4527-965d-c5abd64cd862",
                    "groupId": null,
                    "referredProduct": null
                },
                "type": "INTERACTIVE_LIST_REPLY"
            },
            "contact": {
                "name": "Anderson"
            },
            "price": {
                "pricePerMessage": 0,
                "currency": "USD"
            }
        }
    ],
    "messageCount": 1,
    "pendingMessageCount": 5
}*/
    /*{
      "entityId": "chatbot-bank",
      "applicationId": "default",
      "from": "593959998855",
      "to": "447860064956",
      "integrationType": "WHATSAPP",
      "receivedAt": "2025-02-21T21:12:17.000+0000",
      "messageId": "wamid.HBgMNTkzOTU5OTk4ODU1FQIAEhgUM0FBQkQzMTlDQkQ2NzEwQ0I2NUQA",
      "pairedMessageId": null,
      "callbackData": null,
      "message": {
        "text": "Hola",
        "type": "TEXT"
      },
      "contact": {
        "name": "Anderson"
      },
      "price": {
        "pricePerMessage": 0,
        "currency": "USD"
      }
    }*/

    async process() {
        let intent = null;
        const length = this.message.results.length;
        const {type} = this.message.results[length - 1].message;
        console.log(type);
        if (type === "TEXT") {
            const text = this.message.results[0].message.text?.toLowerCase();
            const words = text.split(" ");
            console.log(words);
            intent = this.availableIntents.find(intent => intent.keys.includes(
                words.find(word => intent.keys.includes(word))
            ));
           
        }
        if (type === "INTERACTIVE_LIST_REPLY") {
            const { id, title } = this.message.results[0].message;
            console.log(this.availableIntents.find(intent => intent.keys.includes(title)).keys);
            intent = this.availableIntents.find(intent => intent.keys.includes(title)); 
        }
        if (intent) {
            const res = await intent.intent.process(this.message);
            return res;
        }
        return null;
    }


}