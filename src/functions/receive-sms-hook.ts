import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";

export async function receive_sms_hook(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http function processed request for url "${request.url}"`);

    const authHeader = request.headers.get('authorization');
    if (!authHeader || !isValidAuth(authHeader)) {
        return { status: 401, body: 'Unauthorized' };
    }

    const name = request.query.get('name') || await request.text() || 'world';

    return { body: `Hello, ${name}!` };
};

function isValidAuth(authHeader: string): boolean {
    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');

    // Replace with your actual username and password
    const validUsername = 'yourUsername';
    const validPassword = 'yourPassword';

    return username === validUsername && password === validPassword;
}

app.http('receive-sms-hook', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: receive_sms_hook
});
