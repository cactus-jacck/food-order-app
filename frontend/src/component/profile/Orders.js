import React, { useEffect } from 'react'
import OrderCard from './OrderCard'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUsersOrder } from '../state/order/Action'

const Order = () => {
  const {auth, cart, order} = useSelector(store => store)
  console.log("order ", order.orders)  
  const navigate = useNavigate()
  const jwt = localStorage.getItem('jwt')
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUsersOrder(jwt))
  }, [auth.jwt])

  return (
    <div className='flex items-center flex-col'>
      <h1 className='text-xl text-center py-7 font-semibold'>My Orders</h1>
      <div className='space-y-5 w-full lg:w-1/2'>
        {
          order.orders.map((order) => order.items.map((item) => <OrderCard item={item} order={order}/>))
        }
      </div>
    </div>
  )
}

export default Order
