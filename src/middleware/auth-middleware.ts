import { HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { CrendentialVaul } from "../configuration/CrendentialVaul";

async function isValidAuth(authHeader: string) {
    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');
    
    const vault = new CrendentialVaul();
    const userhook = await vault.userhook;
    const passwordhook = await vault.passwordhook;
    console.log(
        `username: ${username}, password: ${password}, userhook: ${userhook}, passwordhook: ${passwordhook}`
    );
    return username === userhook && password === passwordhook;
}
/**
 * Middleware para autenticación
 */
export async function authMiddleware(
    req: HttpRequest,
) {
    const authHeader = req.headers.get('authorization');
    if (!authHeader) {
        throw new Error('Unauthorized');
    }


    try{
        const _isValidAuth = await isValidAuth(authHeader);
        if (!authHeader || !_isValidAuth) {
           throw new Error('Unauthorized');
        }
    }catch(e){
        throw new Error('Unauthorized');
    }
    


    return true;
}