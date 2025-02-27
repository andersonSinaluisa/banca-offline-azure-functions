import { Intent } from "../../model/Intent";
import { MakeTransferIdentifier } from "../../model/wordsIdentifiers/MakeTransferIdentifier";
import { MakeTransferAction } from "../actions/BankingOperations/MakeTransfer";
import { AccountBankService } from "../bank/AccountBankService";
import { MessageService } from "../messages/MessageService";

export class MakeTransfer extends Intent {

    bankCoreService: AccountBankService;
    messageService: MessageService;

    constructor(bankCoreService: AccountBankService, messageService: MessageService) {


        const action = new MakeTransferAction(bankCoreService);

        super("makeTransfer", action, MakeTransferIdentifier);
        this.bankCoreService = bankCoreService;
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

        const { from, to, amount } = results[0];

        if (!from || !to || !amount) {
            return;
        }

        const res = await this.process({ from, to, amount });
        this.messageService.sendMessage({
            content: {
                text: res
            },
            from: to,
            to: from,
            type: "text"
        });

    }
}