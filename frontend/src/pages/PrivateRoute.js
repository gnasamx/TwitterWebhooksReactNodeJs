import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Login from './Login';
import {connect} from 'react-redux';
import {loginTWUser} from '../actions/AuthActionTypes';

class PrivateRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }
  componentDidMount() {
    this.props.loginTWUser();
  }

  render() {
    const {component, ...rest} = this.props;
    const showComponent = this.props.user ? component : Login;
    // const showComponent = this.props.user ? Login : component;
    return <Route {...rest} component={showComponent} />;
  }
}

const mapStateToProps = state => {
  const {
    authenticationReducer: {user},
  } = state;
  return user;
};

const actionCreators = {
  loginTWUser,
};

export default connect(
  mapStateToProps,
  actionCreators,
)(PrivateRoute);
