package com.aayush.food_order_app.service;

import com.aayush.food_order_app.model.Category;
import com.aayush.food_order_app.model.Food;
import com.aayush.food_order_app.model.Restaurant;
import com.aayush.food_order_app.requestDto.CreateFoodRequest;

import java.util.List;

public interface FoodService
{
    public Food createFood(CreateFoodRequest req, Category category, Restaurant restaurant);

    public void deleteFood(long foodId) throws Exception;

    public List<Food> getRestaurantsFood(long restaurantId, boolean isVegetarian, boolean isNonveg, boolean isSeasonal, String foodCategory);

    public List<Food> searchFood(String keyword);

    public Food findFoodById(long foodId) throws Exception;

    public Food updateFoodAvailibility(long foodId) throws Exception;


    public List<Food> getAllFood();
}
