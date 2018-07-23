import { connect } from 'react-redux';

import * as actions from '../actions';

import FileViewer from '../components/FileViewer';

const mapStateToProps = (state, ownProps) => {
  const {connection, path} = ownProps;
  const device = state.network.find(device => device.hostname === connection);
  const file = device.files.find(file => file.path === path);
  const isDirectory = file.type === 'directory';
  const children = device.files.filter(file => file.path === path + '/' + file.name);
  return {
    device,
    file,
    isDirectory,
    children
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  
};

const Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(FileViewer);

export default Container;