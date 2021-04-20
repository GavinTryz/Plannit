const INITIAL_USER = {
    userId: "", 
    firstName: "", 
    lastName: ""
}

const setUser = (state = INITIAL_USER, action) => {
    switch(action.type){
        case "STORE_DATA":   
             return action.payload;

        case "CLEAR_DATA":
            return INITIAL_USER;

        default:
            return state;
    }
}

export default setUser;