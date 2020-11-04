import React from 'react';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const BackButton = (props) => {
  return (
    <FontAwesomeIcon 
      style={{marginLeft: '10px'}}
      icon={faArrowLeft}
      size='2x'
      onClick={() => props.history.goBack()}
    />
  );
}

export default withRouter(BackButton);