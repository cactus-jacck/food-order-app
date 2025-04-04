import { api, API_URL } from "../../config/Api"
import { LOGIN_REQUEST, REGISTER_REQUEST, REGISTER_SUCCESS, LOGIN_SUCCESS, GET_USER_REQUEST, ADD_TO_FAVORITE_REQUEST, ADD_TO_FAVORITE_SUCCESS, LOGOUT, REGISTER_FAILURE, LOGIN_FAILURE, GET_USER_FAILURE, ADD_TO_FAVORITE_FAILURE, GET_USER_SUCCESS, CREATE_ADDRESS_REQUEST, CREATE_ADDRESS_SUCCESS, CREATE_ADDRESS_FAILURE } from "./ActionTypes"
import axios from "axios"

export const registerUser = (reqData) => async(dispatch)=>{
    dispatch({type:REGISTER_REQUEST})
    try{
        const {data} = await axios.post(`${API_URL}/auth/signup`, reqData.userData)
        console.log(data)
        if(data.jwt) localStorage.setItem("jwt", data.jwt)
        if(data.role==="ROLE_RESTAURANT_OWNER")
        {
            reqData.navigate("/admin/restaurant")
        }
        else
        {
            reqData.navigate("/")
        }
        dispatch({type:REGISTER_SUCCESS, payload:data.jwt})
        console.log("register success", data)
    } catch (error) {
        dispatch({type: REGISTER_FAILURE, payload:error})
        console.log("error: ", error)
    }
}

export const loginUser = (reqData) => async(dispatch)=>{
    dispatch({type:LOGIN_REQUEST})
    try{
        const {data} = await axios.post(`${API_URL}/auth/signin`, reqData.userData)
        if(data.jwt) localStorage.setItem("jwt", data.jwt)
        if(data.role==="ROLE_RESTAURANT_OWNER")
        {
            reqData.navigate("/")
        }
        else{
            reqData.navigate("/")
        }
        dispatch({type:LOGIN_SUCCESS, payload:data.jwt})
    } catch (error) {
        dispatch({type: LOGIN_FAILURE, payload:error})
        console.log("error: ", error)
    }
}

export const getUser = (jwt) => async(dispatch)=>{
    dispatch({type:GET_USER_REQUEST})
    try{
        const {data} = await api.get(`/api/users/profile`, {
            headers:{
                Authorization:`Bearer ${jwt}`
            }
        })
        dispatch({type:GET_USER_SUCCESS, payload:data})
    } catch (error) {
        localStorage.clear("jwt")
        dispatch({type:GET_USER_FAILURE, payload:error})
        console.log("error: ", error)
    }
}

export const addToFavorites = ({jwt, restaurantId}) => async(dispatch)=>{
    dispatch({type:ADD_TO_FAVORITE_REQUEST})
    try{
        const {data} = await api.put(`/api/restaurants/${restaurantId}/add-favourites`, {}, {
            headers:{
                Authorization:`Bearer ${jwt}`
            }
        })
        dispatch({type:ADD_TO_FAVORITE_SUCCESS, payload:data})
    } catch (error) {
        dispatch({type:ADD_TO_FAVORITE_FAILURE, payload:error})
        console.log("error: ", error)
    }
}

export const createAddress = (reqData) => async(dispatch)=>{
    dispatch({type:CREATE_ADDRESS_REQUEST})
    try{
        const {data} = await api.post(`/api/users/address`, reqData.address, {
            headers:{
                Authorization:`Bearer ${reqData.jwt}`
            }
        })
        dispatch({type:CREATE_ADDRESS_SUCCESS, payload:data})
        reqData.navigate("/")
    } catch (error) {
        dispatch({type:CREATE_ADDRESS_FAILURE, payload:error})
        console.log("error: ", error)
    }
}

export const logout = () => async(dispatch)=>{
    try{
        localStorage.clear()
        dispatch({type:LOGOUT})
        console.log("logout success")
    } catch (error) {
        console.log("error: ", error)
    }
}