import * as React from 'react'
import { Response } from '../model/question';
import {v4 as uuidv4} from 'uuid';
import './proposal.scss';

interface ProposalProps {
    resp: Response;
    index: number;
    questionId: number;
    onClick: (index: number)=>void;
    selected: boolean;
    correction: boolean;
};


interface ProposalState {
    radioChecked: boolean;
};

export default class ProposalComponent extends React.Component<ProposalProps, ProposalState> {
    public uuid = uuidv4();

    constructor(props: ProposalProps) {
        super(props);

        this.state={
            radioChecked: false,
        };
    }

    onClick(): void {
        if (this.props.correction) {
            return;
        }
        this.props.onClick(this.props.index);
    }

    render() :any {
        var className="";
        if (this.props.correction) {
            className=`${className} correction`;
            if (this.props.selected && this.props.resp.correct) {
                className=`${className} correct`;
            }
            if (this.props.selected && !this.props.resp.correct) {
                className=`${className} selected-wrong`;
            }
            if (!this.props.selected && this.props.resp.correct) {
                className=`${className} missing`;
            }
    }
        return <div className="proposal">
            <span className={`correction ${className}`}></span>
            <input type="radio" 
                   readOnly={this.props.correction}
                   value={this.props.index}
                   onChange={this.onClick.bind(this)}
                   name={`question_${this.props.questionId}`} 
                   checked={this.props.selected}
                   id={this.uuid}/>
            <label htmlFor={this.uuid} 
                   onClick={this.onClick.bind(this)}
                   className={className}>{this.props.resp.label}</label>
        </div>;
    }
}