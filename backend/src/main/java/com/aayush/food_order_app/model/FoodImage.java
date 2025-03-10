package com.aayush.food_order_app.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class FoodImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;  // Add this as a primary key

    private String imageUrl;

    @ManyToOne
    @JoinColumn(name = "food_id", nullable = false)
    private Food food;
}
