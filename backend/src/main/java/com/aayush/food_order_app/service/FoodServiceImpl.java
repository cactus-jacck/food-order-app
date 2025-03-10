package com.aayush.food_order_app.service;

import com.aayush.food_order_app.model.Category;
import com.aayush.food_order_app.model.Food;
import com.aayush.food_order_app.model.FoodImage;
import com.aayush.food_order_app.model.Restaurant;
import com.aayush.food_order_app.repository.FoodRepository;
import com.aayush.food_order_app.requestDto.CreateFoodRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FoodServiceImpl implements FoodService
{
    private FoodRepository foodRepository;

    @Autowired
    public FoodServiceImpl(FoodRepository foodRepository)
    {
        this.foodRepository = foodRepository;
    }


    @Override
    public Food createFood(CreateFoodRequest req, Category category, Restaurant restaurant)
    {
        Food food = Food.builder()
                .name(req.getName())
                .foodCategory(category)
                .restaurant(restaurant)
                .description(req.getDescription())
                .price(req.getPrice())
                .ingredients(req.getIngredientItems())
                .isSeasonal(req.isSeasonal())
                .isVegetarian(req.isVegetarian())
                .build();

        List<FoodImage> foodImages = new ArrayList<>();
        for (String imageUrl : req.getImages())
        {
            FoodImage temp = new FoodImage();
            temp.setImageUrl(imageUrl);
            temp.setFood(food);
            foodImages.add(temp);
        }
        food.setFoodImages(foodImages);

        restaurant.getFoods().add(food);
        return foodRepository.save(food);
    }

    @Override
    public void deleteFood(long foodId) throws Exception
    {
        Food food = findFoodById(foodId);
        food.setRestaurant(null);
        foodRepository.deleteById(food.getId());
    }

    @Override
    public List<Food> getRestaurantsFood(long restaurantId, boolean isVegetarian, boolean isNonveg, boolean isSeasonal, String foodCategory)
    {
        List<Food> foods = foodRepository.findByRestaurantId(restaurantId);

        if (isVegetarian)
        {
            foods = filterByVegetarian(foods, isVegetarian);
        }
        if (isNonveg)
        {
            foods = filterByNonVeg(foods, isNonveg);
        }
        if (isSeasonal)
        {
            foods = filterBySeasonal(foods, isSeasonal);
        }
        if (foodCategory != null && !foodCategory.isEmpty())
        {
            foods = filterByFoodCategory(foods, foodCategory);
        }
        return foods;
    }

    private List<Food> filterByFoodCategory(List<Food> foods, String foodCategory)
    {
        return foods.stream().filter(food -> {
            if (food.getFoodCategory() != null)
            {
                return food.getFoodCategory().getName().equals(foodCategory);
            }
            return false;
        }).collect(Collectors.toList());
    }

    private List<Food> filterBySeasonal(List<Food> foods, boolean isSeasonal)
    {
        return foods.stream().filter(food -> food.isSeasonal() == isSeasonal).collect(Collectors.toList());
    }

    private List<Food> filterByNonVeg(List<Food> foods, boolean isNonveg)
    {
        return foods.stream().filter(food -> food.isVegetarian() == false).collect(Collectors.toList());
    }

    private List<Food> filterByVegetarian(List<Food> foods, boolean isVegetarian)
    {
        return foods.stream().filter(food -> food.isVegetarian() == isVegetarian).collect(Collectors.toList());
    }

    @Override
    public List<Food> searchFood(String keyword)
    {
        return foodRepository.searchFood(keyword);
    }

    @Override
    public Food findFoodById(long foodId) throws Exception
    {
        Optional<Food> optionalFood = foodRepository.findById(foodId);
        if (optionalFood.isEmpty())
        {
            throw new Exception("Food does not exist with id: "+foodId);
        }
        return optionalFood.get();
    }

    @Override
    public Food updateFoodAvailibility(long foodId) throws Exception
    {
        Food food = findFoodById(foodId);
        food.setAvailable(!food.isAvailable());
        return foodRepository.save(food);
    }

    @Override
    public List<Food> getAllFood()
    {
        return foodRepository.findAll();
    }
}
