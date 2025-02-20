import { MessageService } from "../../messages/MessageService";
import { Intent } from "./Intent";



export class SaludarIntent extends Intent{

    messageService: MessageService;

    constructor(messageService:MessageService){
        const run = async(parameters:any) => {
            
           return await this.run(parameters) 
        
        };
        super("saludar",run);
        this.messageService = messageService;

    }


    async run(parameters:any){
        const { results } = parameters;
        if (!results) {
            return;
        }
        if (results.length === 0) {
            return;
        }
        const { from, to } = results[0];
        const res = await this.messageService.sendMessage({
            from: from,
            to: to,
            content: {
                text: "Hola, ¿en qué puedo ayudarte?"
            },
            type: "text"
        });
        
        return res;
    }
}