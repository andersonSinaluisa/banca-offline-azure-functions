import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { InfoBipClient } from "../configuration/InfobipClient";
import { mongo } from "../configuration/MongoClient";
import { FlowMenuService } from "../services/flow/FlowMenuService";
import { SessionServiceImpl } from "../services/messages/SessionServiceImpl";
import { SessionRepositoryMongoImpl } from "../repository/SessionRepositoryMongoImpl";
import { MessageServiceWhatsappImpl } from "../services/messages/MessageServiceWhatsappImpl";
import { SendMessageMongoImpl } from "../repository/SendMessageMongoImpl";
import { ReceiveMessageMongoImpl } from "../repository/ReceiveMessageMongoImpl";

async function receive_whatsapp_hook(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    try {
        const infobip = await getInfoBipClient();
        const sessionService = getSessionService();
        const messageService = getMessageService(infobip);

        const data = await request.json() as any;
        console.log(JSON.stringify(data));
        const validationError = validateRequestData(data);
        if (validationError) {
            return { status: 400, body: validationError };
        }

        const { from, to, text } = data.results[0];
        const currentSession = await sessionService.getOrCreateSession(from);
        const saludarFlow = new FlowMenuService(currentSession, messageService);
        const res = await saludarFlow.run(data);

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
}

async function getInfoBipClient() {
    const infoBip = new InfoBipClient();
    return await infoBip.getClient();
}

function getSessionService() {
    return new SessionServiceImpl(new SessionRepositoryMongoImpl(mongo));
}

function getMessageService(infobip: any) {
    return new MessageServiceWhatsappImpl(infobip, new SendMessageMongoImpl(mongo), new ReceiveMessageMongoImpl(mongo));
}

function validateRequestData(data: any): string | null {
    if (!data || typeof data !== "object") {
        return "El cuerpo debe ser un JSON válido";
    }
    const { results } = data;
    if (!results || results.length === 0) {
        return "El cuerpo debe contener un array de resultados";
    }
    return null;
}

app.http('receive_whatsapp_hook', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: receive_whatsapp_hook,
});