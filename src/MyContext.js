
import { useEffect, useState } from "react";
import { createContext } from "react";
import {getUserDetails} from './myMethods';

export const AuthContext = createContext();

export const GlobalAuthStateProvider = ({children}) => {
    const [isSignedIn,setIsSignedIn] = useState(false);
    const [loggedInUser,setLoggedInUser] = useState();
    const [invokeProjects,setInvokeProjects] = useState(false);
    const [showFormsModal,setShowFormsModal] = useState(false);
    const [role,setRole] = useState(null);
    const [selectedOption, setSelectedOption] = useState('');
    const [getTasks,setGetTasks] = useState(true);
    const [projectProgress, setProjectProgress] = useState();
    const [showAddTasks,setShowAddTasks] = useState(false);
    const [getPieChartDetails,setGetPieChartDetails] = useState(true);
    const [showEndProject, setShowEndProject] = useState(false);
    const [isGetImages,setIsGetImages] = useState(true);

    const [showDashBoardMenu,setShowDashBoardMenu] = useState(false);
    const [showProjectsMenu,setShowProjectsMenu] = useState(false);

    const getUserDataIfExists = async () => {
            const user = await getUserDetails();
            if(user != null){
                setLoggedInUser(user);
                setIsSignedIn(true);
            }
    }
    const InvokeProjectsToggle = ()=>{
        setInvokeProjects(!invokeProjects);
    }
    const invokeStateUpdate = (value) => {
        setIsSignedIn(value);
    }
    
    const invokeRoleChange=(value)=>{
        setRole(value);
    }
    const invokeDashboardMenu=()=>{
        setShowProjectsMenu(false);
        setShowDashBoardMenu(true);
    }
    const invokeProjectMenu=()=>{
        setShowDashBoardMenu(false);
        setShowProjectsMenu(true);
    }
    const invokeGetTasks=(value)=>{
        setGetTasks(value);
    }
    const invokeShowAddTask=(value)=>{
        setShowAddTasks(value);
    }
    const invokeGetPieChartDetails =(value)=>{
        setGetPieChartDetails(value);
    }
    
    useEffect(()=>{
        // console.log("in effexr");
        getUserDataIfExists();
    },[isSignedIn]);


    const globalStateContext = {
        loggedInUser,
        isSignedIn,
        invokeStateUpdate,
        setShowFormsModal,
        showFormsModal,
        invokeProjects,
        InvokeProjectsToggle,
        invokeRoleChange,
        invokeDashboardMenu,
        invokeProjectMenu,
        invokeShowAddTask,
        role,
        showDashBoardMenu,
        showProjectsMenu,
        getTasks,
        invokeGetTasks,
        setProjectProgress,
        projectProgress,
        showAddTasks,
        getPieChartDetails,
        invokeGetPieChartDetails,
        showEndProject,
        setShowEndProject,
        isGetImages,
        setIsGetImages,
        setShowDashBoardMenu,
    }

    return (
        <AuthContext.Provider value={globalStateContext}>
            {children}
        </AuthContext.Provider>
    )


}