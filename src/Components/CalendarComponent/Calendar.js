import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../MyContext';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  DayView,
  Appointments,
} from '@devexpress/dx-react-scheduler-material-ui';
import { Paper } from '@mui/material';
import TopBar from '../TopBarComponent/TopBar';
import { useNavigate } from 'react-router-dom';

function Calendar() {

    const {loggedInUser,getTasks,invokeStateUpdate,invokeDashboardMenu,setShowDashBoardMenu} = useContext(AuthContext);


const getTasksForTheDay = async()=>{
    invokeDashboardMenu(true);
    const base_URL = process.env.REACT_APP_GET_TASKS_FOR_THE_DAY;
    
    try {
        console.log(`${base_URL}${loggedInUser?.id}`);
        const response = await axios.get(`${base_URL}${loggedInUser?.id}`)
          let tasks = response.data;
          console.log("in CALENDAR");
          console.log(tasks);
          
          tasks.map((task)=>{
            console.log(task);
            const obj = {id:task.task_id ,title:task.task_title,startDate:task.deadline}
            console.log(obj);
            if(!appointments.some(temp=>temp.id === obj.id))
            {  
                console.log("in if "+obj.id);
                setAppointments((prev)=>[
                    ...prev,
                    obj
                ])
            }
          })

          
        } 
        catch (error) {
          console.log(error);
          return null;
        }
    }

useEffect(()=>{
    setShowDashBoardMenu(false);
     getTasksForTheDay();
},[loggedInUser,getTasks])


const schedulerData = [
    { startDate: new Date(), endDate: '2018-11-01T11:00', title: 'Meeting' },
    { startDate: new Date(), endDate: '2018-11-01T13:30', title: 'Go to a gym' },
  ];
  
  const [appointments,setAppointments] = useState([
 
]);


    const [date,setDate] = useState(new Date());
    const navigate = useNavigate();
    const handleLogOut =()=>{
        localStorage.removeItem('accessToken');
        invokeStateUpdate(false);    
        navigate("/Login");
      }
      
    return (
        <div>

<TopBar fromCalendar={true} handleLogOut={handleLogOut}  />
      <Paper>
        <Scheduler
        data={appointments}
    >
      <ViewState

        currentDate= {date}
      />
      <DayView

startDayHour={9}
        endDayHour={24}
      />
      <Appointments />

    </Scheduler>
    </Paper>
</div>
  )
}

export default Calendar