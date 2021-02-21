import { Observable, Subscriber } from 'rxjs';
import { Question } from '../model/question';
import customData from '../data.json';

export default class Data {
    static localData: Question[] | null = null;
    static subscriber: Subscriber<boolean>[] = [];

    public static dataReady(): Observable<boolean> {
        return new Observable<boolean>(subscriber => {
            Data.subscriber.push(subscriber);
        });
    }

    public getData(): Observable<Question[]> {
        return new Observable<Question[]>(subscriber => {
            if (Data.localData === null) {
                subscriber.next(Question.fromJSONArray(customData));
            } else {
                subscriber.next(Data.localData);
            }
            subscriber.complete();
        });
    }

    public static listenOpenFile() {
        const electron = window.require("electron")
        electron.ipcRenderer.on('open-file', (event: any, ...args: any[]) => {
            console.log("yolo", args);
            const fs = window.require('fs');
            try {
                const sourceData = fs.readFileSync(args[0]);
                const obj = JSON.parse(sourceData);
                Data.localData = Question.fromJSONArray(obj);
                Data.subscriber.forEach((s: Subscriber<boolean>) => s.next(true))
            } catch (e) {
                console.log("impossible to open file", e)
            }
        });
    }
}