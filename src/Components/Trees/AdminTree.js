import React, { Component } from 'react';

import node from 'eqnode';
import Tree from 'eqtree';
import InputLeaf from '../Leafs/InputLeaf';
import MoveFromLeaf from '../Leafs/MoveFromLeaf';
import MoveToLeaf from '../Leafs/MoveToLeaf';
import Aux from '../../hoc/Auxx';

import { StringSorter, IsStringNullOrEmpty } from '../../Libraries/common';
import commonRedux from '../../Libraries/commonRedux';

class AdminTree extends Component {
    disableButtons = () => this.setState({ buttons: this.state.buttons.map(f => ({ ...f, enabled: false })) });

    addClicked = () => {
        this.disableButtons();

        let orgData = this.state.treeControl.getData();
        let orgSelectedNode = this.state.treeControl.getSelectedNode();
        let cloneData = orgData.map(f => ({ ...f }));

        this.state.treeControl.updateData(cloneData);
        let selectedNode = this.state.treeControl.getSelectedNode();
        let addNode = new node({
            text: "",
            tempText: "",
            Parent: selectedNode.Parent,
            Parent_mdbID: selectedNode.Parent_mdbID,
            Leaf: InputLeaf,
            isTempNode: true
        });

        selectedNode.addChild(addNode);
        this.state.treeControl.openNode(selectedNode).redrawTree();

        addNode.item.onChange = event => { addNode.item.tempText = event.target.value; this.state.treeControl.redrawTree(); }
        addNode.item.okDisabled = _ => IsStringNullOrEmpty(addNode.item.tempText);

        addNode.item.onCancel = () => {
            this.onNodeClick = this.nodeClicked;
            this.onNodeClick(orgSelectedNode);
            this.state.treeControl.updateData(orgData).redrawTree();
        };
        addNode.item.onOK = event => {
            let newNode = new node({
                text: addNode.item.tempText,
                KeyID: orgData.map(f => f.KeyID).toArray().reduce((f, g) => Math.max(f, g), 0) + 1,
                KeyID_mdbID: orgSelectedNode.item.KeyID_mdbID,
                Parent: orgSelectedNode.item.KeyID,
                Parent_mdbID: orgSelectedNode.item.KeyID_mdbID
            });
            orgSelectedNode.addChild(newNode);
            this.onNodeClick = this.nodeClicked;
            this.onNodeClick(newNode);
            this.state.treeControl.updateData(orgData).clearAllStates().selectNode(newNode).openNode(newNode);

            this.props.changeState(state => commonRedux.immute(state, { data: orgData }))();
        };

        this.onNodeClick = node => {
            selectedNode.removeChild(addNode);
            this.state.treeControl.redrawTree();
            this.addClicked();
        }
    }

    renameClicked = () => {
        this.disableButtons();

        let startState = this.state.treeControl.getState();
        let orgData = this.state.treeControl.getData();
        let orgSelectedNode = this.state.treeControl.getSelectedNode();
        let cloneData = orgData.map(f => ({ ...f }));

        this.state.treeControl.updateData(cloneData).disableNode(cloneData);
        let selectedNode = this.state.treeControl.getSelectedNode();
        selectedNode.item.tempText = selectedNode.item.text;
        selectedNode.item.Leaf = InputLeaf;
        selectedNode.item.onChange = event => { selectedNode.item.tempText = event.target.value; this.state.treeControl.redrawTree(); }
        selectedNode.item.okDisabled = _ => IsStringNullOrEmpty(selectedNode.item.tempText) || selectedNode.item.text === selectedNode.item.tempText;

        selectedNode.item.onCancel = () => {
            this.onNodeClick = this.nodeClicked;
            this.onNodeClick(orgSelectedNode);
            this.state.treeControl.setState(startState).updateData(orgData)
                .redrawTree();
        };
        selectedNode.item.onOK = event => {
            orgSelectedNode.item.text = selectedNode.item.tempText;
            selectedNode.item.onCancel();
            this.props.changeState(state => commonRedux.immute(state, { data: orgData }))();
        }
        this.onNodeClick = node => {
            selectedNode.item.onCancel();
            this.renameClicked();
        }
        this.state.treeControl.redrawTree();
    }

