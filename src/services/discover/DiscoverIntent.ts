import { MessageReceive } from "../../model/MessageReceive";

import { Intent } from "./actions/Intent";
import { AvailableIntents } from "./availableIntents/AvailableIntents";


export class DiscoverIntent{

    availableIntents: {
        keys: string[],
        intent: Intent
    }[] = [];
    
    message: MessageReceive;
    constructor(text: MessageReceive, availableIntents: AvailableIntents){
        this.message = text;
        this.availableIntents = availableIntents.getAvailableIntents();
        
    }


    process(){

        const text = this.message.results[0].message.text;
        const words = text.split(" ");
        let intent = this.availableIntents.find(intent => intent.keys.includes(
            words.find(word => intent.keys.includes(word))
        ));
        if(intent){
            return intent.intent.process(this.message);
        }
        return null;
    }


}