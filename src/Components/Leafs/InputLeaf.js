import React from 'react';
import Aux from '../../hoc/Auxx';

let onEnterEscFnc = props => event => {
    if (event.key === 'Enter') {
        if (!props.okDisabled())
            props.onOK();
    }
    else if (event.key === 'Escape')
        props.onCancel();
};

const inputLeaf = (props) => {
    return (
        <Aux>
            <input autoFocus value={props.tempText} onChange={props.onChange} onKeyDown={onEnterEscFnc(props)} />
            <button className="btn btn-sm btn-danger" onClick={props.onOK} disabled={props.okDisabled()}>OK</button>
            <button className="btn btn-sm btn-danger" onClick={props.onCancel}>Cancel</button>
        </Aux>);
}
export default inputLeaf;