    moveClicked = () => {
        this.disableButtons();

        let startState = this.state.treeControl.getState();
        let orgData = this.state.treeControl.getData();
        let orgNodeFrom = this.state.treeControl.getSelectedNode();
        let cloneData = orgData.map(f => ({ ...f }));

        this.state.treeControl.updateData(cloneData);

        let nodeFrom = this.state.treeControl.getSelectedNode();
        if (nodeFrom.getParent)
            this.state.treeControl.disableNode(nodeFrom.getParent());

        nodeFrom.item.class = 'strikethrough';
        nodeFrom.item.Leaf = MoveFromLeaf;
        this.state.treeControl.closeNode(nodeFrom).disableNode(nodeFrom);

        nodeFrom.item.onCancel = () => {
            this.onNodeClick = this.nodeClicked;
            this.onNodeClick(orgNodeFrom);
            this.state.treeControl.setState(startState)
                .updateData(orgData).redrawTree();
        };

        let nodeTo = new node({ ...orgNodeFrom.item, KeyID: 9999, Leaf: MoveToLeaf });
        this.onNodeClick = node => {
            nodeFrom.item.Leaf = null;
            if (nodeTo.getParent) {
                nodeTo.getParent().removeChild(nodeTo);
            }
            node.addChild(nodeTo);
            this.state.treeControl
                .selectNode(node).openNode(node).disableNode(nodeTo)
                .redrawTree();
        }
        nodeTo.item.onCancel = () => {
            this.onNodeClick = this.nodeClicked;
            this.onNodeClick(nodeTo.getParent());
            this.state.treeControl.updateData(orgData)
                .clearAllStates().selectNode(nodeTo.getParent()).openNode(nodeTo.getParent())
                .redrawTree();
        }
        nodeTo.item.onOK = () => {
            orgNodeFrom.getParent().removeChild(orgNodeFrom);
            orgData.find(f => this.idFnc(f) === this.idFnc(nodeTo.getParent()))
                .addChild(orgNodeFrom);
            nodeTo.item.onCancel();
            this.props.changeState(state => commonRedux.immute(state, { data: orgData }))();
        }
        this.state.treeControl.redrawTree();
    }

    deleteClicked = () => {
        this.disableButtons();

        let startState = this.state.treeControl.getState();
        let orgData = this.state.treeControl.getData();
        let orgSelectedNode = this.state.treeControl.getSelectedNode();
        let cloneData = orgData.map(f => ({ ...f }));

        this.state.treeControl.updateData(cloneData).disableNode(cloneData);
        cloneData.forEach(f => this.state.treeControl.disableNode(f));

        let selectedNode = this.state.treeControl.getSelectedNode();
        selectedNode.item.Leaf = MoveToLeaf;
        this.state.treeControl.redrawTree();

        selectedNode.item.onCancel = () => {
            this.onNodeClick(orgSelectedNode);
            this.state.treeControl.setState(startState)
                .updateData(orgData).redrawTree();
        };
        selectedNode.item.onOK = () => {
            let sortedData = this.state.treeControl.getFilteredAndSortedData();
            let sel = sortedData.find(f => this.props.idFnc(f) === this.props.idFnc(orgSelectedNode));
            let parent = sel.getParent();

            let ind = Math.min(parent.children.indexOf(sel), parent.children.length - 2);
            orgSelectedNode.getParent().removeChild(orgSelectedNode);

            let selNode = ind < 0 ? parent : parent.removeChild(sel).children[ind];
            this.onNodeClick(selNode);

            this.state.treeControl.updateData(orgData)
                .clearAllStates().selectNode(selNode).openNode(selNode);

            this.props.changeState(state => commonRedux.immute(state, { data: orgData }))();
        }
    }

    state = {
        treeControl: null,
        buttons: [
            { name: 'Add', enabled: false, onClick: this.addClicked },
            { name: 'Rename', enabled: false, onClick: this.renameClicked },
            { name: 'Move', enabled: false, onClick: this.moveClicked },
            { name: 'Delete', enabled: false, onClick: this.deleteClicked },
        ]
    }

    idFnc = node => node.item.KeyID + ':' + node.item.KeyID_mdbID;

    nodeClicked = node => {
        let btns = this.state.buttons.map(f => ({ ...f, enabled: true }));
        if (node.getParent == null)
            btns.filter(f => f.name !== 'Add').forEach(f => f.enabled = false);
        this.setState({ buttons: btns });

        this.props.sideTreeControl.clearAllStates().selectNode(node).openNode(node).redrawTree();
    }
    onNodeClick = this.nodeClicked;

    getControls = (controls) => {
        controls.selectNode(controls.getData()).openNode(controls.getData());
        this.setState({ treeControl: controls });
        this.onNodeClick(controls.getData());
        window.controls = controls;
    }

    sortFnc = node => node.sortBy(f => f.item.text, StringSorter);
    render() {
        return (
            <Aux>
                <div className="btn-group pb-2">
                    {this.state.buttons.map(f => (<button key={f.name} className="btn btn-info"
                        disabled={!f.enabled} onClick={f.onClick}>{f.name}</button>))}
                </div>
                <Tree data={this.props.data} idFnc={this.props.idFnc} getControls={this.getControls}
                    sortFnc={this.sortFnc}
                    filterFnc={node => node.filterAny(f => !f.item.isHidden)}
                    onNodeClick={(node) => this.onNodeClick(node)}
                />
            </Aux>
        );
    }
}

export default commonRedux.connect.all(AdminTree);
