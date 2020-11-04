import React from 'react';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const AddButton = () => {
  return (
    <Link to='/task'>
    <div className='add-button' >
      <FontAwesomeIcon 
        icon={faPlus}
        size='2x'
      />
    </div>        
  </Link>
  );
}

export default AddButton;