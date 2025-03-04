package com.aayush.food_order_app.service;

import com.aayush.food_order_app.config.JwtProvider;
import com.aayush.food_order_app.model.Address;
import com.aayush.food_order_app.model.User;
import com.aayush.food_order_app.repository.UserRepository;
import com.aayush.food_order_app.requestDto.AddressRequestDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService
{
    private UserRepository userRepository;

    private JwtProvider jwtProvider;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, JwtProvider jwtProvider)
    {
        this.userRepository = userRepository;
        this.jwtProvider = jwtProvider;
    }

    @Override
    public User findUserByJwtToken(String jwt) throws Exception
    {
        String email = jwtProvider.getEmailFromJwtToken(jwt);
        User user = findUserByEmail(email);
        return user;
    }

    @Override
    public User findUserByEmail(String email) throws Exception
    {
        User user = userRepository.findByEmail(email);

        if (user == null)
        {
            throw new Exception("User not found");
        }
        return user;
    }

    @Override
    public Address updateAddress(String jwt, AddressRequestDto addressReqDto) throws Exception
    {
        String email = jwtProvider.getEmailFromJwtToken(jwt);
        User user = findUserByEmail(email);

        for (Address address: user.getAddresses())
        {
            if (address.getId() == addressReqDto.getId())
            {
                address.setCity(ad);
            }
        }
    }
}
