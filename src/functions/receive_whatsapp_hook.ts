import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { CrendentialVaul } from "../configuration/CrendentialVaul";
import { DiscoverIntent } from "../services/discover/DiscoverIntent";
import { authMiddleware } from "../middleware/auth-middleware";
import { MessageWhatsappTextReceive } from "../model/whatsapp/MessageWhatsappTextReceive";
import { AvailableIntentsWhatsapp } from "../services/discover/availableIntents/AvailableIntentsWhatsapp";
import { InfoBipClient } from "../configuration/InfobipClient";
import { mongo } from "../configuration/MongoClient";

async function receive_whatsapp_hook(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {

    try {

        /*const isAuth = await authMiddleware(request);
        if(!isAuth){
            return {
                status: 401,
                body: "No autorizado"
            }
        }*/
        const data = await request.json();
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

        const resultPromise = await discoverIntent.process()


        const res = resultPromise
        
        return {
            status: 200,
            jsonBody: res
        };
    } catch (e) {
        context.error(e);
        return {
            status: 500,
            jsonBody: {
                status: 500,
                body: "Ocurrió un error"
            }

        };
    }


};

// Middleware que envuelve la lógica de la función principal


// Configuración de la ruta en app.http
app.http('receive_whatsapp_hook', {
    methods: ['POST'],
    authLevel: 'anonymous',  // Asegúrate de que este nivel de autorización sea correcto
    handler: receive_whatsapp_hook, 
    
     // Usa el middleware en lugar del handler directo
})