import { MessageReceive } from "../../model/MessageReceive";
import { MessageService } from "../messages/MessageService";
import { FlowService } from "./FlowService";
import { SaludarIntentService } from "../intents/SaludaIntentService";
import { Step } from "../../model/Step";
import { Flow } from "../../model/Flow";
import { Session } from "../../model/Session";


export class FlowMenuService implements FlowService{
    flow: Flow;
    constructor(session: Session, messageservice: MessageService){
        const steps = this.createSteps(messageservice);
        this.flow = new Flow(steps, session);
    }
    run(message: MessageReceive) {
        return this.flow.run(message);
    }

    createSteps(messageservice: MessageService) {
        const steps = [];
        const step0 = new Step(0, [
            new SaludarIntentService(messageservice)
        ], null, null, true, 'SaludarIntentService');
        steps.push(step0);
        return steps;
    }
}