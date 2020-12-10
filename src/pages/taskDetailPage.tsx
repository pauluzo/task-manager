import React, { useState } from "react";
import CustomDivider from "../components/customDivider";
import { withRouter, Link } from 'react-router-dom';
import Switch from 'react-switch';
import BackButton from "../components/backButton";
import TaskModel from "../models";


const TaskDetails = (props) => {
  const task : TaskModel = props.location.state.task;
  console.log(task);
  return (
    <div className='task-details'>
      <div className='details-header'>
        <BackButton />
        <div className='details-title'>
          {
            (task.title.length > 28) ? 
            `${task.title.substring(0, 26).toUpperCase()}...` : 
            task.title.toUpperCase()
          }
        </div>
      </div>
      <CustomDivider 
        thickness={4}
        color='midnightblue'
        width={100}
        style={{margin: '0px'}}
      />
      <div className='details-description'>
        {task.description}
      </div>
      <CustomDivider 
        thickness={2}
        color='midnightblue'
        width={100}
      />
      <div className='details-date'>
        <div>
          <div style={{width: '100%', display: 'block'}}>Due Date</div>
          <span>{task.dueDate}</span>
        </div>
        <div>
          Reminder
          <span>{task.reminderInterval}</span>
        </div>
      </div>
      <ToggleSlider isCompleted={task.status === 'completed'} />
      <div className='details-buttons'>
        <Link
          to={{
            pathname: '/task',
            task: task
          }}
        >
          <button style={{backgroundColor: 'blue'}} className='edit-btn'>
            Edit
          </button>
        </Link>
        <button style={{backgroundColor: 'red'}} className='edit-btn'>
          Delete
        </button>
      </div>
    </div>
  )
}

const ToggleSlider = (props) => {
  // use callback function to effect this change on the back-end...
  const [isChecked, setChecked] = useState(props.isCompleted ? true : false);

  return (
    <div style={{padding: '20px 10px', width: '100%', boxSizing: 'border-box'}}>
      <div>Mark task as completed?</div>
      <label style={{
        display: 'flex', alignItems: 'center',
        paddingTop: '7px'
      }}>
        <Switch
          onChange={setChecked}
          checked={isChecked}
          onColor="#88f368"
          onHandleColor="#3dc01d"
          handleDiameter={30}
          uncheckedIcon={false}
          checkedIcon={false}
          boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
          activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
          height={20}
          width={48}
          className="react-switch"
          id="material-switch"
        />
        <span style={{paddingLeft: '5px'}}>{isChecked ? 'Task completed' : 'Task NOT completed'}</span>
      </label>
    </div>
  );
}

export default withRouter(TaskDetails);