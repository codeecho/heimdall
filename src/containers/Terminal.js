import { connect } from 'react-redux';

import * as actions from '../actions';

import Terminal from '../components/Terminal';

const mapStateToProps = (state, ownProps) => {
  return {};
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const id = ownProps.id;
  return {
    activate: () => dispatch(actions.activateTerminal(id)),
    close: () => dispatch(actions.closeTerminal(id))
  };
};

const Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(Terminal);

export default Container;