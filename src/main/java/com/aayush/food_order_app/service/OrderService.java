package com.aayush.food_order_app.service;


import com.aayush.food_order_app.model.Order;
import com.aayush.food_order_app.model.User;
import com.aayush.food_order_app.requestDto.CreateOrderRequestDto;

import java.util.List;

public interface OrderService
{
    public Order createOrder(CreateOrderRequestDto req, User user) throws Exception;

    public Order updateOrder(long orderId, String orderStatus) throws Exception;

    public void cancelOrder(long orderId) throws Exception;

    public List<Order> getUsersOrder(long userId);

    public List<Order> getRestaurantsOrder(long restaurantId, String orderStatus) throws Exception;

    public Order findOrderById(long orderId) throws Exception;
}
