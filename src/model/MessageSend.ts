

export interface MessageSend{
    from: string;
    to: string;
    content: {
        text: string;
    };
}