package com.aayush.food_order_app.controller;

import com.aayush.food_order_app.model.Restaurant;
import com.aayush.food_order_app.model.User;
import com.aayush.food_order_app.reponseDto.MessageResponseDto;
import com.aayush.food_order_app.requestDto.CreateRestaurantRequestDto;
import com.aayush.food_order_app.service.RestaurantService;
import com.aayush.food_order_app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/admin/restaurants")
public class RestaurantAdminController
{
    private RestaurantService restaurantService;

    private UserService userService;

    @Autowired
    public RestaurantAdminController(RestaurantService restaurantService, UserService userService)
    {
        this.restaurantService = restaurantService;
        this.userService = userService;
    }

    @PostMapping("")
    public ResponseEntity<Restaurant> createRestaurant(@RequestBody CreateRestaurantRequestDto dto, @RequestHeader("Authorization") String jwt) throws Exception
    {
        User user = userService.findUserByJwtToken(jwt);

        Restaurant restaurant = restaurantService.createRestaurant(dto, user);
        return new ResponseEntity<>(restaurant, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Restaurant> updateRestaurant(@RequestBody CreateRestaurantRequestDto dto,
                                                       @RequestHeader("Authorization") String jwt,
                                                       @PathVariable long id) throws Exception
    {
        User user = userService.findUserByJwtToken(jwt);

        Restaurant restaurant = restaurantService.updateRestaurant(id, dto);
        return new ResponseEntity<>(restaurant, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<MessageResponseDto> deleteRestaurant(@RequestHeader("Authorization") String jwt,
                                                       @PathVariable long id) throws Exception
    {
        User user = userService.findUserByJwtToken(jwt);

        restaurantService.deleteRestaurant(id);
        MessageResponseDto res = new MessageResponseDto();
        res.setMessage("Restaurant deleted successfully");
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Restaurant> updateRestaurantStatus(@RequestHeader("Authorization") String jwt,
                                                       @PathVariable long id) throws Exception
    {
        User user = userService.findUserByJwtToken(jwt);

        Restaurant restaurant = restaurantService.updateRestaurantStatus(id);
        return new ResponseEntity<>(restaurant, HttpStatus.OK);
    }

    @GetMapping("/user")
    public ResponseEntity<Restaurant> findRestaurantByUserId(@RequestHeader("Authorization") String jwt) throws Exception
    {
        User user = userService.findUserByJwtToken(jwt);

        Restaurant restaurant = restaurantService.getRestaurantByUserId(user.getId());
        return new ResponseEntity<>(restaurant, HttpStatus.OK);
    }


}
