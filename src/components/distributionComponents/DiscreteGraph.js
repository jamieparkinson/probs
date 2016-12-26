import React from 'react'
import {scaleLinear} from 'd3-scale';
import {line} from 'd3-shape';

class DiscreteGraph extends React.Component {
    constructor(props) {
        super(props);
        this.width = 290;
        this.height = 180;

        const xScale = scaleLinear().domain(props.limits.x).range([0, this.width]);
        const yScale = scaleLinear().domain(props.limits.y).range([this.height - 30, 1]);
        this.line = line().x(r => xScale(r[0]))
            .y(r => yScale(r[1]));

        const [xMin, xMax] = props.limits.x;
        this.xVals = Array(xMax - xMin).fill().map((_, i) => xMin + i);
    }

    _y(x) {
        return this.props.func.eval({
            ...this.props.variables,
            x
        });
    }

    lineUp(x) {
        const y = this._y(x);
        return this.line([[x, 0], [x, y]]);
    }

    render() {
        return (
            <div className="image svg-wrapper">
                <svg width={this.width} height={this.height}>
                    {this.xVals.map(x => (
                        <path stroke="black"
                              strokeWidth="4"
                              strokeLinecap="round"
                              fill="none"
                              d={this.lineUp(x)}
                              key={x}/>
                    ))}
                </svg>
            </div>
        );
    }
}

export default DiscreteGraph;