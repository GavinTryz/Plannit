export const storeUser = data => {
    return{
        type: 'STORE_DATA',
        payload: data
    };
};

export const storeJWT = data => {
    return{
        type: 'STORE_JWT',
        payload: data
    };
};

export const logOut = () => {
    return{
        type: 'CLEAR_DATA',
    };
};

export const storeEventTable = data => {
    return{
        type: 'STORE_VIEW',
        payload: data
    };
};

export const storeViewSlot = data => {
    return{
        type: 'STORE_VIEW_SLOT',
        payload: data
    };
};

export const slotState = () => {
    return{
        type: 'HOVER_SLOT_STATE',
    };
};