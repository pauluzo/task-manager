import React, { useState } from 'react';
import HomePage from './pages/homePage';
import SignupPage from './pages/signupPage';

let defaultValue = {
  auth : false,
  setAuth(newAuth: boolean) {}
}
  
export const LoginContext = React.createContext(defaultValue)

const App = () : JSX.Element => {
  const [auth, setAuth] = useState(true);

  return (
    <LoginContext.Provider value={{auth, setAuth}}>
      <React.Fragment>
        {
          auth ? 
          <HomePage /> :
          <SignupPage />
        }
      </React.Fragment>
    </LoginContext.Provider>
  );
}

export default App;
