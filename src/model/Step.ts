import { Intent } from "./Intent";

export class Step {
    constructor(
        public number: number,
        public intents: Intent[],
        public nextStep: Step | null,
        public previousStep: Step | null,
        public isFinal: boolean,
        public key: string
    ) {}

    async run(parameters: any) {
        const intentResults = await Promise.all(this.intents.map(async (intent) => await intent.run(parameters)));
        return intentResults;
    }
}