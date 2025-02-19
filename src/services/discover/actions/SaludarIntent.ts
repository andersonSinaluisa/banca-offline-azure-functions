import { MessageService } from "../../messages/MessageService";
import { Intent } from "./Intent";



export class SaludarIntent extends Intent{

    messageService: MessageService;

    constructor(messageService:MessageService){
        const run = (parameters:any) => { this.run(parameters) };
        super("saludar",run);
        this.messageService = messageService;

    }


    run(parameters:any){
        console.log("SaludarIntent",parameters);
        const { results } = parameters;
        if (!results) {
            return;
        }
        if (results.length === 0) {
            return;
        }
        const { from, to } = results[0].message;
        this.messageService.sendMessage({
            from: from,
            to: to,
            content: {
                text: "Hola, ¿en qué puedo ayudarte?"
            }
        });
    }
}