import { MessageService } from "../../../messages/MessageService";
import { Intent } from "../Intent";



export class OpeningHours extends Intent {
    messageService: MessageService;

    constructor(messageService: MessageService) {
        const run = async (parameters: any) => {

            return await this.run(parameters)

        };
        super("saludar", run);
        this.messageService = messageService;

    }


    getOpeningHours() {
        return  [
            "Lunes a Viernes de 8:00 a 20:00",
            "Sábados de 9:00 a 14:00",
            "Domingos de 10:00 a 14:00",
            "Festivos de 9:00 a 14:00"
        ]
    }


    async run (parameters:any){
        const { results } = parameters;
        if (!results) {
            return;
        }
        if (results.length === 0) {
            return;
        }

        const openingHours = this.getOpeningHours().join("\n");
        const responseText = `Nuestro horario de atención es:\n${openingHours}`;

        const { from, to } = results[0];
        const res = await this.messageService.sendMessage({
            from: to,
            to: from,
            content: {
                text: responseText
            },
            type: "text"
        });

        return res;
    }

}