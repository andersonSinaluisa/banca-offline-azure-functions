import { MessageServiceWhatsappImpl } from "../../messages/MessageServiceWhatsappImpl";
import { Intent } from "../actions/Intent";
import { SaludarIntent } from "../actions/SaludarIntent";


export interface AvailableIntents {
    getAvailableIntents(): {
        keys: string[],
        intent: Intent
    }[]
}




