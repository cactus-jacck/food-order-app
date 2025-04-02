import {
    ADD_TO_FAVORITE_REQUEST, ADD_TO_FAVORITE_SUCCESS, GET_USER_REQUEST, LOGIN_REQUEST, LOGIN_SUCCESS, REGISTER_REQUEST,
    REGISTER_SUCCESS, REGISTER_FAILURE, LOGIN_FAILURE, GET_USER_FAILURE, ADD_TO_FAVORITE_FAILURE, GET_USER_SUCCESS, LOGOUT,
    CREATE_ADDRESS_REQUEST,
    CREATE_ADDRESS_SUCCESS,
    CREATE_ADDRESS_FAILURE
}
    from "./ActionTypes.js";
import { isPresentInFavorites } from "../../config/login";

const initialState = {
    user: null,
    isLoading: false,
    error: null,
    jwt: null,
    favorites: [],
    success: null
}
export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_REQUEST:
        case LOGIN_REQUEST:
        case GET_USER_REQUEST:
        case ADD_TO_FAVORITE_REQUEST:
        case CREATE_ADDRESS_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null,
                success: null
            };
        case LOGOUT:
            return initialState;
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                jwt: action.payload,
                success: "Register Success"
            };
        case GET_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                user: action.payload,
                favorites: action.payload.favourites
            };

        case ADD_TO_FAVORITE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                favorites: isPresentInFavorites(state.favorites, action.payload) ?
                    state.favorites.filter((item) => item.id !== action.payload.id) :
                    [action.payload, ...state.favorites]
            }
        case CREATE_ADDRESS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                user: {
                    ...state.user,
                    addresses: [...state.user.addresses, action.payload] // Add new address
                },
                success: "Address added successfully",
                error: null
            };
        case REGISTER_FAILURE:
        case LOGIN_FAILURE:
        case GET_USER_FAILURE:
        case ADD_TO_FAVORITE_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
                success: null
            };
        case CREATE_ADDRESS_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
                success: null
            };

        default:
            return state;
    }
}
