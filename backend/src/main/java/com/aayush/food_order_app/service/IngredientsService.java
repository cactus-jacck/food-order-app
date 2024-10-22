package com.aayush.food_order_app.service;

import com.aayush.food_order_app.model.IngredientCategory;
import com.aayush.food_order_app.model.IngredientItem;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface IngredientsService
{
    public IngredientCategory createIngredientCategory (String name, long restaurantId) throws Exception;

    public IngredientCategory findIngredientCategoryById(long id) throws Exception;

    public List<IngredientCategory> findIngredientCategoryByRestaurantId(long id) throws Exception;

    public List<IngredientItem> findRestauarntsIngredients(long restaurantId);

    public IngredientItem createIngredientItem(long restaurantId, String ingredientName, long categoryId) throws Exception;

    public List<IngredientItem> findRestaurantsIngredients(long restaurantId);

    public IngredientItem updateStock(long id) throws Exception;
}
