import { Action } from "./Action";

export class Intent implements IntentInterface {

    knowledge: string;
    action: Action;
    keys: string[] = [];

    constructor(knowledge: string, action: Action, keys: string[]) {
        this.knowledge = knowledge;
        this.action =  action;
        this.keys = keys;
    }


    async process(
        parameters: any
    ) {
        const res = await this.action.action(parameters);
        return res;
    }

    async run(
        parameters: any
    ) {
        const responseAction = await this.process(parameters);
        return responseAction;
    }


}

interface IntentInterface {
    knowledge: string;
    action: Action;
    keys: string[];
    process(parameters: any): any;
    run(parameters: any): any;
}
