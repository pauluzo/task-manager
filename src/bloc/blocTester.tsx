import React, { useEffect } from "react";
import {completedTask} from './completedTasks';
import TaskModel from '../models';

const data1 : TaskModel = {
  title: 'Okafor Paul',
  description: 'A fair description',
  reminderDate: '12-04-16',
  dueDate: '15-06-16',
  isCompleted:false,
}

const data2 = {
  title: 'Okafor Paul',
  description: 'A fair description',
  reminderDate: '12-04-17',
  dueDate: '15-06-17',
  isCompleted: true,
}

const data3 = {
  title: 'Okafor Silas',
  description: 'A Rugged interpretation',
  reminderDate: '18-04-18',
  dueDate: '15-08-18',
  isCompleted: true,
}

const data4 = {
  title: 'Okafor Chidinma',
  description: 'A Blessing',
  reminderDate: '18-04-19',
  dueDate: '15-08-19',
  isCompleted: false,
}

const BlocTester = (): JSX.Element => {
  useEffect(() => {

    let subscription = completedTask.completedTaskStream((val: any) => {
      console.log('Sub-stream 1', val);
    });

    let unsubscribe = () => {
      subscription.unsubscribe();
      console.log('this unmounts');
    }

    completedTask.addTask(data1);
    completedTask.addTask(data2);

    return unsubscribe;
  }, [])

  return (
    <div>
      This div should appear on the browser.
    </div>
  );
}

export const BlocTester2 = (): JSX.Element => {
  useEffect(() => {
    let subscription = completedTask.completedTaskStream((val: any) => {
      console.log('Sub-stream 2', val);
    });

    let unsubscribe = () => {
      subscription.unsubscribe();
      console.log('this unmounts');
    }

    completedTask.addTask(data3);
    completedTask.addTask(data4);

    completedTask.deleteTask(3);

    return unsubscribe;
  }, [])

  return (
    <div>
      This is div2 and should appear under div1.
    </div>
  );
}

export default BlocTester;