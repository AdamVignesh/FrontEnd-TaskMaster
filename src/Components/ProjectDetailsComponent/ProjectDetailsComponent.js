import React, { useContext, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import ModalComponent from '../ModalComponent/ModalComponent';
import { AuthContext } from '../../MyContext';
import AddMemberComponent from '../AddMemberComponent/AddMemberComponent';
import KanbanBoardComponent from '../KanbanBoardComponent/KanbanBoardComponent'; 
import AddTask from '../AddTaskComponent/AddTask';
import TopBar from '../TopBarComponent/TopBar';
import axios from 'axios';

function ProjectDetailsComponent() {

  const location = useLocation();
  const {id} = location.state;
  const {showFormsModal,setShowFormsModal,invokeGetTasks,invokeRoleChange,invokeProjectMenu,invokeStateUpdate,invokeShowAddTask,showAddTasks} = useContext(AuthContext);
  
  const [showProjectEndConfirm,setShowProjectEndConfirm] = useState(false);

  const navigate = useNavigate();

  const handleAddMembers=()=>{
    setShowFormsModal(true);
  }

  const handleCloseModal=()=>{
    setShowFormsModal(false);
     invokeRoleChange(null);
     invokeShowAddTask(false);
     setShowProjectEndConfirm(false);
  }

  const handleAddTask= ()=>{
    setShowFormsModal(true);
    invokeShowAddTask(true);
  }
  const handleLogOut =()=>{
    localStorage.removeItem('accessToken');
    invokeStateUpdate(false);    
    navigate("/Login");
  }
  const handleEndProject=()=>{
    setShowProjectEndConfirm(true);
  }
  const EndProject=async()=>{
    const statusUpdateURL = process.env.REACT_APP_UPDATE_PROJECT_STATUS;
    const queryParam = {
      status: "completed"
    } 
    const response = await axios.put(`${statusUpdateURL}${id}`, null,{
      params: queryParam,
    })
    .then(res=>{
      setShowProjectEndConfirm(false);
      navigate("/Dashboard");
      // getTasksOfThisProject();
    })
    .catch(error => {
          console.log(error +" In task status")
      });
  }

  invokeProjectMenu();
  return (
    <div>
      <TopBar handleEndProject={handleEndProject} handleLogOut={handleLogOut} handleAddMembers={handleAddMembers} handleAddTask={handleAddTask} />
      {invokeGetTasks(true)}
      <KanbanBoardComponent id={id} />
     {!showAddTasks?<ModalComponent showModal={showFormsModal} popUpTitle="Add Members" popUpContent={<AddMemberComponent id={id}/>}handleCloseModal={handleCloseModal}/>
      :<ModalComponent showModal={showFormsModal} bottomButton={false} popUpTitle="Assign Task" popUpContent={<AddTask id={id} handleSubmit={handleCloseModal}/> }  handleCloseModal={handleCloseModal}/> }

      <ModalComponent showModal={showProjectEndConfirm} popUpTitle="Confirmation" popUpContent="Are you sure?" bottomButton={true} handleSubmit={EndProject} handleCloseModal={handleCloseModal}/>

    {/* <Modal show={showProjectEndConfirm} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>   */}
    
    
    </div>
  )
}

export default ProjectDetailsComponent