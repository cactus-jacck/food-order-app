import React, { useEffect } from 'react'
import OrderCard from './OrderCard'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUsersOrder } from '../state/order/Action'
import { Box, CircularProgress } from '@mui/material'

const Order = () => {
  const { auth, cart, order } = useSelector(store => store)
  console.log("order ", order)
  const navigate = useNavigate()
  const jwt = localStorage.getItem('jwt')
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUsersOrder(jwt))
  }, [auth.jwt])

  return (
    <div className='space-y-5 w-full lg:w-1/2'>
      {order?.loading ? (
        <Box className="flex justify-center items-center w-full h-40">
          <CircularProgress size={50} />
        </Box>
      ) : order?.orders?.length === 0 ? (
        <h1 className='text-xl text-center py-7 font-semibold'>No Orders</h1>
      ) : (
        order.orders.map((order) =>
          order.items.map((item) => <OrderCard key={item.id} item={item} order={order} />)
        )
      )}
    </div>
  )
}

export default Order
