import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../MyContext';

function AddTask(props) {

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        file: null,
        deadline: '',
        startDate: '',
        endDate: '',
        status: '',
        weightage: 0,
      });
      const navigate = useNavigate();
      const[members,setMembers] = useState([]);
    const [selectedOption,setSelectedOption] = useState('Assign To');
    const [getMembers,setGetMembers] = useState(true);
    const [userId,setUserId] = useState();

    const {invokeGetTasks} = useContext(AuthContext);

      const handleOptionChange =(eventKey)=>{

        const Name = members
        .filter(item => item.id === eventKey)
         .map(item => item.userName);
        setUserId(eventKey);
        setSelectedOption(Name);
      }

      const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleFileChange = (event) => {
        const file = event.target.files[0];
        setFormData({ ...formData, file });
      };
    
      const handleSubmit = (event) => {
        event.preventDefault();
        const AddTaskURL = process.env.REACT_APP_ADD_TASK;
        const data={
            title:formData.title,
            description:formData.description,
            deadline:formData.deadline,
            weightage:formData.weightage,
            user_id : userId,
            project_id: props.id  
      };
        axios.post(AddTaskURL,data).then((result)=>{   
            invokeGetTasks(true);
        navigate('/ProjectDetails',{state:{id:props.id ,title:props.title,description:props.description,}});

              }).catch((error)=>{
                    console.log("NAANTHANDA "+error);
                  })
                  props.handleSubmit();
              console.log(AddTaskURL);
        
      };

      
      const getUsersOfThisProject =async()=>{
        const base_URL = process.env.REACT_APP_GET_USERS_FROM_PROJECT;  
        try {
          const response = await axios.get(`${base_URL}${props.id}`)
          setMembers(response.data);
          console.log("in task success");
          console.log(members);
          setGetMembers(false);

        } 
        catch (error) {
          console.log(error);
          return null;
        } 
      }

      useEffect(() => {
        getUsersOfThisProject();
      },[getMembers]);

  return (
    <form>
      <div>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
        />
      </div>
      {/* <div>
        <label>File:</label>
        <input
          type="file"
          name="file"
          onChange={handleFileChange}
        />
      </div> */}
      <div>
        <label>Deadline:</label>
        <input
          type="datetime-local"
          name="deadline"
          value={formData.deadline}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Weightage:</label>
        <input
          type="number"
          name="weightage"
          value={formData.weightage}
          min={1}
          max={10}
          onChange={handleInputChange}
          />
      </div>
          <div>
            {props.id}
            <label>Assign To:</label>
            <Dropdown onSelect={handleOptionChange} className="w-250">
                <Dropdown.Toggle variant="dark" className="w-auto" id="dropdown-basic">
                   {selectedOption}
                </Dropdown.Toggle>

                <Dropdown.Menu className='dropdown'>
                {members.length?members.map(item => (
                    <Dropdown.Item key={item.id} eventKey={item.id}>
                        {item.userName.toString()}
                    </Dropdown.Item>
                )):"No members in this project"}
                {/* <Dropdown.Item eventKey="Developer">DEVELOPER</Dropdown.Item> */}
                   
                </Dropdown.Menu>
            </Dropdown>
          </div>

      <button onClick={handleSubmit}>Submit</button>
    </form>
  )
}

export default AddTask