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


    async process(){

        const text = this.message.results[0].message.text;
        const words = text.split(" ");
        let intent = this.availableIntents.find(intent => intent.keys.includes(
            words.find(word => intent.keys.includes(word))
        ));
        if(intent){
            const res = await intent.intent.process(this.message);
            return res;
        }
        return null;
    }


}