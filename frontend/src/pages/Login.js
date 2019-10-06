import React, {Component} from 'react';
import {connect} from 'react-redux';
import {initiateTWLogin} from '../actions/AuthActionTypes';

class Login extends Component {
  handleSubmit = e => {
    e.preventDefault();
    console.log('Twitter login start');
    this.props.initiateTWLogin();
  };

  componentDidUpdate(prevProps) {
    console.log('prevProps: ', prevProps);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <button type="submit">Login with Twitter</button>
        </form>
      </div>
    );
  }
}

const actionCreators = {
  initiateTWLogin,
};

export default connect(
  null,
  actionCreators,
)(Login);
