package com.aayush.food_order_app.requestDto;

import lombok.Data;

@Data
public class UpdateCartItemRequestDto
{
    private long cartItemId;

    private int quantity;
}
