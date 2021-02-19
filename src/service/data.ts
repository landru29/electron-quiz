import { Observable } from 'rxjs';
import { Question } from '../model/question';
import customData from '../data.json';

export default class Data {

    constructor(public url: string) {}

    public getData(): Observable<Question[]> {
        return new Observable<Question[]>(subscriber => {
            subscriber.next(Question.fromJSONArray(customData));
            subscriber.complete();
        });
    }
}