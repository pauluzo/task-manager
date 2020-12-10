import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useFormik } from 'formik';
import CustomDivider from '../components/customDivider';
import DatePicker from "react-datepicker";
import {addDays, addYears} from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import BackButton from '../components/backButton';
import { activeTask } from '../bloc/activeTasks';
import TaskModel from '../models';

const validate = values => {
  const errors : any = {};
  
  if (!values.taskTitle) {
    errors.taskTitle = 'Required field *';
  } else if (values.taskTitle.length > 35) {
    errors.taskTitle = 'Must be less than 36 characters';
  }

  if (!values.taskDescription) {
    errors.taskDescription = 'Required field *';
  } else if (values.taskDescription.length > 135) {
    errors.taskDescription = 'Must be 136 characters or less';
  }

  if (!values.reminderInterval) {
    errors.reminderInterval = 'Required field *';
  }

  return errors;
};

const TaskEdit = (props) => {
  const ref = React.createRef<HTMLInputElement>();
  const task = props.location && props.location.task;
  const index = props.location && props.location.index;

  const tomorrow : Date = addDays(new Date(), 1);
  const [dueDate, setDueDate] = useState(task ? new Date(task.dueDate) : tomorrow);

  const CustomInput = React.forwardRef<HTMLInputElement>((props : any, ref) => {
    return <input readOnly value={props.value} ref={ref} onClick={props.onClick} />
  })

  const formik = useFormik({
    initialValues: {
      taskTitle: task ? task.title : '',
      taskDescription: task ? task.description : '',
      reminderInterval: task ? task.reminderInterval : ''
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
      let data : TaskModel = {
        title: values.taskTitle,
        description: values.taskDescription,
        reminderInterval: values.reminderInterval,
        dueDate: dueDate,
        status : "active"
      }

      index ? activeTask.editTask(data, index) : activeTask.addTask(data);
    },
    validate,
  });

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
        style={{margin: '0px'}}      
      />
      <div className="edit-container" >
        <form onSubmit={formik.handleSubmit}>
          <label>
            <div>
              Task Title
            </div>
            <input
              className='input-title'
              name='taskTitle'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.taskTitle}
            />
            { formik.touched.taskTitle && formik.errors.taskTitle ? (
              <div className="signup-error">{formik.errors.taskTitle}</div>
              ) : null
            }
          </label>
          <label>
            <div>
              Task Description
            </div>
            <textarea 
              maxLength={135}
              className='input-description'
              name='taskDescription'
              rows={5}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.taskDescription}
            />
            {formik.touched.taskDescription && formik.errors.taskDescription ? (
              <div className="signup-error" >{formik.errors.taskDescription}</div>
              ) : null
            }
          </label>
          <label>
            <div>
              Due Date
            </div>
            <DatePicker 
              selected={dueDate}
              onChange={setDueDate}
              timeInputLabel="Time:"
              dateFormat="dd-MMM-yyyy h:mm aa"
              showTimeInput
              minDate={tomorrow}
              maxDate={addYears(new Date(), 1)}
              customInput={<CustomInput ref={ref} />}
            />
          </label>
          <label>
            <div>
              Reminder Interval
            </div>
            <select
              className="dropdown" 
              name='reminderInterval'
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.reminderInterval}
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
            {formik.touched.reminderInterval && formik.errors.reminderInterval ? (
              <div className="signup-error" >{formik.errors.reminderInterval }</div>
              ) : null
            }
          </label>
          <button type="submit" className='add-button' >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default withRouter(TaskEdit);