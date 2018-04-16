import { connect } from 'react-redux';

import * as actions from '../actions';

import Page from '../components/Page';

const mapStateToProps = (state, ownProps) => {
    const {terminals} = state;
  return {
      terminals
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    activateTerminal: (terminalId) => dispatch(actions.activateTerminal(terminalId)),
    closeTerminal: (terminalId) => dispatch(actions.closeTerminal(terminalId)),
    openTerminal: () => dispatch(actions.openTerminal())
  };
};

const PageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Page);

export default PageContainer;