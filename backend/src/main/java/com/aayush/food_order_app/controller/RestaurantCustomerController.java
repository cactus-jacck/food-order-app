package com.aayush.food_order_app.controller;

import com.aayush.food_order_app.model.*;
import com.aayush.food_order_app.service.RestaurantService;
import com.aayush.food_order_app.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
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
    public ResponseEntity<List<RestaurantDTO>> getAllRestaurant()
    {
        List<Restaurant> restaurants = restaurantService.getAllRestaurants();
        List<RestaurantDTO> restaurantDtoList = new ArrayList<>();
        for (Restaurant restaurant : restaurants )
        {
            List<String> images = new ArrayList<>();
            for (RestaurantImage image: restaurant.getImages())
            {
                images.add(image.getImageUrl());
            }

            RestaurantDTO restaurantDTO = new RestaurantDTO();
            restaurantDTO.setId(restaurant.getId());
            restaurantDTO.setTitle(restaurant.getName());
            restaurantDTO.setImages(images.get(0));
            restaurantDTO.setCity(restaurant.getAddress().getCity());
            restaurantDTO.setDescription(restaurant.getDescription());
            restaurantDTO.setOwnerName(restaurant.getOwner().getFullName());
            restaurantDTO.setOpen(restaurant.isOpen());
            restaurantDTO.setOpeningHours(restaurant.getOpeningHours());
//            restaurantDTO.setAddress(restaurant.getAddress());

            restaurantDtoList.add(restaurantDTO);
        }
        return new ResponseEntity<>(restaurantDtoList, HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Restaurant>> searchRestaurant(@RequestHeader("Authorization") String jwt, @RequestParam String keyword)
    {
        List<Restaurant> restaurants = restaurantService.searchRestaurant(keyword);
        return new ResponseEntity<>(restaurants, HttpStatus.OK);

    }

    @GetMapping("/{id}")
    public ResponseEntity<RestaurantDTO> findRestaurantById(@RequestHeader("Authorization") String jwt, @PathVariable long id) throws Exception
    {
        User user = userService.findUserByJwtToken(jwt);
        Restaurant restaurant = restaurantService.findRestaurantById(id);
        RestaurantDTO restaurantDTO = new RestaurantDTO();
        restaurantDTO.setId(restaurant.getId());
        restaurantDTO.setTitle(restaurant.getName());
        restaurantDTO.setImages(restaurant.getImages().get(0).getImageUrl());
        restaurantDTO.setDescription(restaurant.getDescription());
        restaurantDTO.setOwnerName(restaurant.getOwner().getFullName());
        restaurantDTO.setCity(restaurant.getAddress().getCity());
        restaurantDTO.setOpeningHours(restaurant.getOpeningHours());
        restaurantDTO.setOpen(restaurant.isOpen());
        return new ResponseEntity<>(restaurantDTO, HttpStatus.OK);
    }

    @PutMapping("/{id}/add-favourites")
    public ResponseEntity<UserFavourite> addToFavourites(
            @RequestHeader("Authorization") String jwt,
            @PathVariable long id) throws Exception
    {
        User user = userService.findUserByJwtToken(jwt);

        UserFavourite userFavourite = restaurantService.addToFavourites(id, user);

        return new ResponseEntity<>(userFavourite, HttpStatus.OK);
    }
}
