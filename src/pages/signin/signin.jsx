import React from 'react';

export class Signin extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { state, actions } = this.props;

    return <h1>Hello World</h1>
  }
};


import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as signinActions from '../../actions/signin-actions';
export default connect(state => ({
    state: state.signin
  }),
  (dispatch) => ({
    actions: bindActionCreators(signinActions, dispatch)
  })
)(Signin);