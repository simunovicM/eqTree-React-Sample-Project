import React from 'react';
import Aux from '../../hoc/Auxx';

var menuItems = ['Item1', 'Item2'];
const layout = (props) => (
    <Aux>
        <div className="row">
            <div className="col-12 px-4 py-2 bg-dark text-right">
                {menuItems.map(f => <button key={f} className="btn mx-1 text-dark bg-light">{f}</button>)}
            </div>
        </div>
        {props.children}
    </Aux>
);

export default layout;