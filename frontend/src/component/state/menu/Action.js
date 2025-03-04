import { type } from "@testing-library/user-event/dist/type/index.js"
import { api } from "../../config/Api"

import {
    CREATE_MENU_ITEM_FAILURE,
    CREATE_MENU_ITEM_REQUEST,
    CREATE_MENU_ITEM_SUCCESS,

    DELETE_MENU_ITEM_FAILURE,
    DELETE_MENU_ITEM_REQUEST,
    DELETE_MENU_ITEM_SUCCESS,

    GET_MENU_ITEMS_BY_RESTAURANT_ID_FAILURE,
    GET_MENU_ITEMS_BY_RESTAURANT_ID_REQUEST,
    GET_MENU_ITEMS_BY_RESTAURANT_ID_SUCCESS,

    SEARCH_MENU_ITEM_FAILURE,
    SEARCH_MENU_ITEM_REQUEST,
    SEARCH_MENU_ITEM_SUCCESS,

    UPDATE_MENU_ITEMS_AVAILABILITY_FAILURE,
    UPDATE_MENU_ITEMS_AVAILABILITY_REQUEST,
    UPDATE_MENU_ITEMS_AVAILABILITY_SUCCESS,

    GET_ALL_MENU_ITEMS_REQUEST,
    GET_ALL_MENU_ITEMS_SUCCESS,
    GET_ALL_MENU_ITEMS_FAILURE,
} from "./ActionType.js"

export const getAllMenuItems = (jwt) => {
    return async (dispatch) => {
        dispatch({type: GET_ALL_MENU_ITEMS_REQUEST})
        try{
            const {data} = await api.get("/api/food", {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            })
            dispatch({type: GET_ALL_MENU_ITEMS_SUCCESS, payload: data})
        } catch (error) {
            dispatch({type: GET_ALL_MENU_ITEMS_FAILURE, payload: error})
        }
    }
}

export const createMenuItem = ({menu, jwt}) => {
    return async (dispatch) => {
        dispatch({type: CREATE_MENU_ITEM_REQUEST})
        try {
            const { data } = await api.post("api/admin/food", menu,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`
                    }
                });
                console.log("created menu ", data)
                dispatch({type: CREATE_MENU_ITEM_SUCCESS, payload: data})
        } catch (error) {
            console.log("catch error ", error)
            dispatch({type: CREATE_MENU_ITEM_FAILURE, payload: error})
        }
    }
}

export const getMenUItemsByRestaurantId = (reqData) => {
    return async (dispatch) => {
        dispatch({type: GET_MENU_ITEMS_BY_RESTAURANT_ID_REQUEST})
        try{
            const {data} = await api.get(
                `/api/food/restaurant/${reqData.restaurantId}?isVegetarian=${reqData.
                    vegetarian}&isNonvegetarian=${reqData.nonveg}
                    &isSeasonal=${reqData.seasonal}&foodCategory=${reqData.foodCategory}`,
                    {
                        headers:{
                            Authorization: `Bearer ${reqData.jwt}`
                        },
                    }
            )
            dispatch({type: GET_MENU_ITEMS_BY_RESTAURANT_ID_SUCCESS, payload:data})
        } catch (error) {
            dispatch({type: GET_MENU_ITEMS_BY_RESTAURANT_ID_FAILURE, payload:error})
        }
    }
}

export const searchMenuItem = ({keyword, jwt}) => {
    return async (dispatch) => {
        dispatch({type: SEARCH_MENU_ITEM_REQUEST})
        try{
            const {data} = await api.get(`api/food/search?name=${keyword}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            })
            console.log("data ------",)
            dispatch({type: SEARCH_MENU_ITEM_SUCCESS, payload: data})
        }
     catch (error) {
        dispatch({type: SEARCH_MENU_ITEM_FAILURE, payload:error})
        }
    }
}

export const updateMenuItemsAvailability = (jwt, foodId) => {
    return async (dispatch) => {
        dispatch({type: UPDATE_MENU_ITEMS_AVAILABILITY_REQUEST})
        try{
            const {data}  = await api.put(
                `/api/admin/food/${foodId}`,
                {},
                {
                    headers:{
                        Authorization: `Bearer ${jwt}`,
                    }
                }
            )
            console.log("update menuItems Availability", data)
            dispatch({type: UPDATE_MENU_ITEMS_AVAILABILITY_SUCCESS, payload: data})
        }
        catch (error) {
            console.log("error", error)
            dispatch({
                type: UPDATE_MENU_ITEMS_AVAILABILITY_FAILURE, payload: error
            })
        }
    } 
}

export const deleteFoodAction = ({foodId, jwt}) => 
    async (dispatch) => {
        dispatch({type: DELETE_MENU_ITEM_REQUEST})
        try{
            const { data } = await api.delete(`/api/admin/food/${foodId}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            })
            console.log("delete food", data)
            dispatch({type: DELETE_MENU_ITEM_SUCCESS, payload: foodId})
        }
        catch (error)
        {
            dispatch({type: DELETE_MENU_ITEM_FAILURE, payload: error})
        }
    }