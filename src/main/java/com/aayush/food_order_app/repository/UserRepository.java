package com.aayush.food_order_app.repository;

import com.aayush.food_order_app.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long>
{
    public User findByEmail(String username);
}
