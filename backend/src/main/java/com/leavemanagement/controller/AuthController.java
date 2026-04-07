package com.leavemanagement.controller;

import com.leavemanagement.dto.LoginRequest;
import com.leavemanagement.dto.LoginResponse;
import com.leavemanagement.entity.User;
import com.leavemanagement.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {
    
    @Autowired
    private AuthService authService;
    
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {
        try {
            String token = authService.login(loginRequest.getEmail(), loginRequest.getPassword());
            User user = authService.getCurrentUser();
            
            LoginResponse response = new LoginResponse(
                    token,
                    user.getEmail(),
                    user.getName(),
                    user.getRole().name(),
                    user.getId()
            );
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
