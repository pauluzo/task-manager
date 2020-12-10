import React, { useEffect, useState } from 'react';
import { activeTask } from '../bloc/activeTasks';
import ReturnedList from '../components/returnedList';
import TaskContainer from '../components/taskContainer';
import TaskModel from '../models';
import './activePage.css';

const data1 : TaskModel = {
  title: 'Okafor Paul',
  description: 'A fair description of the happenings in the city.',
  reminderInterval: '12 hours',
  dueDate: new Date(2020, 7, 12).toDateString(),
  status: 'warning',
}

const data3 : TaskModel = {
  title: 'Okafor Silas',
  description: 'A doctoral interpretation of a Slay King. Dr. Slay.',
  reminderInterval: '6 hours',
  dueDate: new Date(2018, 11, 6).toDateString(),
  status: 'active'
}

const data4 : TaskModel = {
  title: 'Okafor Chidinma',
  description: 'A Blessing to the people around her.',
  reminderInterval: '3 hours',
  dueDate: new Date(2017, 8, 9).toDateString(),
  status: "expired"
}

const ActivePage = () => {
  const [taskList, setTaskList] = useState([]);
  useEffect(() => {
    let subscription = activeTask.activeTaskStream((newValue) => {
      console.log(newValue);
      setTaskList(newValue);
    });
    activeTask.addTask(data1);
    activeTask.addTask(data3);
    activeTask.addTask(data4);

    let unsubscribe = () => {
      subscription.unsubscribe();
      console.log('this unmounts');
    }

    return unsubscribe;
  }, []);

  const returnedList : JSX.Element[] = taskList.map((task : TaskModel, index) => {
    return (
      <TaskContainer key={index} model={task} index={index}
    />
    );
  });

  return (
    <div className='active-container'>
      <ReturnedList returnList={returnedList} isActive={true} />
    </div>
  );
}

export default ActivePage;