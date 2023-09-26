
export const storedUser = localStorage.getItem("session");

export const initialstate = (storedUser)? JSON.parse(storedUser) : null;

export const reducer = (state, action)=>{ //must be a pure function. Returns same value for same agruments always
    // console.log(state, action);
    if(action.type==="USER"){                       //Here we test the type and payload we provided for a particular state and perform 
        localStorage.setItem("session", JSON.stringify(action.payload));
        return action.payload;                     // suitable operation for it 
    }
    if(action.type==="DRIVES") 
        return action.payload;
    if(action.type==="PROFILE")
        return action.payload;
    return state;
}