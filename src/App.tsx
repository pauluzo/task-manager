import React from 'react';

interface Props {
  name: string,
  date: string,
}

const App = (props: Props) : JSX.Element => {
  return (
    <div>
      My name is {props.name} and I registered on {props.date}
    </div>
  );
}

export default App;
