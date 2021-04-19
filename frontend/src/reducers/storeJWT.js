const setJWT = (state = null, action) => {
    switch(action.type){
        case "STORE_JWT":   
             return action.payload;
        case "CLEAR_DATA":
            return null;

        default:
            return state;
    }
}

export default setJWT;
