import React from 'react';
import { Leaf } from 'eqtree';
import Aux from '../../hoc/Auxx';

const moveFromLeaf = (props) => (
    <Aux>
        <Leaf {...props} />
        <button className="btn btn-sm btn-danger" onClick={props.onCancel}>Cancel</button>
    </Aux>);

export default moveFromLeaf;