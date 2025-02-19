import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { CrendentialVaul } from "../configuration/CrendentialVaul";
import { DiscoverIntent } from "../services/discover/DiscoverIntent";
import { authMiddleware } from "../middleware/auth-middleware";
import { MessageWhatsappTextReceive } from "../model/whatsapp/MessageWhatsappTextReceive";
import { AvailableIntentsWhatsapp } from "../services/discover/availableIntents/AvailableIntentsWhatsapp";
import { InfoBipClient } from "../configuration/InfobipClient";

async function receive_whatsapp_hook(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    
    try{
        const data = await request.json();
        console.log(data);
        if (!data || typeof data !== "object") {
            return { status: 400, body: "El cuerpo debe ser un JSON válido" };

        }

        const infoBip = new InfoBipClient();
        const infobip = await infoBip.getClient();

        const availableIntent = new AvailableIntentsWhatsapp(
            data as MessageWhatsappTextReceive,
            infobip
        )
        const discoverIntent = new DiscoverIntent(data as MessageWhatsappTextReceive, availableIntent);

        discoverIntent.process();


        return {
            status: 200,
            body: "Mensaje recibido"
        };
    }catch(e){
        console.log(e);
        return {
            status: 500,
            body: "Error interno"
        };
    }

    
};

export async function processRequest(req: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    console.log('Iniciando middleware');
    const res = await authMiddleware(req, context, async () => {
        console.log('Middleware pasado, ejecutando función principal');
        return await receive_whatsapp_hook(req, context);
    });
    return res;
}


app.http('receive_whatsapp_hook', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: processRequest
});
