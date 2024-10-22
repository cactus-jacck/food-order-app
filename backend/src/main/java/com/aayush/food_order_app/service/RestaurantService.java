package com.aayush.food_order_app.service;

import com.aayush.food_order_app.model.Restaurant;
import com.aayush.food_order_app.model.RestaurantDTO;
import com.aayush.food_order_app.model.User;
import com.aayush.food_order_app.requestDto.CreateRestaurantRequestDto;

import java.util.List;

public interface RestaurantService
{
    public Restaurant createRestaurant(CreateRestaurantRequestDto restaurantRequestDto, User user);

    public Restaurant updateRestaurant(Long restaurantId, CreateRestaurantRequestDto updatedRestaurant) throws Exception;

    public void deleteRestaurant(Long restaurantId) throws Exception;

    public List<Restaurant> getAllRestaurants();

    public List<Restaurant> searchRestaurant(String keyword);

    public Restaurant findRestaurantById(long id) throws Exception;

    public Restaurant getRestaurantByUserId(long id) throws Exception;

    public RestaurantDTO addToFavourites(long restaurntId, User user) throws Exception;

    public Restaurant updateRestaurantStatus(long id) throws Exception;
}
