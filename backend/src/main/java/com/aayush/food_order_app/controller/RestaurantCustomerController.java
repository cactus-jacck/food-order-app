package com.aayush.food_order_app.controller;

import com.aayush.food_order_app.model.Restaurant;
import com.aayush.food_order_app.model.RestaurantDTO;
import com.aayush.food_order_app.model.User;
import com.aayush.food_order_app.service.RestaurantService;
import com.aayush.food_order_app.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/restaurants")
public class RestaurantCustomerController
{
    private RestaurantService restaurantService;

    private UserService userService;

    public RestaurantCustomerController(RestaurantService restaurantService, UserService userService)
    {
        this.restaurantService = restaurantService;
        this.userService = userService;
    }

    @GetMapping("")
    public ResponseEntity<List<Restaurant>> getAllRestaurant()
    {
        List<Restaurant> restaurants = restaurantService.getAllRestaurants();
        return new ResponseEntity<>(restaurants, HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Restaurant>> searchRestaurant(@RequestHeader("Authorization") String jwt, @RequestParam String keyword)
    {
        List<Restaurant> restaurants = restaurantService.searchRestaurant(keyword);
        return new ResponseEntity<>(restaurants, HttpStatus.OK);

    }

    @GetMapping("/{id}")
    public ResponseEntity<Restaurant> findRestaurantById(@RequestHeader("Authorization") String jwt, @PathVariable long id) throws Exception
    {
        User user = userService.findUserByJwtToken(jwt);
        Restaurant restaurants = restaurantService.findRestaurantById(id);
        return new ResponseEntity<>(restaurants, HttpStatus.OK);
    }

    @PutMapping("/{id}/add-favourites")
    public ResponseEntity<RestaurantDTO> addToFavourites(
            @RequestHeader("Authorization") String jwt,
            @PathVariable long id) throws Exception
    {
        User user = userService.findUserByJwtToken(jwt);

        RestaurantDTO restaurantDto = restaurantService.addToFavourites(id, user);

        return new ResponseEntity<>(restaurantDto, HttpStatus.OK);
    }
}
