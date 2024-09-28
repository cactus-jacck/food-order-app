package com.aayush.food_order_app.model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.Entity;
import jakarta.persistence.NamedEntityGraph;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Embeddable
@Data
public class RestaurantDTO
{
    private String title;

    @Column(length = 1000)
    private List<String> images;

    private String description;
}
