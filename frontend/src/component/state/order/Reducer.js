import { 
    GET_USERS_ORDERS_REQUEST, 
    GET_USERS_ORDERS_SUCCESS, 
    GET_USERS_ORDERS_FAILURE, 
    GET_USERS_NOTIFICATION_SUCCESS,
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAILURE
} from "./ActionType";

const initialState = {
    loading: false,
    orders: [],
    notifications: [],
    error: null
};

export const orderReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_USERS_ORDERS_REQUEST:
        case CREATE_ORDER_REQUEST:
            return { ...state, error: null, loading: true };

        case GET_USERS_ORDERS_SUCCESS:
            return { ...state, error: null, loading: false, orders: payload };
        
        case CREATE_ORDER_SUCCESS:
            return { ...state, error: null, loading: false, orders: [...state.orders, payload] };
        
        case GET_USERS_ORDERS_FAILURE:
        case CREATE_ORDER_FAILURE:
            return { ...state, error: payload, loading: false };

        case GET_USERS_NOTIFICATION_SUCCESS:
            return { ...state, notifications: payload };
        
        default:
            return state;
    }
};
export default orderReducer;