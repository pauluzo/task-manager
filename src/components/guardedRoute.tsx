import React, { useContext } from 'react';
import { Route, Redirect, withRouter } from "react-router-dom";
import { LoginContext } from '../App';

const RestrictAccess = ({ component: Component, ...rest }) => {
  let authValue = useContext(LoginContext);
  return (
    <Route {...rest} 
      render={(props) => (
        authValue.auth
        ? <Component {...props} />
        : <Redirect to='/error' />
      )} 
    />
  );
}

export default withRouter(RestrictAccess);