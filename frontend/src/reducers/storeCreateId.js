const storeCreateId = (state = null, action) => {
    switch(action.type){
        case "STORE_CREATE_ID":   
             return action.payload;

        case "CLEAR_DATA":
            return null;

        default:
            return state;
    }
}

export default storeCreateId;