package com.aayush.food_order_app.repository;

import com.aayush.food_order_app.model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartRepository extends JpaRepository<Cart, Long>
{
    public Cart findByCustomerId(long userId);
}
