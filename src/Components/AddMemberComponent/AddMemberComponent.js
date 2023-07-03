import React, { useContext, useState } from 'react'
import { Dropdown } from 'react-bootstrap'
import DropdownComponent from '../DropdownComponent/DropdownComponent'
import axios from 'axios';
import { AuthContext } from '../../MyContext';

function AddMemberComponent(props) {

    var base_URL = process.env.REACT_APP_GET_USERS_USING_ROLE;
    const [users,setUsers] = useState([]);
    const [showUsers,setShowUsers] = useState(false);
    const [selectedMembers,setSelectedMembers] = useState([]);
    const [projetId,setprojectId] = useState('');
    const {setShowFormsModal,role} = useContext(AuthContext);

    
    const getUsersWithRole = async(role) => {
        try {
            const response = await axios.get(`${base_URL}${role}&&project_id=${props.id}`)
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
            setShowFormsModal(false);
          }).catch((error)=>{
            console.log(error);
          })
        
      };

      const roleCheck =()=>{
        if(role!=null)
        {
            if(users.length)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        else 
        {
            return true;
        }
      }

  return (
    <div>
        <DropdownComponent showManagerRole='false' dropdownDisplay="Choose Role" getUsersWithRole={getUsersWithRole}/>
        {roleCheck()?users.map((item, index) =>(
            <p onClick={()=>handleNameClick(item.id)}>{item.userName}</p>
        )):`No Users left in the selected ${role} role`}

            
            
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