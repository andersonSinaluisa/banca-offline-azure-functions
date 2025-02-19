import { Infobip } from "@infobip-api/sdk";
import { MessageReceive } from "../../../model/MessageReceive";
import { MessageServiceWhatsappImpl } from "../../messages/MessageServiceWhatsappImpl";
import { Intent } from "../actions/Intent";
import { SaludarIntent } from "../actions/SaludarIntent";
import { AvailableIntents } from "./AvailableIntents";
import { SaludarIdentifier } from "../wordsIdentifiers/SaludarIdentifier";

export class AvailableIntentsWhatsapp implements AvailableIntents {

    availableIntents: {
        keys: string[],
        intent: Intent
    }[]=[]

    messageWhatsapp: MessageServiceWhatsappImpl;

    message: MessageReceive;
    constructor(text: MessageReceive,infobip:Infobip) {
        this.message = text;
        this.messageWhatsapp = new MessageServiceWhatsappImpl(infobip);

        this.availableIntents.push({
            keys: SaludarIdentifier,
            intent: new SaludarIntent(this.messageWhatsapp)
        })
    }
    getAvailableIntents(): {
        keys: string[];
        intent: Intent;
    }[] {
        return this.availableIntents;
    }
}