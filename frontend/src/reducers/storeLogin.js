const storeLogin = (state = false, action) => {
    switch(action.type){
        case "STORE_LOGIN":   
             return action.payload;

        case "CLEAR_DATA":
            return false;

        default:
            return state;
    }
}

export default storeLogin;