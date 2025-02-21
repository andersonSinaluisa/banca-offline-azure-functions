import { AccountBankService } from "../../../bank/AccountBankService";
import { MessageService } from "../../../messages/MessageService";
import { Intent } from "../Intent";

export class CheckBalance extends Intent {

    messageService: MessageService;
    checkbalance: AccountBankService;
    constructor(messageService: MessageService) {
        const run = async (parameters: any) => {

            return await this.run(parameters)

        };
        super("checkBalance", run);
        this.messageService = messageService;
        this.checkbalance = new AccountBankService();
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

        if (!from || !to) {
            return;
        }
        this.messageService.saveReceivedMessage(parameters);

        const balance = await this.checkbalance.checkBalance(from);
        const res = await this.messageService.sendMessage({
            content:{
                text: `Tu saldo es de $${balance}`
            },
            from: to,
            to: from,
            type: "text"
        });
        this.messageService.saveSentMessage(res);
        return res;
    }
}