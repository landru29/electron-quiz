import * as React from 'react'
import { Question } from '../model/question';
import Data from '../service/data';
import QuestionComponent from './question';
import {v4 as uuidv4} from 'uuid';
import './quiz.scss';


interface QuizProps {
    count: number;
};


interface QuizState {
    questions: Question[];
    correction: boolean;
    score: boolean[];
};

export default class QuizComponent extends React.Component<QuizProps, QuizState> {
    public uuid: string = "";

    constructor(props: QuizProps) {
        super(props);

        this.state={
            questions: [],
            correction: false,
            score: [],
        };

        Data.dataReady().subscribe({
            next: () => {
                this.getQuestions();
            }
        });
    }

    getQuestions() {
        this.uuid = uuidv4();
        const api = new Data();
        api.getData().subscribe({
            next: (questions: Question[]) => {
                const ret: Question[] = [];
                const score: boolean[] = [];

                if (this.props.count>0) {
                    for (var i=0; i<this.props.count; i++) {
                        if (questions.length) {
                            const index = Math.floor(Math.random() * questions.length);
                            ret.push(questions[index]);
                            score.push(false);
                            questions = questions.filter((a: Question, i: number) => i!==index);
                        }
                    }
                    
                    this.setState({
                        questions: ret,
                        correction: false,
                        score,
                    });
                    return
                }

                this.setState({
                    questions: questions,
                    correction: false,
                    score: Array.from({length: questions.length}, () => false),
                });
            }
        });
    }

    componentDidMount(): void {
        this.getQuestions();
    }

    onResponse(questionIndex: number, responseIndex: number, right: boolean): void {
        console.log(`Question ${questionIndex} => ${responseIndex}`);
        const score = this.state.score.map((val: boolean, id: number) => id===questionIndex ? right: val);
        this.setState({score});
        console.log(score);
    }

    onSubmit(): void {
        if (!this.state.correction) {
            this.setState({correction: !this.state.correction});
        } else {
            this.getQuestions();
        }

        window.scrollTo(0, 0);
    }

    render() :any {
        const questions = this.state.questions ? this.state.questions : [];

        return <div className="quiz">
            {this.state.correction && <div className="score">
                <span>Votre score: </span>
                <span>{this.state.score.filter((elt) => elt).length}</span>
                /
                <span>{questions.length}</span>
            </div>}
            {questions.map((quest: Question, index: number) => {
                return <QuestionComponent key={`${this.uuid}-${quest.id}`} 
                                          quest={quest}
                                          index={index}
                                          correction={this.state.correction}
                                          onResponse={this.onResponse.bind(this)}
                                          ></QuestionComponent>
            })}
            <div className="actions">
                <button type="button" onClick={this.onSubmit.bind(this)}>{this.state.correction ? 'Play again' :'Correction'}</button>
            </div>
        </div>;
    }
}