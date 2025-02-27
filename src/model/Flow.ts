import { MessageReceive } from "./MessageReceive";
import { Session } from "./Session";
import { Step } from "./Step";


export class Flow {
  steps: Step[];
  session: Session;


  constructor(steps: Step[], session: Session) {
    this.session = session;
    this.steps = steps;
  }

  async run(parameters: MessageReceive) {
    console.log("Flow run");
    let intent = null;
    //PRIMER MENSAJE
    console.log(this.session.messageCount);
    if (this.session.messageCount == 0) {
      return this.steps[0].run(parameters);
    }
    const length = parameters.results.length;
    const { type } = parameters.results[length - 1].message;
    const allIntents = this.steps.map(step => step.intents).flat();

    //Si el mensaje es de tipo texto
    if (type === "TEXT") {
      const text = parameters.results[0].message.text?.toLowerCase();
      const words = text.split(" ");
      console.log(words);
      intent = allIntents.find(
        intent => intent.keys.includes(
          words.find(word => intent.keys.includes(word))
        )
      );
      console.log(intent);
    }

    //Si el mensaje es de tipo lista interactiva
    if (type === "INTERACTIVE_LIST_REPLY") {
      const { id, title } = parameters.results[0].message;

       intent = allIntents.find(
        intent => intent.knowledge == id
      );
    }

    if (!intent) {
      return;
    }

    return await intent.run(parameters);

  }
}

