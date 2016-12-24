import React from 'react';

const AlsoKnownAs = ({names}) => (
    <div className="description also-known">
        { names.length > 0 ? "Also known as: " + names.join(', ') : "No other common names"}
    </div>
);

export default AlsoKnownAs;