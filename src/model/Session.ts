

export interface Session{
    phoneNumber: string;
    applicationId: string;
    integrationType: string;
    receivedAt: Date;
    messageAction: string;
    lastMessageReceivedAt: Date;
    lastMessageSentAt: Date;
    expiresAt: Date;
    messageCount: number;
    id?: string;
}