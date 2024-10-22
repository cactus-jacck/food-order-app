package com.aayush.food_order_app.requestDto;

import com.aayush.food_order_app.model.Category;
import com.aayush.food_order_app.model.IngredientItem;
import lombok.Data;

import java.util.List;

@Data
public class CreateFoodRequest
{
    private String name;

    private String description;

    private long price;

    private Category category;

    private List<String> images;

    private long restaurantId;

    private boolean isVegetarian;

    private boolean isSeasonal;

    private List<IngredientItem> ingredientItems;
}
