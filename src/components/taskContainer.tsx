import React from "react";
import { withRouter } from 'react-router-dom';
import {ReactComponent as Alarm1} from "../images/alarm.svg";
import {ReactComponent as Interval} from "../images/interval.svg";
import TaskModel from "../models";

interface TaskContainerProps {
  index: number;
  model: TaskModel;
  history?: any;
}

const TaskContainer : React.FC<TaskContainerProps> = (taskInfo: TaskContainerProps) : JSX.Element => {
  let task: TaskModel = taskInfo.model;

  function getColor (status : TaskModel["status"] = task.status) {
    if(status === 'completed') return 'green'; 
    else if(status === 'active') return 'darkblue';
    else if (status === 'expired') return 'red';
    else if(status === 'warning') return '#aca10d';
    return 'darkblue';
  }

  const handleClick = () => {
    taskInfo.history.push({
      pathname: '/details',
      state: {task: task}
    });
  }

  const colorPalette = getColor();

  const style : React.CSSProperties = {
    minWidth: '270px',
    height: '120px',
    margin: '10px 5px',
    display: 'flex',
    alignItems: 'center',
  }

  const style1 = {
    width: '91%',
    height: '100%',
    borderRadius: '20px',
    border: `2px solid ${colorPalette}`,
    right: '0',
  }

  const circularProg : React.CSSProperties = {
    width: '45px',
    height: '45px',
    borderRadius: '50%',
    left: '0',
    backgroundColor: `${colorPalette}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
  }

  const taskDetails : React.CSSProperties = {
    marginLeft: '25px',
    marginRight: '5px',
    height: '100%',
    display: 'flex',
    alignItems: 'center'
  }

  const detailContainer : React.CSSProperties = {
    width: '75%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  }

  const titleContainer : React.CSSProperties = {
    width: '100%',
    height: '30%',
    textAlign: 'center',
    fontWeight: 600,
    fontSize: '14px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }

  const descContainer : React.CSSProperties = {
    paddingLeft: '5px',
    fontSize: '14px',
    height: '70%',
  }

  const dateContainer : React.CSSProperties = {
    width: '25%', 
    height: '100%',
    display: 'flex',
    flexDirection: "column",
    alignItems: 'center',
    textAlign: 'center'
  }

  return (
    <div style={{...style, position: "relative"}}>
      <div onClick={handleClick}
       style={{...style1, position: "absolute"}}>
        <div style={taskDetails}>
          <div style={detailContainer}>
            <div style={titleContainer}>
              {
                (task.title.length > 18) ? 
                `${task.title.substring(0, 16).toUpperCase()}...` : 
                task.title.toUpperCase()
              }
            </div>
            <CustomDivider 
              thickness={2}
              color={colorPalette}
              width={80}
            />
            <div style={descContainer}>
              {
                (task.description.length > 70) ? 
                `${task.description.substring(0, 68)}...` : 
                task.description
              }
            </div>
          </div>
          <CustomDivider 
            thickness={2}
            color={colorPalette}
            height={70}
          />
          <div style={dateContainer} >
            <div style={{height: '50%', width: '100%', display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
              <div style={{width: '30px', height: '30px'}}>
                <Alarm1 />
              </div>
              <div style={{fontSize: '12px',}}>
                {task.dueDate}
              </div>
            </div>
            <CustomDivider
              thickness={2}
              color={colorPalette}
              width={80}
            />
            <div style={{height: '50%', width: '100%', display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
              <div style={{width: '25px', height: '25px', paddingTop: '5px'}}>
                <Interval />
              </div>
              <div style={{fontSize: '12px',}}>
                {task.reminderInterval}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{...circularProg, position: "absolute", fontFamily: 'cursive'}}>
        {taskInfo.index + 1}
      </div>
    </div>
  );
}

interface Props {
  thickness: number,
  color: string,
  height?: number,
  width?: number,
}

export const CustomDivider : React.FC<Props> = ({thickness, color, height, width}) : JSX.Element => {
  let dividerStyle: React.CSSProperties = height ? 
  {
    height: `${height}%`,
    width: `${thickness}px`,
    backgroundColor: color,
    margin: 'auto 3px',
  } : {
    width: `${width}%`,
    height: `${thickness}px`,
    backgroundColor: color,
    margin: '3px auto',
  };
  return (
    <div style={dividerStyle}></div>
  )
}

export default withRouter(TaskContainer);
