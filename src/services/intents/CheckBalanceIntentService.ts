import { Intent } from "../../model/Intent";
import { CheckBalanceIdentifier } from "../../model/wordsIdentifiers/CheckBalanceIdentifier";
import { CheckBalanceAction } from "../actions/BankingOperations/CheckBalance";
import { MessageService } from "../messages/MessageService";


export class CheckBalanceIntentService extends Intent {
    messageService: MessageService;
    constructor(messageService: MessageService) {
        const action = new CheckBalanceAction();
        super("AccountTransaction", action, CheckBalanceIdentifier);
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

        const { from, to } = results[0];

        const balance = await this.process(parameters);

        const res = await this.messageService.sendMessage({
            content: {
                text: `Tu saldo es de $${balance}`
            },
            from: to,
            to: from,
            type: "text"
        });
        this.messageService.saveSentMessage(res);
    }
}