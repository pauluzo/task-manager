import React from 'react';
import BlocTester, {BlocTester2} from "../src/bloc/blocTester";
import TaskContainer from './components/taskContainer';

const App = () : JSX.Element => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      <BlocTester/>
      <BlocTester2/>
      <TaskContainer
        title={'Read Books Daily'}
        description={
          `Here is where the description of the task goes
           and can be used to preview the task details.
          `
        }
        dueDate={'30-04-20'}
        reminderDate={'2 months'}
        isCompleted={false}
      />
    </div>
  );
}

export default App;
