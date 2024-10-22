package com.aayush.food_order_app.requestDto;

import lombok.Data;

@Data
public class IngredientRequest
{
    private String name;

    private long ingredientCategoryId;

    private long restaurantId;
}
