package com.aayush.food_order_app.requestDto;

import lombok.Data;

import java.util.List;

@Data
public class AddCartItemReqDto
{
    private long foodId;

    private int quantity;

    private List<String> ingredients;
}
