package com.aayush.food_order_app.reponseDto;
import com.aayush.food_order_app.model.FoodImage;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class FoodResponseDto
{
    private long id;

    private String name;

    private String description;

    private double price;

    private List<FoodImage> images;

    private boolean isVegetarian;

    private boolean isSeasonal;

    private String restaurantName;

    private String restaurantCity;

    private long restaurantId;
}
