import React, { useContext } from 'react';
import { useGoogleLogin } from 'react-google-login';
import {LoginContext} from "../App";

//import refresh token


const clientId = process.env.REACT_APP_CLIENT_ID as string;

function GoogleLogin(props) {
  const authValue = useContext(LoginContext);

  const onSuccess = (res) => {
    console.log('Login Success: currentUser:', res.profileObj);
    authValue.setAuth(!authValue.auth);
  }

  const onFailure = (res) => {
    console.log('Login failed: res:', res);
  };

  const {signIn} = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId,
    accessType: 'offline',
  });

  // Custom sign-in link
  return (
    <span onClick={() => signIn()}>{props.isSignup ? 'sign up' : 'log in'} with google instead?</span>
  );
}

export default GoogleLogin;