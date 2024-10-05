package com.aayush.food_order_app.service;

import com.aayush.food_order_app.config.JwtProvider;
import com.aayush.food_order_app.model.User;
import com.aayush.food_order_app.repository.UserRepository;
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
}
