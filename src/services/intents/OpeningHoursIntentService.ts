import { Intent } from "../../model/Intent";
import { OpeningHoursIdentifier } from "../../model/wordsIdentifiers/OpeningHours";
import { OpeningHoursAction } from "../actions/CustomerAtent/OpeningHours";
import { MessageService } from "../messages/MessageService";

export class OpeningHoursIntentService extends Intent{

    messageService: MessageService;

    constructor(messageService: MessageService) {



        const action = new OpeningHoursAction();

        super("makeTransfer", action, OpeningHoursIdentifier);
        this.messageService = messageService;
    }

    async run(parameters: any) {
        const { results } = parameters;
        if (!results) {
            return;
        }
        if (results.length === 0) {
            return;
        }

        const openingHours = this.process(parameters);
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