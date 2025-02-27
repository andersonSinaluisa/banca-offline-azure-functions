import { Session } from "../../model/Session";
import { SessionRepository } from "../../repository/SessionRepository";
import { SessionService } from "./SessionService";


export class SessionServiceImpl implements SessionService{

    constructor(private sessionRepository:SessionRepository){
        
    }
    async getOrCreateSession(phoneNumber: string): Promise<Session> {
        const session =await this.sessionRepository.findByPhoneNumber(phoneNumber);
        if (session) {
            return session;
        }
        const sessionNew = {
            applicationId: 'whatsapp',
            expiresAt: new Date(),
            integrationType: 'whatsapp',
            lastMessageReceivedAt: new Date(),
            lastMessageSentAt: new Date(),
            phoneNumber: phoneNumber,
            messageAction: 'SaludarIntent',
            messageCount: 0,
            receivedAt: new Date(),
        }as Session;

        this.sessionRepository.save(sessionNew);
        return sessionNew;
    }
    save(session: Session): void {
        throw new Error("Method not implemented.");
    }
    findByPhoneNumber(phoneNumber: string): Promise<Session | null> {
        throw new Error("Method not implemented.");
    }
    update(session: Session): void {
        throw new Error("Method not implemented.");
    }
    lastMessageSentAt(phoneNumber: string): Promise<Date> {
        throw new Error("Method not implemented.");
    }
    lastMessageReceivedAt(phoneNumber: string): Promise<Date> {
        throw new Error("Method not implemented.");
    }

}