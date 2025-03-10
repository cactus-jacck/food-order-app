package com.aayush.food_order_app.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class RestaurantImage
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String imageUrl;

    @ManyToOne
    @JoinColumn(name = "restaurant_id", nullable = false)
    private Restaurant restaurant;
}
