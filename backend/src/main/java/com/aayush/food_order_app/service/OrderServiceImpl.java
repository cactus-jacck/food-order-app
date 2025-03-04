package com.aayush.food_order_app.service;

import com.aayush.food_order_app.model.*;
import com.aayush.food_order_app.repository.*;
import com.aayush.food_order_app.requestDto.CreateOrderRequestDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class OrderServiceImpl implements OrderService
{
    private OrderRepository orderRepository;

    private OrderItemRepository orderItemRepository;

    private AddressRepository addressRepository;

    private UserRepository userRepository;

    private RestaurantService restaurantService;

    private CartService cartService;

    @Autowired
    public OrderServiceImpl(OrderRepository orderRepository, OrderItemRepository orderItemRepository, AddressRepository addressRepository, UserRepository userRepository, RestaurantService restaurantService, CartService cartService)
    {
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.addressRepository = addressRepository;
        this.userRepository = userRepository;
        this.restaurantService = restaurantService;
        this.cartService = cartService;
    }

    @Override
    public Order createOrder(CreateOrderRequestDto req, User user) throws Exception
    {
        Address address = req.getDeliveryAddress();

        Address savedAddress = addressRepository.save(address);

        if (!user.getAddresses().contains(savedAddress))
        {
            user.getAddresses().add(savedAddress);
            userRepository.save(user);
        }
        Restaurant restaurant = restaurantService.findRestaurantById(req.getRestaurantId());

        Order createdOrder = new Order();
        createdOrder.setCustomer(user);
        createdOrder.setCreatedAt(new Date());
        createdOrder.setOrderStatus("PENDING");
        createdOrder.setDeliveryAddress(savedAddress);
        createdOrder.setRestaurant(restaurant);

        createdOrder = orderRepository.save(createdOrder);

        Cart cart = cartService.findCartByUserId(user.getId());

        List<OrderItem> orderItems = new ArrayList<>();

        for (CartItem cartItem : cart.getItems())
        {
            OrderItem orderItem = new OrderItem();
            orderItem.setFood(cartItem.getFood());
            orderItem.setIngredients(cartItem.getIngredients());
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setTotalPrice(cartItem.getTotal());
            orderItem.setOrder(createdOrder);
            OrderItem savedOrderItem = orderItemRepository.save(orderItem);
            orderItems.add(savedOrderItem);
            createdOrder.getItems().add(orderItem);

        }
        double totalPrice = cartService.calculateCartTotals(cart);
        createdOrder.setTotalItems(cart.getItems().size());
        createdOrder.setPayment(Payment.CASH);
        createdOrder.setTotalPrice(totalPrice);
        Order savedOrder = orderRepository.save(createdOrder);
        restaurant.getOrders().add(savedOrder);
        return createdOrder;
    }

    @Override
    public Order updateOrder(long orderId, String orderStatus) throws Exception
    {
        Order order = findOrderById(orderId);
        if (orderStatus.equals("OUT_FOR_DELIVERY") || orderStatus.equals("DELIVERED") || orderStatus.equals("COMPLETED") || orderStatus.equals("PENDING"))
        {
            order.setOrderStatus(orderStatus);
            return orderRepository.save(order);
        }
        throw new Exception("Please a valid order status");
    }

    @Override
    public void cancelOrder(long orderId) throws Exception
    {
        Order order = findOrderById(orderId);
        orderRepository.deleteById(orderId);
    }

    @Override
    public List<Order> getUsersOrder(long userId)
    {
        return  orderRepository.findByCustomerId(userId);
    }

    @Override
    public List<Order> getRestaurantsOrder(long restaurantId, String orderStatus) throws Exception
    {
        List<Order> orders = orderRepository.findByRestaurantId(restaurantId);
        if (orderStatus != null)
        {
            orders = orders.stream().filter(order -> order.getOrderStatus().equals(orderStatus)).toList();
        }

        return orders;
    }

    @Override
    public Order findOrderById(long orderId) throws Exception
    {
        Optional<Order> optionalOrder = orderRepository.findById(orderId);
        if (optionalOrder.isEmpty())
        {
            throw new Exception("Order not found");
        }
        return optionalOrder.get();
    }
}
