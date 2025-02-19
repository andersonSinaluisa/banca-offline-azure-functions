import { AuthType, Infobip } from "@infobip-api/sdk";
import { CrendentialVaul } from "./CrendentialVaul";

export class InfoBipClient {
    private infobip: Infobip;
    private vault: CrendentialVaul;
    constructor(){
        this.vault = new CrendentialVaul();
    }

    async getClient() {
        if (this.infobip) {
            return this.infobip;
        }

        let apiKey = await this.vault.infobipBaseUrl;
        let baseUrl = await this.vault.infobipApiKey;

        this.infobip = new Infobip({
            baseUrl: baseUrl,
            apiKey: apiKey,
            authType: AuthType.ApiKey,
        });
        return this.infobip;
    }
   

}

let infobip = new Infobip({
    baseUrl: "YOUR_BASE_URL",
    apiKey: "YOUR_API_KEY",
    authType: AuthType.ApiKey,
});