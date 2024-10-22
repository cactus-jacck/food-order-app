package com.aayush.food_order_app.controller;

import com.aayush.food_order_app.model.Order;
import com.aayush.food_order_app.model.User;
import com.aayush.food_order_app.requestDto.CreateOrderRequestDto;
import com.aayush.food_order_app.service.OrderService;
import com.aayush.food_order_app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class OrderAdminController
{
    private OrderService orderService;

    private UserService userService;

    @Autowired
    public OrderAdminController(OrderService orderService, UserService userService)
    {
        this.orderService = orderService;
        this.userService = userService;
    }

    @PostMapping("/order")
    public ResponseEntity<Order> createOrder(@RequestBody CreateOrderRequestDto req, @RequestHeader("Authorization") String jwt) throws Exception
    {
        User user = userService.findUserByJwtToken(jwt);
        Order order = orderService.createOrder(req, user);
        return new ResponseEntity<>(order, HttpStatus.OK);
    }

    @GetMapping("/order/restaurant/{id}")
    public ResponseEntity<List<Order>> getOrderHistory(@PathVariable long id, @RequestHeader("Authorization") String jwt, @RequestParam(required = false) String orderStatus) throws Exception
    {
        User user = userService.findUserByJwtToken(jwt);
        List<Order> orders = orderService.getRestaurantsOrder(id, orderStatus);
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    @PutMapping("/order/{id}/{orderStatus}")
    public ResponseEntity<Order> updateOrderStatus(@PathVariable long id, @RequestHeader("Authorization") String jwt, @PathVariable String orderStatus) throws Exception
    {
        User user = userService.findUserByJwtToken(jwt);
        Order orders = orderService.updateOrder(id, orderStatus);
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }
}
