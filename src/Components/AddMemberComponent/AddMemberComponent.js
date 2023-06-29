import React, { useContext, useState } from 'react'
import { Dropdown } from 'react-bootstrap'
import DropdownComponent from '../DropdownComponent/DropdownComponent'
import axios from 'axios';

function AddMemberComponent(props) {

    var base_URL = process.env.REACT_APP_GET_USERS_USING_ROLE;
    const [users,setUsers] = useState([]);
    const [showUsers,setShowUsers] = useState(false);
    const [selectedMembers,setSelectedMembers] = useState([]);
    
    const getUsersWithRole = async(role) => {
        try {
            const response = await axios.get(`${base_URL}${role}`)
            const usersArray = response.data;
            setShowUsers(true);
            console.log(usersArray.userDetails);
            setUsers(usersArray.userDetails);
          } catch (error) {
            console.log(error);
            return null;
          }
        //axios call to get all users of this role,
        //set a state to display the users
      };

      const handleNameClick = (userName)=>{
        if(selectedMembers.includes(userName))
        {
            const filteredArray = selectedMembers.filter((value) => value !== userName);
            setSelectedMembers(filteredArray);
        }
        else
        {
            setSelectedMembers([...selectedMembers, userName]);
        }
      };
    
      const handleAddToProject =()=>{
        const AddMembersURL = process.env.REACT_APP_ADD_MEMBERS_TO_PROJECT;
        const data={
            project_id:props.id,
            members:selectedMembers,        
        };
        axios.post(AddMembersURL,data).then((result)=>{   
            alert("added successfully");
          }).catch((error)=>{
            console.log(error);
          })
        
      };

  return (
    <div>
        <DropdownComponent dropdownDisplay="Choose Role" getUsersWithRole={getUsersWithRole}/>
        {users.map((item, index) =>(
            <p onClick={()=>handleNameClick(item.id)}>{item.userName}</p>
        ))}
        {selectedMembers.length? 
        <div>
            {selectedMembers}
            <button onClick={handleAddToProject}>Add to project</button>
        </div>
        :null}
    </div>
  )
}

export default AddMemberComponent