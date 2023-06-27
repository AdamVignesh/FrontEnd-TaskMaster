import React, { useContext, useState } from 'react'
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../MyContext';
import axios from 'axios';

function FormComponent() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const {loggedInUser,isSignedIn,invokeStateUpdate} = useContext(AuthContext);

    // Handle form submission
    // process.env.REACT_APP_BASE_URL;
    const base_URL = process.env.REACT_APP_PROJECT_BASE_URL;
    const handleSubmit = (e) => {
        e.preventDefault();
        const data={
            Project_Title:title,
            Project_Description:description,
            Deadline:deadline,
            User_Id: loggedInUser.id    
        };
        axios.post(base_URL,data).then((result)=>{   
            // alert(result.data);            
            // setShowModal(true);
            // setPopUpTitle('Success')
            // setPopUpContent('Successfully Logged In');
            // invokeStateUpdate(true);
            alert(result.data);
            alert("added project");
            // Navigate("/Dashboard");
        }).catch((error)=>{
            alert(error);
            console.log(error);
            // setShowModal(true);
            // setPopUpTitle('Error')
        })

  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Project Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="deadline">Deadline:</label>
        <input
          type="date"
          id="deadline"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  )
}

export default FormComponent