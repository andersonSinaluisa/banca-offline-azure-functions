import { Action } from "../../../model/Action";
import { AccountBankService } from "../../bank/AccountBankService";



export class MakeTransferAction extends Action{

    constructor(private bankCoreService: AccountBankService) {
        super("makeTransfer", async (parameters: any) => {
            return await this.run(parameters);
        });
    }

    async run(parameters: any){
        const { results } = parameters;

        if (!results) {
            return;
        }

        if (results.length === 0) {
            return;
        }

        const { from, to, amount } = results[0];

        const res = await this.bankCoreService.transfer(from, to, amount);
        return res;
    }
}
