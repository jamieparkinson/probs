import React from 'react'
import {scaleLinear} from 'd3-scale';
import {line} from 'd3-shape';

class ContinuousGraph extends React.Component {
    constructor(props) {
        super(props);
        this.width = 290;
        this.height = 180;

        const xScale = scaleLinear().domain(props.limits.x).range([-2, this.width + 2]);
        const yScale = scaleLinear().domain(props.limits.y).range([this.height - 30, 1]);
        this.line = line().x(r => xScale(r[0]))
            .y(r => yScale(r[1]));
    }

    lineArr() {
        var arr = [];
        const [xMin, xMax] = this.props.limits.x;
        const vars = this.props.variables;
        for (var i = 0; i < 150; i++) {
            var xv = (xMin + xMax * i) / 150;
            arr[i] = [
                xv,
                this.props.func.eval({...vars, x: xv})
            ];
        }
        return arr;
    }

    render() {
        return (
            <div className="image svg-wrapper">
                <svg width={this.width} height={this.height}>
                    <path stroke="black"
                          strokeWidth="4"
                          fill="none"
                          d={this.line(this.lineArr())}/>
                </svg>
            </div>
        );
    }
}

export default ContinuousGraph;