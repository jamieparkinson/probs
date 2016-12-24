import React from 'react';
import {Card, Label, Icon} from 'semantic-ui-react';
import math from 'mathjs';
import {
    AlsoKnownAs,
    PDF,
    Controls,
    Statistics,
    Graph
} from './distributionComponents/';

class DistributionCard extends React.Component {
    constructor(props) {
        super(props);
        // Get initial values
        var stateToBe = {};
        var varNames = Object.keys(props.variables);
        varNames.forEach(v => {
            stateToBe = {
                ...stateToBe,
                [v]: props.variables[v].init
            };
        });

        this.state = stateToBe;
        this.updateVariable = this.updateVariable.bind(this);

        this.pdfFunc = math.compile(props.pdf);
    }

    updateVariable(name, event) {
        this.setState({[name]: event.target.value});
    }

    render() {
        return (
            <Card>
                <Label corner="right" href={this.props.wiki} target="_blank">
                    <Icon name="wikipedia" style={{cursor: 'pointer'}}/>
                </Label>

                <Card.Content>
                    <div className="header" style={{fontFamily: 'Montserrat'}}>
                        {this.props.title}
                    </div>
                    <AlsoKnownAs names={this.props.altNames}/>
                </Card.Content>

                <Graph variables={this.state}
                       func={this.pdfFunc}
                       limits={this.props.graphLimits}/>

                <PDF formula={this.props.texPdf}/>

                <Controls variables={this.props.variables}
                          values={this.state}
                          changeHandler={this.updateVariable}/>

                <Statistics values={this.props.statistics}/>
            </Card>
        );
    }
}

export default DistributionCard;