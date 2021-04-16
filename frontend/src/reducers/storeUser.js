const INITIAL_USER = {
    userId: "", 
    firstName: "", 
    lastName: ""
}

const setUser = (state = INITIAL_USER, action) => {
    switch(action.type){
        case "STORE_DATA":   
             return action.payload;

        //ADD LOGOUT CASE TO CLEAR PAYLOAD

        default:
            return state;
    }
}

export default setUser;