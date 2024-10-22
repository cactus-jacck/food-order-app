package com.aayush.food_order_app.requestDto;

import com.aayush.food_order_app.model.Address;
import lombok.Data;

@Data
public class CreateOrderRequestDto
{
    private long restaurantId;

    private Address deliveryAddress;
}
