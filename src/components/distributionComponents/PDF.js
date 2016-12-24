import React from 'react';
import {BlockMath} from 'react-katex';
import {Card} from 'semantic-ui-react';

const PDF = ({formula}) => (
    <Card.Content>
        <BlockMath>{formula}</BlockMath>
    </Card.Content>
);

export default PDF