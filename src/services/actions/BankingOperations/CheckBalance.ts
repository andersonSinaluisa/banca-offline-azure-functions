import { Action } from "../../../model/Action";
import { AccountBankService } from "../../bank/AccountBankService";
import { MessageService } from "../../messages/MessageService";


export class CheckBalanceAction extends Action {

    checkbalance: AccountBankService;
    constructor() {
        super("checkBalance", async (parameters: any) => {

            return await this.run(parameters);

        });
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

        const balance = await this.checkbalance.checkBalance(from);
        
        return balance;
    }
}
