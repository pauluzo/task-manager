import React from 'react';
import BlocTester, {BlocTester2} from "../src/bloc/blocTester";

const App = () : JSX.Element => {
  return (
    <div>
      My name is Okafor Paul and I registered on {Date().toString()}
      <BlocTester/>
      <BlocTester2/>
    </div>
  );
}

export default App;
