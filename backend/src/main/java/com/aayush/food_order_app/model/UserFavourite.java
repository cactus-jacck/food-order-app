package com.aayush.food_order_app.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserFavourite {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;  // ✅ This ensures the table has a primary key

    private String title;
    private String city;
    private String description;
    private String images;
    private String openingHours;
    private boolean open;
    private String ownerName;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}
