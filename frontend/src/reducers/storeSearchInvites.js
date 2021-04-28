const storeSearchInvites = (state = null, action) => {
    switch(action.type){
        case "ADD_SEARCH_INVITES":   
            return action.payload;

        case "CLEAR_DATA":
            return null;

        default:
            return state;
    }
}

export default storeSearchInvites;