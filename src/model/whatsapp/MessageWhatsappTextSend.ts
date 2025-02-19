import { MessageSend } from "../MessageSend";


export interface MessageWhatsappTextSend extends MessageSend{

    messageId: string;
   
    callbackData: string;
    notifyUrl: string;
    urlOptions: {
        shortenUrl: boolean;
        trackClicks: boolean;
        trackingUrl: string;
        removeProtocol: boolean;
        customDomain: string;
    };

}