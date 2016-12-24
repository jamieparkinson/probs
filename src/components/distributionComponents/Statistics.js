import React from 'react';
import {InlineMath} from 'react-katex';
import {Card} from 'semantic-ui-react';

const Statistics = ({values}) => {
    var valNames = Object.keys(values);
    var header = valNames.map(v => (<th key={v}>{v}</th>));
    var texvals = valNames.map(v => (<td key={v}><InlineMath>{values[v]}</InlineMath></td>));
    return (
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

export default Statistics;