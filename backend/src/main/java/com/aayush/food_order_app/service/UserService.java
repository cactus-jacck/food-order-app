package com.aayush.food_order_app.service;

import com.aayush.food_order_app.model.Address;
import com.aayush.food_order_app.model.User;
import com.aayush.food_order_app.requestDto.AddressRequestDto;

public interface UserService
{
    public User findUserByJwtToken(String jwt) throws Exception;

    public User findUserByEmail(String email) throws Exception;

    Address updateAddress(String jwt, AddressRequestDto addressReqDto) throws Exception;

    public Address createAddress(User user, AddressRequestDto addressRequestDto);

    public String deleteAddress(User user, Long addressId);
}
