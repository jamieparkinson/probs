import React from 'react';
import {Card, Label, Icon} from 'stardust';
import math from 'mathjs';
import TeX from '../react-components/js/tex.jsx';

import {scaleLinear} from 'd3-scale';
import {line} from 'd3-shape';

const AlsoKnownAs = ({names}) => (
  <div className="description also-known">
    { names.length > 0 ? "Also known as: " + names.join(', ') : "No other common names"}
  </div>
);

const PDF = ({formula}) => (
  <Card.Content>
    <TeX displayMode={true}>{formula}</TeX>
  </Card.Content>
);

const Control = (variable) => (
  <div className="symbol-control">
    <TeX>{variable.tex}</TeX>
    <input type="range" min={variable.min}
                        max={variable.max}
                        value={variable.value}
                        step="0.01"
                        id={variable.name}
                        onChange={variable.change}/>
    <label htmlFor={variable.name}>{variable.value.toFixed(2)}</label>
  </div>
)

const Controls = ({variables, values, changeHandler}) => {
  var controlItems = Object.keys(variables).map(v =>
    (<Control {...variables[v]}
              value={parseFloat(values[v])}
              change={changeHandler.bind(null, v)}
              key={v} />)
  );
  return(
    <Card.Content>
      {controlItems}
    </Card.Content>
  )
};

const Statistics = ({values}) => {
  var valNames = Object.keys(values);
  var header = valNames.map(v => (<th key={v}>{v}</th>));
  var texvals = valNames.map(v => (<td key={v}><TeX>{values[v]}</TeX></td>));

  return(
    <Card.Content>
      <table className="ui small very compact celled table">
        <thead>
          <tr>{header}</tr>
        </thead>
        <tbody>
          <tr>{texvals}</tr>
        </tbody>
      </table>
    </Card.Content>
  );
};

class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.width = 290;
    this.height = 180;

    const xScale = scaleLinear().domain(props.limits.x).range([-5, this.width+5]);
    const yScale = scaleLinear().domain(props.limits.y).range([this.height - 30, 1]);
    this.line = line().x(r => xScale(r[0]))
                      .y(r => yScale(r[1]));
  }

  lineArr() {
    var arr = []
    const xMax = this.props.limits.x[1];
    const vars = this.props.variables;
    for (var i = 0; i < 150; i++) {
      var xv = xMax*i/150;
      arr[i] = [
        xv,
        this.props.func.eval({ ...vars, x: xv })
      ];
    }
    return arr;
  }

  render() {
    return (
      <div className="image svg-wrapper">
        <svg width={this.width} height={this.height}>
          <path stroke="black" strokeWidth="4"
                fill="none" d={this.line(this.lineArr())} />
        </svg>
      </div>
    );
  }
}

class DistributionCard extends React.Component {
  constructor(props) {
    super(props);
    // Get initial values
    var stateToBe = {}
    var varNames = Object.keys(props.variables);
    varNames.map(v => {
      stateToBe = {...stateToBe, [v]: props.variables[v].init};
    });

    this.state = stateToBe;
    this.updateVariable = this.updateVariable.bind(this);

    this.pdfFunc = math.compile(props.pdf);
  }

  updateVariable(name, event) {
    this.setState({ [name]: event.target.value });
  }

  render() {
    return(
      <Card>
        <Label corner="right" href={this.props.wiki} target="_blank">
          <Icon name="wikipedia" style={{ cursor: 'pointer' }}/>
        </Label>

        <Card.Content>
          <div className="header" style={{ fontFamily: 'Montserrat' }}>
            {this.props.title}
          </div>
          <AlsoKnownAs names={this.props.altNames} />
        </Card.Content>

        <Graph variables={this.state}
               func={this.pdfFunc}
               limits={this.props.graphLimits} />

        <PDF formula={this.props.texPdf} />

        <Controls variables={this.props.variables}
                  values={this.state}
                  changeHandler={this.updateVariable}/>

        <Statistics values={this.props.statistics} />
      </Card>
    );
  }
};

export default DistributionCard;