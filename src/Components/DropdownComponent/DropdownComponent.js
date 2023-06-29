import React, { useContext, useState } from 'react'
import { Dropdown } from 'react-bootstrap'
import { AuthContext } from '../../MyContext';

function DropdownComponent(props) {

    const [selectedOption, setSelectedOption] = useState('');

    const {invokeRoleChange} = useContext(AuthContext);


    const handleOptionChange = (eventKey) => {
        setSelectedOption(eventKey);
        invokeRoleChange(eventKey);
        //axios call to get all users of this role,
        //set a state to display the users
      };
  return (
    <Dropdown onSelect={handleOptionChange} className="w-250">
                <Dropdown.Toggle variant="dark" className="w-auto" id="dropdown-basic">
                    {selectedOption==''? props.dropdownDisplay:selectedOption}
                </Dropdown.Toggle>

                <Dropdown.Menu className='dropdown'>
                    <Dropdown.Item eventKey="Manager">MANAGER</Dropdown.Item>
                    <Dropdown.Item eventKey="UI/UX Designer">UI/UX DESIGNER</Dropdown.Item>
                    <Dropdown.Item eventKey="Developer">DEVELOPER</Dropdown.Item>
                    <Dropdown.Item eventKey="Devops">DEVOPS</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
  )
}

export default DropdownComponent