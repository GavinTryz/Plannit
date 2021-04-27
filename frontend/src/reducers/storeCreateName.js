const storeCreateName = (state = null, action) => {
    switch(action.type){
        case "STORE_CREATE_NAME":   
             return action.payload;

        case "CLEAR_DATA":
            return null;

        default:
            return state;
    }
}

export default storeCreateName;