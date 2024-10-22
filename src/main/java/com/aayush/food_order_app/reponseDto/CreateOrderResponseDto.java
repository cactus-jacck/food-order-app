package com.aayush.food_order_app.reponseDto;

import com.aayush.food_order_app.model.Address;
import com.aayush.food_order_app.model.Payment;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CreateOrderResponseDto
{
    private long orderId;

    private String customerName;

    private String restaurantName;

    private Address deliveryAddress;

    private long totalItems;

    private double totalPrice;

    private String paymentType;

    @Override
    public String toString()
    {
        return "CreateOrderResponseDto{" +
                "orderId=" + orderId +
                ", customerName='" + customerName + '\'' +
                ", restaurantName='" + restaurantName + '\'' +
                ", deliveryAddress=" + deliveryAddress +
                ", totalItems=" + totalItems +
                ", totalPrice=" + totalPrice +
                ", paymentType='" + paymentType + '\'' +
                '}';
    }
}
