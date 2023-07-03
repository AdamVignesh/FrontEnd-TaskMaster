import React, { useContext, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import ModalComponent from '../ModalComponent/ModalComponent';
import { AuthContext } from '../../MyContext';
import AddMemberComponent from '../AddMemberComponent/AddMemberComponent';
import KanbanBoardComponent from '../KanbanBoardComponent/KanbanBoardComponent'; 
import AddTask from '../AddTaskComponent/AddTask';
import TopBar from '../TopBarComponent/TopBar';

function ProjectDetailsComponent() {

  const location = useLocation();
  const {id,description} = location.state;
  
  const {showFormsModal,setShowFormsModal,loggedInUser,invokeRoleChange,invokeProjectMenu,invokeStateUpdate} = useContext(AuthContext);
  const [showAddTasks,setShowAddTasks] = useState(false);

  const navigate = useNavigate();

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
  const handleLogOut =()=>{
    localStorage.removeItem('accessToken');
    invokeStateUpdate(false);    
    navigate("/Login");
  }

  invokeProjectMenu();
  return (
    <div>
      
      <TopBar handleLogOut={handleLogOut} handleAddMembers={handleAddMembers} handleAddTask={handleAddTask} />

      <KanbanBoardComponent id={id}/>
     {!showAddTasks?<ModalComponent showModal={showFormsModal} popUpTitle="Add Members" popUpContent={<AddMemberComponent id={id}/>} handleCloseModal={handleCloseModal}/>
      :<ModalComponent showModal={showFormsModal} popUpTitle="Assign Task" popUpContent={<AddTask id={id} handleSubmit={handleCloseModal}/> }  handleCloseModal={handleCloseModal}/> }
    </div>
  )
}

export default ProjectDetailsComponent