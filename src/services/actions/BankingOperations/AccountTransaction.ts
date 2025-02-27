import { Action } from "../../../model/Action";



export class AccountTransactionAction extends Action {

    constructor() {
        super("AccountTransaction", async (parameters: any) => {
            return await this.run(parameters);
        });
    }

    async run(parameters: any) {
        
    }
}

