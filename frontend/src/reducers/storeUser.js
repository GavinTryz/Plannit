const INITIAL_USER = {
    userId: '', 
    firstName: '', 
    lastName: ''
}

const setUser = (state = INITIAL_USER, action) => {
    switch(action.type){
        case "STORE":   
             return action.payload;

        //ADD LOGOUT CASE

        default:
            return INITIAL_USER;
    }
}

export default setUser;