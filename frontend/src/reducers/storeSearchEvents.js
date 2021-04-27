const INITIAL_SEARCH = {
    arr : []
}

const storeSearchEvents = (state = INITIAL_SEARCH, action) => {
    switch(action.type){
        case "STORE_SEARCH_EVENTS":   
            return {
                ...state,
                arr: [ ...state.arr, action.payload.newItem ]
            }

        case "CLEAR_DATA":
            return INITIAL_SEARCH;

        default:
            return state;
    }
}

export default storeSearchEvents;