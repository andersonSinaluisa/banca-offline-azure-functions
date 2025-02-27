import { Intent } from "../../model/Intent";
import { SaludarIdentifier } from "../../model/wordsIdentifiers/SaludarIdentifier";
import { SaludarAction } from "../actions/SaludarAction";
import { MessageService } from "../messages/MessageService";


export class SaludarIntentService extends Intent {
    messageService: MessageService;

    constructor(messageService: MessageService) {

        const action = new SaludarAction();

        super("makeTransfer", action, SaludarIdentifier);
        this.messageService = messageService;
    }

    async run(parameters: any) {
        const responseAction = await this.action.process(parameters);
        const { results } = parameters;
        if (!results) {
            return;
        }
        if (results.length === 0) {
            return;
        }
        const { from, to } = results[0];
        console.log(JSON.stringify(responseAction));
        const res = this.messageService.sendMessage(responseAction);
        this.messageService.saveSentMessage(res);
    }
}