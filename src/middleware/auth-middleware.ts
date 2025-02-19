import { HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { CrendentialVaul } from "../configuration/CrendentialVaul";

async function isValidAuth(authHeader: string) {
    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');
    
    const vault = new CrendentialVaul();
    const userhook = await vault.userhook;
    const passwordhook = await vault.passwordhook;
    console.log(userhook
        , passwordhook);
        console.log(username, password);
    return username === userhook && password === passwordhook;
}
/**
 * Middleware para autenticación
 */
export async function authMiddleware(
    req: HttpRequest,
    context: InvocationContext,
    next: () => Promise<HttpResponseInit>
) {
    const authHeader = req.headers.get('authorization');
    if (!authHeader) {
        context.error('Unauthorized');
        return { status: 401, body: 'Unauthorized' };
    }


    try{
        const _isValidAuth = await isValidAuth(authHeader);
        if (!authHeader || !_isValidAuth) {
            context.error('Unauthorized');
            return { status: 401, body: 'Unauthorized' };
        }
    }catch(e){
        console.log(e);
        context.error('Unauthorized');
        return { status: 401, body: 'Unauthorized' };
    }
    


    await next(); // Llamar a la función si la autenticación es válida
}