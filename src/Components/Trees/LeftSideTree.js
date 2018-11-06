import React, { Component } from 'react';
import Tree from 'eqtree';
import commonRedux from '../../Libraries/commonRedux';

import {StringSorter} from '../../Libraries/common';

class LeftSideTree extends Component {
    getControl = (control) => {
        control.selectNode(control.getData()).openNode(control.getData());
        this.props.changeState(state => commonRedux.immute(state, { sideTreeControl: control }))();
    }
    stringSorter = node => node.sortBy(f => f.item.text, (a,b) => !StringSorter(a,b));
    render() {
        return (
            <Tree data={this.props.data} idFnc={this.props.idFnc}
                sortFnc={this.stringSorter}
                getControls={this.getControl} />
        );
    }
}

export default commonRedux.connect.all(LeftSideTree);
