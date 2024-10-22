package com.aayush.food_order_app.repository;

import com.aayush.food_order_app.model.Cart;
import com.aayush.food_order_app.model.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartItemRepository extends JpaRepository<CartItem, Long>
{
    public Cart findByCustomerId(long userId);

}
