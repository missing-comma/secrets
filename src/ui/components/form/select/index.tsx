import React from 'react';
import { withPropsParser } from './components/props-parser.js';

export const Select = withPropsParser((props) => {


    return <>{String(props.selected)}</>;
})