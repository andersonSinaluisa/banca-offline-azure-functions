

export class Intent {

    knowledge: string;
    action: (parameters: any) => any;
    
    constructor(knowledge: string, action
        : (parameters: any) => any){
        this.knowledge = knowledge;
        this.action = action;
    }

    
    process(
        parameters: any
    ){
        return this.action(parameters);
    }
    

}