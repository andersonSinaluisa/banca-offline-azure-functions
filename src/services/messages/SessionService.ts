import { Session } from "../../model/Session";


export interface SessionService {

    save(session: Session): void;
    findByPhoneNumber(phoneNumber: string): Promise<Session | null>;
    update(session: Session): void;
    lastMessageSentAt(phoneNumber: string): Promise<Date>;
    lastMessageReceivedAt(phoneNumber: string): Promise<Date>;

    
    getOrCreateSession(phoneNumber: string): Promise<Session>;

}