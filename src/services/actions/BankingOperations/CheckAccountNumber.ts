import { Action } from "../../../model/Action";

export class CheckAccountNumberAction extends Action{
    constructor() {
        super("CheckAccountNumberAction", async (parameters: any) => {
            return await this.run(parameters);
        });
    }

    async run(parameters: any) {

    }
}