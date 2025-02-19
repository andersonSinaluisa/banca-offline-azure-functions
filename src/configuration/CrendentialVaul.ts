import { SecretClient } from "@azure/keyvault-secrets"
import { DefaultAzureCredential } from "@azure/identity"

const credential = new DefaultAzureCredential();

const keyVaultName = "banca-offline-vault";
const url = "https://" + keyVaultName + ".vault.azure.net";



export const TYPES = {
    USER_HOOK: "userhook",
    PASSWORD_HOOK: "passwordhook",
    INFOBIP_API_KEY: "infobip-api-key",
    INFOBIP_BASE_URL: "infobip-base-url"

}

export class CrendentialVaul {
    client = new SecretClient(url, credential);


    async getSecret(secretName: string): Promise<string> {
        const secret = await this.client.getSecret(secretName);
        return secret.value;
    }
    constructor() {

    }

    get userhook() {
        return this.getSecret(TYPES.USER_HOOK);
    }

    get passwordhook() {
        return this.getSecret(TYPES.PASSWORD_HOOK);
    }

    get infobipApiKey() {
        return this.getSecret(TYPES.INFOBIP_API_KEY);
    }

    get infobipBaseUrl() {
        return this.getSecret(TYPES.INFOBIP_BASE_URL);
    }

}