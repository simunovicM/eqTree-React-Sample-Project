import React, { Component } from 'react';
import Tree from 'eqtree';
import commonRedux from '../../Libraries/commonRedux';

class LeftSideTree extends Component {
    getControl = (control) => {
        control.selectNode(control.getData()).openNode(control.getData());
        this.props.changeState(state => commonRedux.immute(state, { sideTreeControl: control }))();
    }
    render() {
        return (
            <Tree data={this.props.data} idFnc={this.props.idFnc}
                sortFnc={this.props.sortFnc}
                getControls={this.getControl} />
        );
    }
}

export default commonRedux.connect.all(LeftSideTree);
