import React from 'react';
import {InlineMath} from 'react-katex';
import {Card} from 'semantic-ui-react';

const Control = (variable) => (
    <div className="symbol-control">
        <InlineMath>{variable.tex}</InlineMath>
        <input type="range" min={variable.min}
               max={variable.max}
               value={variable.value}
               step="0.01"
               id={variable.name}
               onChange={variable.change}/>
        <label htmlFor={variable.name}>{variable.value.toFixed(2)}</label>
    </div>
);

const Controls = ({variables, values, changeHandler}) => (
    <Card.Content>
        {Object.keys(variables).map(v =>
            (<Control {...variables[v]}
                      value={parseFloat(values[v])}
                      change={changeHandler.bind(null, v)}
                      key={v}/>)
        )}
    </Card.Content>
);

export default Controls;