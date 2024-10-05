package com.aayush.food_order_app.service;

import com.aayush.food_order_app.model.User;

public interface UserService
{
    public User findUserByJwtToken(String jwt) throws Exception;

    public User findUserByEmail(String email) throws Exception;
}
