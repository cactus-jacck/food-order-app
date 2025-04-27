import axios from 'axios'

// export const API_URL = "http://localhost:8080"
// export const API_URL = "https://food-order-app-production-44a4.up.railway.app"
export const API_URL = "https://eatzyv2.onrender.com"

export const api = axios.create({
    baseURL:API_URL,
    headers:{
        "Content-Type":"application/json",
        
    }
})