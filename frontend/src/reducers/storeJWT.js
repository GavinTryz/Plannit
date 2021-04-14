const setJWT = (state = null, action) => {
    switch(action.type){
        case "STORE_JWT":   
             return action.payload;

        //ADD LOGOUT CASE TO CLEAR PAYLOAD

        default:
            return state;
    }
}

export default setJWT;
