import departments from './Data/treeData';
import node from 'eqnode';
import { StringSorter } from './Libraries/common';

let getData = () => {
    var findFnc = (item, arr) => arr.find(function (g) { return item.Parent === g.KeyID && item.Parent_mdbID === g.KeyID_mdbID; });
    return node.fromArray(departments.map(f => ({ ...f, text: f.Name })), findFnc)[0];
}

const initialState = {
    data: getData(),
    idFnc: node => node.item.KeyID + ':' + node.item.KeyID_mdbID,
    sortFnc: node => node.sortBy(f => f.item.text, StringSorter),
}

const reducer = (state = initialState, action) => action.fnc ? action.fnc(state) : state;

export default reducer;
