package com.aayush.food_order_app.service;

import com.aayush.food_order_app.model.IngredientCategory;
import com.aayush.food_order_app.model.IngredientItem;
import com.aayush.food_order_app.model.Restaurant;
import com.aayush.food_order_app.repository.IngredientCategoryRepository;
import com.aayush.food_order_app.repository.IngredientItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class IngredientsServiceImpl implements IngredientsService
{
    private IngredientItemRepository ingredientItemRepository;

    private IngredientCategoryRepository ingredientCategoryRepository;

    private RestaurantService restaurantService;

    @Autowired
    public IngredientsServiceImpl(IngredientItemRepository ingredientItemRepository, IngredientCategoryRepository ingredientCategoryRepository, RestaurantService restaurantService)
    {
        this.ingredientItemRepository = ingredientItemRepository;
        this.ingredientCategoryRepository = ingredientCategoryRepository;
        this.restaurantService = restaurantService;
    }

    @Override
    public IngredientCategory createIngredientCategory(String name, long restaurantId) throws Exception
    {
        Restaurant restaurant = restaurantService.findRestaurantById(restaurantId);

        IngredientCategory category = new IngredientCategory();
        category.setRestaurant(restaurant);
        category.setName(name);
        return ingredientCategoryRepository.save(category);
    }

    @Override
    public IngredientCategory findIngredientCategoryById(long id) throws Exception
    {
        Optional<IngredientCategory> ingredientCategory = ingredientCategoryRepository.findById(id);
        if (ingredientCategory.isEmpty())
            throw new Exception("Ingredient category not found");

        return ingredientCategory.get();
    }

    @Override
    public List<IngredientCategory> findIngredientCategoryByRestaurantId(long id) throws Exception
    {
        restaurantService.findRestaurantById(id);
        return ingredientCategoryRepository.findByRestaurantId(id);
    }

    @Override
    public List<IngredientItem> findRestauarntsIngredients(long restaurantId)
    {
        return List.of();
    }

    @Override
    public IngredientItem createIngredientItem(long restaurantId, String ingredientName, long ingredientCategoryId) throws Exception
    {
        Restaurant restaurant = restaurantService.findRestaurantById(restaurantId);
        IngredientCategory category = findIngredientCategoryById(ingredientCategoryId);

        IngredientItem item = new IngredientItem();
        item.setName(ingredientName);
        item.setRestaurant(restaurant);
        item.setCategory(category);

        IngredientItem ingredientItem = ingredientItemRepository.save(item);
        category.getIngredients().add(ingredientItem);
        return ingredientItem;
    }

    @Override
    public List<IngredientItem> findRestaurantsIngredients(long restaurantId)
    {
        return ingredientItemRepository.findByRestaurantId(restaurantId);
    }

    @Override
    public IngredientItem updateStock(long id) throws Exception
    {
        Optional<IngredientItem> ingredientItem = ingredientItemRepository.findById(id);
        if (ingredientItem.isEmpty())
        {
            throw new Exception("Ingredient not found");
        }
        IngredientItem ingredientItem1 = ingredientItem.get();
        ingredientItem1.setInStock(!ingredientItem1.isInStock());
        return ingredientItemRepository.save(ingredientItem1);
    }
}
