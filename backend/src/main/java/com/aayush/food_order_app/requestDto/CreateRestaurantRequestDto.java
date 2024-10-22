package com.aayush.food_order_app.requestDto;

import com.aayush.food_order_app.model.Address;
import com.aayush.food_order_app.model.ContactInformation;
import lombok.Data;

import java.util.List;

@Data
public class CreateRestaurantRequestDto
{
    private Long id;

    private String name;

    private String description;

    private String cuisineType;

    private Address address;

    private ContactInformation contactInformation;

    private String openingHours;

    private List<String> images;
}
