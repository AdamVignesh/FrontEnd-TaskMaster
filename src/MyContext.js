
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
        role,
    }

    return (
        <AuthContext.Provider value={globalStateContext}>
            {children}
        </AuthContext.Provider>
    )


}