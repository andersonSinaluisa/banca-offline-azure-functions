import { Intent } from "../../model/Intent";
import { CheckAccountNumberAction } from "../actions/BankingOperations/CheckAccountNumber";
import { MessageService } from "../messages/MessageService";


export class CheckAccountNumberIntent extends Intent {
    messageService: MessageService;
    constructor(messageService: MessageService) {
        const action = new CheckAccountNumberAction();
        super("AccountTransaction", action, []);
        this.messageService = messageService;
    }

    

}