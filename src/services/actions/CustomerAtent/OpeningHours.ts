import { Action } from "../../../model/Action";


export class OpeningHoursAction extends Action{

    constructor() {
        super("OpeningHoursAction", async (parameters: any) => {
            return await this.run(parameters);
        });
    }

    async run(parameters: any) {
        return [
            "Lunes a Viernes de 8:00 a 20:00",
            "Sábados de 9:00 a 14:00",
            "Domingos de 10:00 a 14:00",
            "Festivos de 9:00 a 14:00"
        ];
    }
}
