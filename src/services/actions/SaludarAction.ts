import { title } from "process";
import { MessageService } from "../messages/MessageService";
import { Intent } from "../../model/Intent";
import { SaludarIdentifier } from "../../model/wordsIdentifiers/SaludarIdentifier";
import { Action } from "../../model/Action";



export class SaludarAction extends Action{

    messageService: MessageService;

    constructor(){
        const run = async(parameters:any) => {
            
           return await this.run(parameters) 
        
        };
        super("saludar",run);

    }


    async run(parameters:any){
        const { results } = parameters;
        if (!results) {
            return;
        }
        if (results.length === 0) {
            return;
        }
        const { from, to } = results[0];
        //enviar mensaje con opciones
        const res = {
            from: to,
            to: from,
            content: {
                body: {
                    text: "Hola, ¿Cómo puedo ayudarte?"
                },
                action: {
                   title: "escoge una opción",
                    sections: [
                        {
                            rows: [
                                {
                                    id:"horario_atencion",
                                    title: "horario de atención"
                                },
                                {
                                    id: "consultar_saldo",
                                    title: "consultar saldo"
                                },
                                {
                                    id: "realizar_pago",
                                    title: "realizar pago"
                                },
                                {
                                    id: "ver_ultimos_movimientos",
                                    title: "ver últimos movimientos"
                                },
                                {
                                    id: "ver_sucursales",
                                    title: "ver sucursales"
                                }
                            ]
                        }
                    ]
                }
            },
            type: "interactive-list"
        }

        return res;
    }
}