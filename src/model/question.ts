
export class Response {
    public label: string = "";
    public correct: boolean = false;

    public static fromJSON(str: string): Response {
        const rep = new Response();
        try {
            const obj = JSON.parse(str);
            rep.label = obj.label;
            rep.correct = !!obj.correct;
        } finally {
            return rep;
        }
    }
}

export class Question {
    public id: number = 0;
    public question: string = '';
    public explaination: string = '';
    public attachedB64: string = '';
    public explainationAttachedB64: string = '';
    public responses: Response[] = [];
    public userResponseId: number | null = null;

    public static fromJSONArray(obj: any): Question[] {
        if (Array.isArray(obj)) {
            return obj.map((elt: any) => {
                const quest = new Question();
                quest.id = elt.id;
                quest.question = elt.question;
                quest.explaination = elt.explaination;
                quest.attachedB64 = elt.attachedB64;
                quest.explainationAttachedB64 = elt.explainationAttachedB64;
                quest.responses = (elt.responses as Array<any>).map((d: any) => Response.fromJSON(JSON.stringify(d)));
                return quest;
            });
        }

        return [];
    }


};