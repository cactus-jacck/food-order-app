package com.aayush.food_order_app.requestDto;

import lombok.Data;

@Data
public class IngredientCategoryRequest
{
    private String name;

    private long restaurantId;
}
