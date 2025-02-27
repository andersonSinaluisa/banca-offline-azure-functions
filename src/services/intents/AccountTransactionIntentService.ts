import { Intent } from "../../model/Intent";
import { AccountTransactionIdentifier } from "../../model/wordsIdentifiers/AccountTransaction";
import { AccountTransactionAction } from "../actions/BankingOperations/AccountTransaction";
import { MessageService } from "../messages/MessageService";

export class AccountTransaction extends Intent {

    messageService: MessageService;
    constructor(messageService: MessageService) {
        const action = new AccountTransactionAction();
        super("AccountTransaction", action, AccountTransactionIdentifier);
        this.messageService = messageService;
    }
    
    async run(parameters: any) {

        const responseAction = await this.process(parameters);
        const { results } = parameters;
        if (!results) {
            return;
        }
        if (results.length === 0) {
            return;
        }
        const { from, to } = results[0];
        const res = await this.messageService.sendMessage({
            content: {
                text: responseAction
            },
            from: to,
            to: from,
            type: "text"
        });
        this.messageService.saveSentMessage(res);
    }
    
}