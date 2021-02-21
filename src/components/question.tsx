import * as React from 'react'
import { Question, Response } from '../model/question';
import ProposalComponent from './proposal';
import './question.scss';


interface QuestionProps {
    quest: Question;
    onResponse: (questionIndex: number, responseIndex: number, right: boolean)=> void
    correction: boolean;
    index: number;
};


interface QuestionState {
    responseIndex: number|null;
    imageZoomed: boolean;
};

export default class QuestionComponent extends React.Component<QuestionProps, QuestionState> {
    constructor(props: QuestionProps) {
        super(props);
        this.state={
            responseIndex: null,
            imageZoomed: false,
        };
    }

    componentDidMount(): void {
        this.setState({responseIndex: null});
    }

    onChange(index: number) {
        this.setState({responseIndex: index});
        this.props.onResponse(this.props.index, index, this.props.quest.responses[index].correct);
    }

    onImageZoom(): void {
        this.setState({imageZoomed: !this.state.imageZoomed});
    }

    render() :any {
        var responseClass = "";
        if (this.props.correction) {
            responseClass = this.state.responseIndex != null && this.props.quest.responses[this.state.responseIndex].correct? "right": "wrong";
        }

        const explaination: string[] = `${this.props.quest.explaination}`.split("\n").filter((line: string) => line !== "");

        return <div className="question">
            <div className="header">{this.props.quest.id}</div>
            <div className="content">
                <div className={`${responseClass} label`}>
                    {this.props.quest.question.split("\n").map((line: string) => <p>{line}</p> )}
                </div>
                {this.props.quest.attachedB64 && <img className={`question-pic ${this.state.imageZoomed ? 'zoomed' : ''}`}
                                                      alt="missing"
                                                      onClick={this.onImageZoom.bind(this)}
                                                      src={`${this.props.quest.attachedB64}`}></img>}
                <div className="responses">
                    {this.props.quest.responses.map((resp: Response, id: number) => {
                        return <ProposalComponent key={id} 
                                                  resp={resp}
                                                  index={id}
                                                  correction={this.props.correction}
                                                  selected={id===this.state.responseIndex}
                                                  questionId={this.props.quest.id}
                                                  onClick={this.onChange.bind(this)}
                                                  ></ProposalComponent>
                    })}
                </div>
                {this.props.correction && <div className="explaination">
                    <div>
                    {explaination.map((line: string, index: number) => <p key={index}>{line}</p>)}
                    </div>
                    {this.props.quest.explainationAttachedB64 && <img alt="missing" src={this.props.quest.explainationAttachedB64}></img>}
                </div>}
            </div>
        </div>;
    }
}