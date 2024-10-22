package com.aayush.food_order_app.service;

import com.aayush.food_order_app.model.Restaurant;
import com.aayush.food_order_app.model.RestaurantDTO;
import com.aayush.food_order_app.model.User;
import com.aayush.food_order_app.repository.AddressRepository;
import com.aayush.food_order_app.repository.RestaurantRepository;
import com.aayush.food_order_app.repository.UserRepository;
import com.aayush.food_order_app.requestDto.CreateRestaurantRequestDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
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
                .images(restaurantRequestDto.getImages())
                .name(restaurantRequestDto.getName())
                .openingHours(restaurantRequestDto.getOpeningHours())
                .registrationDate(LocalDateTime.now())
                .owner(user)
                .build();

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
        restaurant.setImages(updatedRestaurant.getImages());
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
    public RestaurantDTO addToFavourites(long restaurantId, User user) throws Exception
    {
        Restaurant restaurant = findRestaurantById(restaurantId);

        RestaurantDTO dto = new RestaurantDTO();
        dto.setDescription(restaurant.getDescription());
        dto.setImages(restaurant.getImages());
        dto.setTitle(restaurant.getName());
        dto.setId(restaurantId);

        if (user.getFavourites().contains(dto))
        {
            user.getFavourites().remove(dto);       //un-favourite the restaurant
        }
        else
            user.getFavourites().add(dto);

        userRepository.save(user);
        return dto;
    }

    @Override
    public Restaurant updateRestaurantStatus(long id) throws Exception
    {
        Restaurant restaurant = findRestaurantById(id);
        restaurant.setOpen(!restaurant.isOpen());
        return restaurantRepository.save(restaurant);
    }
}
