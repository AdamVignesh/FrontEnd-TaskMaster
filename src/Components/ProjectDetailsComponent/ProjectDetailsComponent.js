import React, { useContext } from 'react'
import { useLocation } from 'react-router-dom';
import ModalComponent from '../ModalComponent/ModalComponent';
import { AuthContext } from '../../MyContext';
import AddMemberComponent from '../AddMemberComponent/AddMemberComponent';

function ProjectDetailsComponent() {

  const location = useLocation();
  const {title} = location.state;
  
  const {showFormsModal,setShowFormsModal} = useContext(AuthContext);

  const handleAddMembers=()=>{
    setShowFormsModal(true);
  }
  return (
    <div>
      {title}
      <button onClick={handleAddMembers}>Add Members</button>
      <ModalComponent showModal={showFormsModal} popUpTitle="Add Members" popUpContent={<AddMemberComponent/>} handleCloseModal={()=>setShowFormsModal(false)}/>
    </div>
  )
}

export default ProjectDetailsComponent