import React from "react";
import {ReactComponent as Alarm1} from "../images/alarm.svg";
import {ReactComponent as Interval} from "../images/interval.svg";
import TaskModel from "../models";

const TaskContainer : React.FC<TaskModel> = (task: TaskModel) : JSX.Element => {

  const style : React.CSSProperties = {
    width: '330px',
    height: '120px',
    margin: '20px',
    display: 'flex',
    alignItems: 'center',
  }

  const style1 = {
    width: '300px',
    height: '100%',
    borderRadius: '20px',
    border: '2px solid blue',
    right: '0',
  }

  const circularProg : React.CSSProperties = {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    border: '2px solid blue',
    left: '0',
    backgroundColor: 'blue',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
  }

  const taskDetails : React.CSSProperties = {
    marginLeft: '35px',
    height: '100%',
    marginRight: '10px',
    display: 'flex',
    alignItems: 'center'
  }

  const detail1Container : React.CSSProperties = {
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
    fontFamily: 'cursive',
    fontSize: '14px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }

  const descContainer : React.CSSProperties = {
    paddingLeft: '5px',
    fontFamily: 'cursive',
    height: '70%',
  }

  const dateContainer : React.CSSProperties = {
    width: '25%', 
    height: '100%',
    display: 'flex',
    flexDirection: "column",
    alignItems: 'center',
    fontFamily: 'cursive',
    textAlign: 'center'
  }

  return (
    <div style={{...style, position: "relative"}}>
      <div style={{...style1, position: "absolute"}}>
        <div style={taskDetails}>
          <div style={detail1Container}>
            <div style={titleContainer}>
              {
                (task.title.length > 18) ? 
                `${task.title.substring(0, 16).toUpperCase()}...` : 
                task.title.toUpperCase()
              }
            </div>
            <CustomDivider 
              thickness={2}
              color={'grey'}
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
            color={'grey'}
            height={70}
          />
          <div style={dateContainer} >
            <div style={{height: '50%', width: '100%', display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
              <div style={{width: '25px', height: '25px', paddingTop: '5px'}}>
                <Interval />
              </div>
              <div style={{fontSize: '13px',}}>
                {task.reminderDate}
              </div>
            </div>
            <CustomDivider
              thickness={2}
              color={'grey'}
              width={80}
            />
            <div style={{height: '50%', width: '100%', display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
              <div style={{width: '30px', height: '30px'}}>
                <Alarm1 />
              </div>
              <div style={{fontSize: '13px',}}>
                {task.dueDate}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{...circularProg, position: "absolute", fontFamily: 'cursive'}}>
        1
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

const CustomDivider : React.FC<Props> = ({thickness, color, height, width}) : JSX.Element => {
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

export default TaskContainer;
