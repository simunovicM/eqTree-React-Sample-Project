import { connect } from 'react-redux';

let mapDispatchToProps = dispatch => ({
    changeState: fnc => () => dispatch({ type: null, fnc: fnc })
});

let mapStateToProps = state => ({...state});

const commonRedux = {
    connect: {
        all: connect(mapStateToProps, mapDispatchToProps, null, { pure: false }),
    },
    immute: (oldObject, updatedValues) => ({ ...oldObject, ...updatedValues }),
}

export default commonRedux;