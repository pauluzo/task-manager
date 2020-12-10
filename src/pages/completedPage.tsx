import React, { useEffect, useState } from 'react';
import { completedTask } from '../bloc/completedTasks';
import TaskContainer from '../components/taskContainer';
import TaskModel from '../models';
import './activePage.css';
import ReturnedList from '../components/returnedList';

const data1 : TaskModel = {
  title: 'Okafor Paul',
  description: 'A fair description of the happenings in the city.',
  reminderInterval: '12 hours',
  dueDate: new Date(2021, 5, 17, 11, 17).toDateString(),
  status: 'completed'
}

const data3 : TaskModel = {
  title: 'Okafor Silas',
  description: 'A Doctoral interpretation',
  reminderInterval: '12 hours',
  dueDate: new Date(2021, 5, 10).toDateString(),
  status: 'completed'
}

const CompletedPage = () => {
  const [taskList, setTaskList] = useState([]);
  useEffect(() => {
    let subscription = completedTask.completedTaskStream((newValue) => {
      console.log(newValue);
      setTaskList(newValue);
    });
    console.log('this runs');
    completedTask.addTask(data1);
    completedTask.addTask(data3);

    let unsubscribe = () => {
      subscription.unsubscribe();
      console.log('this unmounts');
    }

    return unsubscribe;
  }, []);

  const returnedList = taskList.map((task : TaskModel, index) => {
    return (
      <TaskContainer key={index} model={task} index={index} />
    );
  });

  console.log(returnedList)

  return (
    <div className='active-container'>
      <ReturnedList returnList={returnedList} />
    </div>
  );
}

export default CompletedPage;