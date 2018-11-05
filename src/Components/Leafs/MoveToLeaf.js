import React from 'react';
import Aux from '../../hoc/Auxx';
import { Leaf } from 'eqtree';

const moveToLeaf = (props) => {
    return (
        <Aux>
            <Leaf {...props} className="disabled" />
            <button className="btn btn-sm btn-danger" onClick={props.onOK}>OK</button>
            <button className="btn btn-sm btn-danger" onClick={props.onCancel}>Cancel</button>
        </Aux>);
}
export default moveToLeaf;