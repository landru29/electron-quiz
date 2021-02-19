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
    responseIndex: number|null
};

export default class QuestionComponent extends React.Component<QuestionProps, QuestionState> {
    constructor(props: QuestionProps) {
        super(props);
        this.state={
            responseIndex: null
        };
    }

    componentDidMount(): void {
        this.setState({responseIndex: null});
    }

    onChange(index: number) {
        this.setState({responseIndex: index});
        this.props.onResponse(this.props.index, index, this.props.quest.responses[index].correct);
    }

    render() :any {
        var responseClass = "";
        if (this.props.correction) {
            responseClass = this.state.responseIndex != null && this.props.quest.responses[this.state.responseIndex].correct? "right": "wrong";
        }
        return <div className="question">
            <div className="header">{this.props.quest.id}</div>
            <div className="content">
                <div>
                    <span className={`${responseClass} label`}>{this.props.quest.question}</span>
                </div>
                {this.props.quest.attachedB64 && <img alt="missing" src={`data:image/png;base64,${this.props.quest.attachedB64}`}></img>}
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
            </div>
        </div>;
    }
}