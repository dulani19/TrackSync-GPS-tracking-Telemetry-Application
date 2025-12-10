package com.example.location_tracker.services;

import com.example.location_tracker.dto.LoginRequest;
import com.example.location_tracker.dto.RegisterRequest;
import com.example.location_tracker.entity.User;
import com.example.location_tracker.repositories.UserRepository;
import com.example.location_tracker.security.JwtUtil;
import jakarta.transaction.Transactional;
import jakarta.validation.constraints.NotNull;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    public String registerRequest(@NotNull RegisterRequest request){
        if (userRepository.findByEmail(request.getEmail()) != null) {
            return "Email already exists!";
        }
        request.setPassword(passwordEncoder.encode(request.getPassword()));
        User user = modelMapper.map(request, User.class);
        userRepository.save(user);
        return "Registration sucess";
    }

    public String loginURequest(@NotNull LoginRequest loginRequest){
        User user = userRepository.findByEmail(loginRequest.getEmail());
        if(user == null){
            return "Invalid Usernameor password";
        }
        if(!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())){
            return "Invalid Username or password";
        }
        return jwtUtil.generateToken(user.getEmail());
    }

}
