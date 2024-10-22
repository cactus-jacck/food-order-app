package com.aayush.food_order_app.controller;

import com.aayush.food_order_app.model.Food;
import com.aayush.food_order_app.model.Restaurant;
import com.aayush.food_order_app.model.User;
import com.aayush.food_order_app.reponseDto.MessageResponseDto;
import com.aayush.food_order_app.requestDto.CreateFoodRequest;
import com.aayush.food_order_app.service.FoodService;
import com.aayush.food_order_app.service.RestaurantService;
import com.aayush.food_order_app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/food")
public class FoodAdminController
{
    private FoodService foodService;

    private UserService userService;

    private RestaurantService restaurantService;

    @Autowired
    public FoodAdminController(FoodService foodService, UserService userService, RestaurantService restaurantService)
    {
        this.foodService = foodService;
        this.userService = userService;
        this.restaurantService = restaurantService;
    }

    @PostMapping("")
    public ResponseEntity<Food> createFood(@RequestBody CreateFoodRequest req, @RequestHeader("Authorization") String jwt) throws Exception
    {
        User user = userService.findUserByJwtToken(jwt);
        Restaurant restaurant = restaurantService.findRestaurantById(req.getRestaurantId());
        Food food = foodService.createFood(req, req.getCategory(), restaurant);

        return new ResponseEntity<>(food, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<MessageResponseDto> deleteFood(@PathVariable long id, @RequestHeader("Authorization") String jwt) throws Exception
    {
        User user = userService.findUserByJwtToken(jwt);

        foodService.deleteFood(id);

        MessageResponseDto res = new MessageResponseDto();
        res.setMessage("Food deleted successfully");

        return new ResponseEntity<>(res, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Food> updateFoodAvailbility(@PathVariable long id, @RequestHeader("Authorization") String jwt) throws Exception
    {
        User user = userService.findUserByJwtToken(jwt);

        Food food = foodService.updateFoodAvailibility(id);

        return new ResponseEntity<>(food, HttpStatus.CREATED);
    }
}
