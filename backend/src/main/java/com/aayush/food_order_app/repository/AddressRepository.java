package com.aayush.food_order_app.repository;

import com.aayush.food_order_app.model.Address;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AddressRepository extends JpaRepository<Address, Long>
{

}
