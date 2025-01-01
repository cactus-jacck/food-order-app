import axios from "axios";

import {
    GET_RESTAURANTS_ORDER_FAILURE,
    GET_RESTAURANTS_ORDER_REQUEST,
    GET_RESTAURANTS_ORDER_SUCCESS,
    UPDATE_ORDER_FAILURE,
    UPDATE_RESTAURANTS_ORDER_REQUEST,
} from "./ActionType"

import { api } from "../../config/Api"

export const updateOrderStatus = ({orderId, orderStatus, jwt}) => {
    return async (dispatch) => {
        try {
            dispatch({type: UPDATE_ORDER_REQUEST})

            const response = await api.put(`/api/admin/orders/${orderId}/${orderStatus}`, {}, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            }

            )

            const updatedOrder = response.data;

            console.log("updated order ", updatedOrder)

            dispatch({
                type: UPDATE_ORDER_SUCCESS,
                payload: updatedOrder,
            })
            
        } catch (error) {
            console.log("catch error ", error)
            dispatch({ type: UPDATE_ORDER_FAILURE})
        }
    }
}

export const fetchRestaurantsOrder = ({restaurantId, orderStatus, jwt}) => {
    return async (dispatch) => {
        try {
            dispatch({type: GET_RESTAURANTS_ORDER_REQUEST})

            const {data} = await api.get(
                `/api/admin/order/restaurant/${restaurantId}`, {
                    params: {order_status:orderStatus},
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    }
                }
            )

            const orders = data
            console.log("restaurants order ---- ", orders)
            dispatch({
                type: GET_RESTAURANTS_ORDER_SUCCESS, 
                payload: orders
            })
        } catch (error) {
            dispatch({type:GET_RESTAURANTS_ORDER_FAILURE, error})
        }
    }
}