import { useReducer, useState } from "react";
import AuthContext from "./authContext"
import { reducer, initialstate } from "../../components/reducer/UseReducer";

const AuthState = (props)=>{

    const [state, dispatch] = useReducer(reducer, initialstate); 

    return (
        // passing the state globally to children, with reducer no need to maintain different states 
        <AuthContext.Provider value={{state, dispatch}}>   
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState