import React, { useContext, useState } from 'react'
import { Button, Dropdown } from 'react-bootstrap'
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
      const [isSelected, setIsSelected] = React.useState(false);

      const handleImageClick = (user_id) => {
        setIsSelected(!isSelected);
        handleNameClick(user_id);
      };

  return (
    <div>
        <DropdownComponent showManagerRole='false' dropdownDisplay="Choose Role" getUsersWithRole={getUsersWithRole}/>
        {roleCheck()?users.map((item, index) =>(
           <div className='m-1'style={{ display: 'inline-block' }}>
           <img
             src={item.imgUrl}
             alt={item.name}
             style={{
               width: '50px',
               cursor: 'pointer', 
               border: selectedMembers.includes(item.id) ? '2px solid green' : 'none', 
               borderRadius: '50%', 
             }}
             
             onClick={()=>{handleImageClick(item.id)}}
           />
           <h5>{item.userName}</h5>
         </div>
     
            
        )):`No Users left in the selected ${role} role`}

            
            
        {selectedMembers.length? 
            <div className='mt-5'>
            <Button
                variant="primary"
                onClick={handleAddToProject}
                style={{ backgroundColor: '#9f5298',width:"200px" }}
                >
                Add to project
                </Button>      
            </div>
        :null}
    </div>
  )
}

export default AddMemberComponent