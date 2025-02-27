import { Flow } from "../../model/Flow";
import { MessageReceive } from "../../model/MessageReceive";
import { Session } from "../../model/Session";
import { Step } from "../../model/Step";
import { CheckAccountNumberIntent } from "../intents/CheckAccountNumber";
import { SaludarIntentService } from "../intents/SaludaIntentService";
import { MessageService } from "../messages/MessageService";
import { FlowService } from "./FlowService";

export class FlowCheckBalanceService implements FlowService {
    flow: Flow;

    constructor(session: Session, messageservice: MessageService) {
        const steps = this.createSteps(messageservice);
        this.flow = new Flow(steps, session);
    }

    private createSteps(messageservice: MessageService): Step[] {
        const steps = [];
        const step0 = new Step(0, [
            new SaludarIntentService(messageservice)
        ], null, null, false, 'SaludarIntentService');
        const step1 = new Step(1, [
            new CheckAccountNumberIntent(messageservice)
        ], null, null, false, 'CheckAccountNumberAction');

        steps.push(step0);
        steps.push(step1);
        return steps;
    }

    run(message: MessageReceive) {
        return this.flow.run(message);
    }
}