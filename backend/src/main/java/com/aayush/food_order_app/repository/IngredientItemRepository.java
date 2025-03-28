package com.aayush.food_order_app.repository;

import com.aayush.food_order_app.model.IngredientItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IngredientItemRepository extends JpaRepository<IngredientItem, Long>
{
    public List<IngredientItem> findByRestaurantId(long id);
}
