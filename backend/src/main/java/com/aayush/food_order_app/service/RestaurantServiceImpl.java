package com.aayush.food_order_app.service;

import com.aayush.food_order_app.model.*;
import com.aayush.food_order_app.repository.AddressRepository;
import com.aayush.food_order_app.repository.RestaurantRepository;
import com.aayush.food_order_app.repository.UserRepository;
import com.aayush.food_order_app.requestDto.CreateRestaurantRequestDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class RestaurantServiceImpl implements RestaurantService
{
    private RestaurantRepository restaurantRepository;

    private AddressRepository addressRepository;

    private UserRepository userRepository;

    @Autowired
    public RestaurantServiceImpl(RestaurantRepository restaurantRepository, AddressRepository addressRepository, UserRepository userRepository)
    {
        this.restaurantRepository = restaurantRepository;
        this.addressRepository = addressRepository;
        this.userRepository = userRepository;
    }


    @Override
    public Restaurant createRestaurant(CreateRestaurantRequestDto restaurantRequestDto, User user)
    {

        Restaurant restaurant = Restaurant.builder()
                .address(restaurantRequestDto.getAddress())
                .contactInformation(restaurantRequestDto.getContactInformation())
                .cuisineType(restaurantRequestDto.getCuisineType())
                .description(restaurantRequestDto.getDescription())
                .name(restaurantRequestDto.getName())
                .openingHours(restaurantRequestDto.getOpeningHours())
                .registrationDate(LocalDateTime.now())
                .owner(user)
                .build();

        List<RestaurantImage> restaurantImageList = new ArrayList<>();

        for (String imageUrl : restaurantRequestDto.getImages())
        {
            RestaurantImage temp = new RestaurantImage();
            temp.setImageUrl(imageUrl);
            temp.setRestaurant(restaurant);
            restaurantImageList.add(temp);
        }
        restaurant.setImages(restaurantImageList);

        restaurantRepository.save(restaurant);

        return restaurant;
    }

    @Override
    public Restaurant updateRestaurant(Long restaurantId, CreateRestaurantRequestDto updatedRestaurant) throws Exception
    {
        Restaurant restaurant = findRestaurantById(restaurantId);
        restaurant.setName(updatedRestaurant.getName());
        restaurant.setDescription(updatedRestaurant.getDescription());
        restaurant.setCuisineType(updatedRestaurant.getCuisineType());
        restaurant.setAddress(updatedRestaurant.getAddress());
        restaurant.setContactInformation(updatedRestaurant.getContactInformation());
        restaurant.setOpeningHours(updatedRestaurant.getOpeningHours());
        restaurant.setName(updatedRestaurant.getName());

        List<RestaurantImage> restaurantImageList = new ArrayList<>();

        for (String imageUrl : updatedRestaurant.getImages())
        {
            RestaurantImage temp = new RestaurantImage();
            temp.setImageUrl(imageUrl);
            temp.setRestaurant(restaurant);
            restaurantImageList.add(temp);
        }
        restaurant.setImages(restaurantImageList);
        return restaurantRepository.save(restaurant);
    }

    @Override
    public void deleteRestaurant(Long restaurantId) throws Exception
    {
        Restaurant restaurant = findRestaurantById(restaurantId);
        restaurantRepository.delete(restaurant);
    }

    @Override
    public List<Restaurant> getAllRestaurants()
    {
        return restaurantRepository.findAll();
    }

    @Override
    public List<Restaurant> searchRestaurant(String keyword)
    {
        return restaurantRepository.findBySearchQuery(keyword);
    }

    @Override
    public Restaurant findRestaurantById(long id) throws Exception
    {
        Optional<Restaurant> opt = restaurantRepository.findById(id);

        if (opt.isEmpty())
        {
            throw new Exception("Restaurant not found with id "+id);
        }
        return opt.get();
    }

    @Override
    public Restaurant getRestaurantByUserId(long id) throws Exception
    {
        Restaurant restaurant = restaurantRepository.findByOwnerId(id);
        if (restaurant == null)
        {
            throw new Exception("Restaurant not found with owner id");
        }
        return restaurant;
    }

    @Override
    public UserFavourite addToFavourites(long restaurantId, User user) throws Exception
    {
        Restaurant restaurant = findRestaurantById(restaurantId);

        UserFavourite userFavourite = UserFavourite.builder()
                .title(restaurant.getName())
                .city(restaurant.getAddress().getCity())
                .description(restaurant.getDescription())
                .images(restaurant.getImages().get(0).getImageUrl())
                .openingHours(restaurant.getOpeningHours())
                .open(restaurant.isOpen())
                .ownerName(restaurant.getOwner().getFullName())
                .build();

        if (user.getFavourites().contains(userFavourite))
        {
            user.getFavourites().remove(userFavourite);       //un-favourite the restaurant
        }
        else
            user.getFavourites().add(userFavourite);

        userRepository.save(user);
        return userFavourite;
    }

    @Override
    public Restaurant updateRestaurantStatus(long id) throws Exception
    {
        Restaurant restaurant = findRestaurantById(id);
        restaurant.setOpen(!restaurant.isOpen());
        return restaurantRepository.save(restaurant);
    }
}
