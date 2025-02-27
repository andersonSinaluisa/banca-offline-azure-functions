import { MessageReceive } from "../../model/MessageReceive";

export interface FlowService{
    run(message: MessageReceive): any;
}