package com.aayush.food_order_app.controller;

import com.aayush.food_order_app.model.CartItem;
import com.aayush.food_order_app.model.Order;
import com.aayush.food_order_app.model.User;
import com.aayush.food_order_app.reponseDto.CreateOrderResponseDto;
import com.aayush.food_order_app.requestDto.CreateOrderRequestDto;
import com.aayush.food_order_app.service.OrderService;
import com.aayush.food_order_app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class OrderController
{
    private OrderService orderService;

    private UserService userService;

    @Autowired
    public OrderController(OrderService orderService, UserService userService)
    {
        this.orderService = orderService;
        this.userService = userService;
    }

    @PostMapping("/order")
    public ResponseEntity<CreateOrderResponseDto> createOrder(@RequestBody CreateOrderRequestDto req, @RequestHeader("Authorization") String jwt) throws Exception
    {
        User user = userService.findUserByJwtToken(jwt);
        Order order = orderService.createOrder(req, user);
        CreateOrderResponseDto responseDto = CreateOrderResponseDto.builder()
                .orderId(order.getId())
                .customerName(order.getCustomer().getFullName())
                .restaurantName(order.getRestaurant().getName())
                .deliveryAddress(order.getDeliveryAddress())
                .totalItems(order.getTotalItems())
                .totalPrice(order.getTotalPrice())
                .paymentType(order.getPayment().name())
                .build();

        System.out.println(responseDto.toString());
        return new ResponseEntity<>(responseDto, HttpStatus.CREATED);
    }

    @GetMapping("/order/user")
    public ResponseEntity<List<Order>> getOrderHistory(@RequestHeader("Authorization") String jwt) throws Exception
    {
        User user = userService.findUserByJwtToken(jwt);
        List<Order> orders = orderService.getUsersOrder(user.getId());
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }


}
