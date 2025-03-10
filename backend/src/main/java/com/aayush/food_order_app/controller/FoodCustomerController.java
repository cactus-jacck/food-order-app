package com.aayush.food_order_app.controller;

import com.aayush.food_order_app.model.Food;
import com.aayush.food_order_app.model.User;
import com.aayush.food_order_app.reponseDto.FoodResponseDto;
import com.aayush.food_order_app.service.FoodService;
import com.aayush.food_order_app.service.RestaurantService;
import com.aayush.food_order_app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/food")
public class FoodCustomerController
{
    private FoodService foodService;

    private UserService userService;

    private RestaurantService restaurantService;

    @Autowired
    public FoodCustomerController(FoodService foodService, UserService userService, RestaurantService restaurantService)
    {
        this.foodService = foodService;
        this.userService = userService;
        this.restaurantService = restaurantService;
    }

    @GetMapping("")
    public ResponseEntity<List<FoodResponseDto>> getAllFoods(@RequestHeader("Authorization") String jwt) throws Exception
    {
        User user = userService.findUserByJwtToken(jwt);
        List<Food> foods = foodService.getAllFood();
        List<FoodResponseDto> foodResponseDtoList= new ArrayList<FoodResponseDto>();

        for (Food food: foods)
        {
            FoodResponseDto foodResponseDto = FoodResponseDto.builder()
                    .id(food.getId())
                    .name(food.getName())
                    .description(food.getDescription())
                    .price(food.getPrice())
                    .images(food.getFoodImages())
                    .isVegetarian(food.isVegetarian())
                    .isSeasonal(food.isSeasonal())
                    .restaurantName(food.getRestaurant().getName())
                    .restaurantCity(food.getRestaurant().getAddress().getCity())
                    .restaurantId(food.getRestaurant().getId())
                    .build();

            foodResponseDtoList.add(foodResponseDto);
        }

        return new ResponseEntity<>(foodResponseDtoList, HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Food>> searchFood(@RequestParam String name, @RequestHeader("Authorization") String jwt) throws Exception
    {
        User user = userService.findUserByJwtToken(jwt);

        List<Food> foods = foodService.searchFood(name);

        return new ResponseEntity<>(foods, HttpStatus.CREATED);
    }

    @GetMapping("/restaurant/{restaurantId}")
    public ResponseEntity<List<Food>> getRestaurantFood(@RequestParam boolean isVegetarian, @RequestParam boolean isSeasonal, @RequestParam boolean isNonvegetarian, @RequestParam(required = false) String foodCategory, @PathVariable long restaurantId, @RequestHeader("Authorization") String jwt) throws Exception
    {
        User user = userService.findUserByJwtToken(jwt);

        List<Food> foods = foodService.getRestaurantsFood(restaurantId, isVegetarian, isNonvegetarian, isSeasonal, foodCategory);

        return new ResponseEntity<>(foods, HttpStatus.OK);
    }

}
