

export class Action {

    knowledge: string;
    action: (parameters: any) => any;

    constructor(knowledge: string, action: (parameters: any) => any) {
        this.knowledge = knowledge;
        this.action = action;
    }

    async process(parameters: any) {
        const res = await this.action(parameters);
        return res;
    }
}