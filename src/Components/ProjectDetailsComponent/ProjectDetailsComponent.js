import React, { useContext, useState } from 'react'
import { useLocation } from 'react-router-dom';
import ModalComponent from '../ModalComponent/ModalComponent';
import { AuthContext } from '../../MyContext';
import AddMemberComponent from '../AddMemberComponent/AddMemberComponent';
import KanbanBoardComponent from '../KanbanBoardComponent/KanbanBoardComponent'; 
import AddTask from '../AddTaskComponent/AddTask';

function ProjectDetailsComponent() {

  const location = useLocation();
  const {title,id,description} = location.state;
  
  const {showFormsModal,setShowFormsModal,loggedInUser,invokeRoleChange} = useContext(AuthContext);
  const [showAddTasks,setShowAddTasks] = useState(false);

  const handleAddMembers=()=>{
    setShowFormsModal(true);
  }

  const handleCloseModal=()=>{
    setShowFormsModal(false);
     invokeRoleChange(null);
     setShowAddTasks(false);
  }

  const handleAddTask= ()=>{
    setShowFormsModal(true);
    setShowAddTasks(true);
  }
  return (
    <div>
      {title}
      
      <KanbanBoardComponent/>

      {loggedInUser && loggedInUser?.role=='Manager'?<button onClick={handleAddMembers}>Add Members</button>:null}
      {loggedInUser && loggedInUser?.role=='Manager'?<button onClick={handleAddTask}>Assign Tasks</button>:null}
      {!showAddTasks?<ModalComponent showModal={showFormsModal} popUpTitle="Add Members" popUpContent={<AddMemberComponent id={id}/>} handleCloseModal={handleCloseModal}/>:null}
      {showAddTasks?<ModalComponent showModal={showFormsModal} popUpTitle="Assign Task" popUpContent={<AddTask/>} id={id} handleCloseModal={handleCloseModal}/> : null}
    </div>
  )
}

export default ProjectDetailsComponent