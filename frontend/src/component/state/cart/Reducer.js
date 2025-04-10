import {
    FIND_CART_REQUEST, FIND_CART_FAILURE, FIND_CART_SUCCESS,
    GET_ALL_CART_ITEMS_REQUEST, GET_ALL_CART_ITEMS_FAILURE, GET_ALL_CART_ITEMS_SUCCESS,
    REMOVE_CART_ITEM_REQUEST, REMOVE_CART_ITEM_FAILURE, REMOVE_CART_ITEM_SUCCESS,
    UPDATE_CART_ITEM_REQUEST, UPDATE_CART_ITEM_FAILURE, UPDATE_CART_ITEM_SUCCESS,
    CLEAR_CART_SUCCESS,
    ADD_ITEM_TO_CART_REQUEST,
    ADD_ITEM_TO_CART_SUCCESS,
    ADD_ITEM_TO_CART_FAILURE


} from "./ActionTypes"

import { LOGOUT } from "../authentication/ActionTypes"

const initialState = {
    cart: null,
    cartItems: [],
    loading: false,
    error: null,
}

const cartReducer = (state = initialState, action) => {

    const total = action.payload?.total;

    switch (action.type) {
        case FIND_CART_REQUEST:
        case GET_ALL_CART_ITEMS_REQUEST:
        case UPDATE_CART_ITEM_REQUEST:
        case REMOVE_CART_ITEM_REQUEST:
        case ADD_ITEM_TO_CART_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            }
        case FIND_CART_SUCCESS:
        case CLEAR_CART_SUCCESS:
            return {
                ...state,
                loading: false,
                cart: action.payload,
                cartItems: action.payload.items
            }
        case ADD_ITEM_TO_CART_SUCCESS:
            return {
                ...state,
                loading: false,
                cartItems: [action.payload, ...state.cartItems || []]
            }
        case UPDATE_CART_ITEM_SUCCESS:
            return {
                ...state,
                loading: false,
                cartItems: state.cartItems.map((item) =>
                    item.id === action.payload.id ? action.payload : item),
                cart: { ...state.cart, total: total }
            }
        case REMOVE_CART_ITEM_SUCCESS:
            return {
                ...state,
                loading: false,
                cartItems: state.cartItems.filter((item) =>
                    item.id !== action.payload)
            }
        case FIND_CART_FAILURE:
        case UPDATE_CART_ITEM_FAILURE:
        case REMOVE_CART_ITEM_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case LOGOUT:
            localStorage.removeItem("jwt")
            return { ...state, cartItems: [], cart: null, success: "logout success" }
        default:
            return state
    }
}

export default cartReducer