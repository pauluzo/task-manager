import React, { useEffect } from 'react';
import AddButton from './addButton';
import CustomDivider from './customDivider';

const ReturnedList = (data) => {
  useEffect(() => {

  })

  return (
    <React.Fragment>
      <div id='task-header' style={{
        position: "fixed", zIndex: 50, display: 'flex',
        flexDirection: 'column', alignItems: 'center', width: '100%',
        paddingTop: '5px', backgroundColor: 'white'
      }}>
        <span style={{
          fontSize: '20px',
          fontWeight: 800,
          fontFamily: "cursive",
          color: "midnightblue",
          padding: "5px 0px"
        }}>{data.isActive ? 'ACTIVE TASKS' : 'COMPLETED TASKS'}</span>
        <CustomDivider 
          width={100} thickness={3} color='midnightblue' 
          style={{marginBottom: '0px'}}
        />
      </div>
      <div style={{
        marginTop: '45px', width: '100%', padding: '10px 0px',
        display: 'flex', alignItems: "center", flexDirection: "column"
      }}>
        {data.returnList}
      </div>
      <AddButton/>
    </React.Fragment>
  );
}

export default ReturnedList;