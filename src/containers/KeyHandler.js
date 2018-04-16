import { connect } from 'react-redux';
import KeyHandler from '../components/KeyHandler';

import * as actions from '../actions';

const mapStateToProps = (state, ownProps) => {
  return {};
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
      keyPress: (event) => dispatch(actions.keyPress(event)),
      keyDown: (event) => dispatch(actions.keyDown(event))      
  };
};

const KeyHandlerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(KeyHandler);

export default KeyHandlerContainer;