import { Infobip } from "@infobip-api/sdk";
import { MessageReceive } from "../../../model/MessageReceive";
import { MessageServiceWhatsappImpl } from "../../messages/MessageServiceWhatsappImpl";
import { Intent } from "../actions/Intent";
import { SaludarIntent } from "../actions/SaludarIntent";
import { AvailableIntents } from "./AvailableIntents";
import { SaludarIdentifier } from "../wordsIdentifiers/SaludarIdentifier";
import { OpeningHoursIdentifier } from "../wordsIdentifiers/OpeningHours";
import { OpeningHours } from "../actions/CustomerAtent/OpeningHours";
import { MessageRepository } from "../../../repository/MessageRepository";
import { MessageRepositoryMongoImpl } from "../../../repository/MessageRepositoryMongoImpl";
import { mongo } from "../../../configuration/MongoClient";
import { CheckBalanceIdentifier } from "../wordsIdentifiers/CheckBalanceIdentifier";
import { CheckBalance } from "../actions/BankingOperations/CheckBalance";

export class AvailableIntentsWhatsapp implements AvailableIntents {

    availableIntents: {
        keys: string[],
        intent: Intent
    }[]=[]

    messageWhatsapp: MessageServiceWhatsappImpl;
    messageRepository: MessageRepository;
    message: MessageReceive;
    constructor(text: MessageReceive,infobip:Infobip) {
        this.message = text;
        this.messageRepository = new MessageRepositoryMongoImpl(mongo);
        this.messageWhatsapp = new MessageServiceWhatsappImpl(infobip,this.messageRepository);

        this.availableIntents.push({
            keys: SaludarIdentifier,
            intent: new SaludarIntent(this.messageWhatsapp)
        })
        this.availableIntents.push({
            keys: OpeningHoursIdentifier,
            intent: new OpeningHours(this.messageWhatsapp)
        })
        this.availableIntents.push({
            keys: CheckBalanceIdentifier,
            intent: new CheckBalance(this.messageWhatsapp)
        })
    }
    getAvailableIntents(): {
        keys: string[];
        intent: Intent;
    }[] {
        return this.availableIntents;
    }
}