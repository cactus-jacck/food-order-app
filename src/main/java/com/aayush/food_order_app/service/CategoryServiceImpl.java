package com.aayush.food_order_app.service;

import com.aayush.food_order_app.model.Category;
import com.aayush.food_order_app.model.Restaurant;
import com.aayush.food_order_app.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryServiceImpl implements CategoryService
{
    private CategoryRepository categoryRepository;

    private RestaurantService restaurantService;

    @Autowired
    public CategoryServiceImpl(CategoryRepository categoryRepository, RestaurantService restaurantService)
    {
        this.categoryRepository = categoryRepository;
        this.restaurantService = restaurantService;
    }

    @Override
    public Category createCategory(String name, long userId) throws Exception
    {
        Restaurant restaurant = restaurantService.getRestaurantByUserId(userId);
        Category category = Category.builder()
                .name(name)
                .restaurant(restaurant)
                .build();
        return categoryRepository.save(category);
    }

    @Override
    public List<Category> findCategoryByRestaurantId(long id) throws Exception
    {
        Restaurant restaurant = restaurantService.findRestaurantById(id);
        return categoryRepository.findByRestaurantId(restaurant.getId());
    }

    @Override
    public Category findCategoryById(long id) throws Exception
    {
        Optional<Category> optionalCategory = categoryRepository.findById(id);
        if (optionalCategory.isEmpty())
        {
            throw new Exception("Category not found");
        }
        return optionalCategory.get();
    }
}
