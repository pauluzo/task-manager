import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { CustomDivider } from '../components/taskContainer';
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import moment, { Moment } from 'moment';
import BackButton from '../components/backButton';

const TaskEdit = (props) => {
  const task = props.location && props.location.task;

  const [isValid, setValid] = useState(true);
  const [taskInput, setTaskInput] = useState({
    taskTitle: task ? task.title : '',
    taskDescription: task ? task.description : '',
    dueDate: task ? task.dueDate : '',
    reminderInterval: task ? task.reminderInterval : ''
  });

  function handleChange(e) {
    let target = e.target;
    let {name, value} = target;

    setTaskInput({...taskInput, [name] : value})
  } 

  function dateChange(date) {
    console.log(date);
    if(typeof date === "string") {
      setValid(false);
    } else {
      setValid(true);
      setTaskInput({...taskInput, dueDate: date});
    }
    console.log(taskInput.dueDate);
  }

  function setValidity(current : Moment) {
    let yesterday = moment().subtract(1, "day");
    let nextYear = moment().add(1, "year");
    return current.isAfter(yesterday) && current.isBefore(nextYear);
  }

  function handleSubmit() {
    if(!taskInput.taskTitle) {
      alert('The title field cannot be empty');
    } else if (!taskInput.taskDescription) {
      alert('The desciption field can not be empty');
    } else if(!taskInput.dueDate) {
      alert('The due date can not be empty');
    } else if (!taskInput.reminderInterval) {
      alert('Select a valid reminder interval');
    }
  }

  return (
    <div className='task-details'>
      <div className='details-header'>
        <BackButton />
        <div className='details-title'>
          {
            task ? 'EDIT TASK' : 'ADD TASK'
          }
        </div>
      </div>
      <CustomDivider 
        thickness={4}
        color='midnightblue'
        width={100}          
      />
      <div className="edit-container" >
        <label>
          <div>
            Task Title
          </div>
          <input 
            required
            maxLength={35}
            style={{height: '30px'}}
            className='input-title'
            name='taskTitle'
            onChange={handleChange}
            value={taskInput.taskTitle}
          />
        </label>
        <label>
          <div>
            Task Description
          </div>
          <textarea 
            required
            maxLength={135}
            className='input-description'
            name='taskDescription'
            onChange={handleChange}
            value={taskInput.taskDescription}
            rows={5}
          />
        </label>
        <label>
          <div>
            Due Date
          </div>
          <Datetime
            inputProps={{
              className: isValid ? 'date-input' : 'date-error',
              readOnly: true,
              required: true,
              placeholder: `${moment().toLocaleString()}`
            }}
            dateFormat="ddd MMM DD YYYY"
            isValidDate={setValidity}
            value={taskInput.dueDate}
            onChange={dateChange}
          />
        </label>
        <label>
          <div>
            Reminder Interval
          </div>
          <select 
            style={{height: '30px'}}
            value={taskInput.reminderInterval} 
            name='reminderInterval'
            onChange={handleChange}
          >
            <option></option>
            <option value='1 hour'> 1 hour</option>
            <option value='2 hours' > 2 hours</option>
            <option value='3 hours' > 3 hours</option>
            <option value='6 hours' > 6 hours</option>
            <option value='12 hours' > 12 hours</option>
            <option value='1 day' > 1 day</option>
            <option value='2 days' > 2 days</option>
            <option value='3 days'> 3 days</option>
            <option value='1 week' > 1 week</option>
            <option value='2 weeks' > 2 weeks</option>
            <option value='1 month' > 1 month</option>
            <option value='2 months' > 2 months</option>
            <option value='3 months' > 3 months</option>
          </select>
        </label>
        <div onClick={handleSubmit} className='add-button' >
          Save
        </div>
      </div>
    </div>
  );
}

export default withRouter(TaskEdit);