
import { useEffect, useState } from "react";
import { createContext } from "react";
import {getUserDetails} from './myMethods';

export const AuthContext = createContext();

export const GlobalAuthStateProvider = ({children}) => {
    const [isSignedIn,setIsSignedIn] = useState(false);
    const [loggedInUser,setLoggedInUser] = useState();

    const getUserDataIfExists = async () => {
            const user = await getUserDetails();
            if(user != null){
                setLoggedInUser(user);
                setIsSignedIn(true);
            }
    }

    const invokeStateUpdate = (value) => {
        setIsSignedIn(value);
    }
    useEffect(()=>{
        // console.log("in effexr");
        getUserDataIfExists();
    },[isSignedIn]);

    const globalStateContext = {
        loggedInUser,
        isSignedIn,
        invokeStateUpdate
    }

    return (
        <AuthContext.Provider value={globalStateContext}>
            {children}
        </AuthContext.Provider>
    )


}