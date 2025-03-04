package com.aayush.food_order_app.reponseDto;

import com.aayush.food_order_app.model.CartItem;
import com.aayush.food_order_app.model.User;
import lombok.Builder;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
public class CartResponseDto
{
    private Long id;

    private User customer;

    private double total;

    private List<CartItem> items = new ArrayList<>();

    private long restaurantId;
}
