package com.leavemanagement.config;

import com.leavemanagement.entity.Role;
import com.leavemanagement.entity.User;
import com.leavemanagement.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() == 0) {
            userRepository.save(new User("John CEO", "ceo@company.com", passwordEncoder.encode("admin123"), Role.CEO));
            userRepository.save(new User("Alice Manager", "manager@company.com", passwordEncoder.encode("admin123"), Role.MANAGER));
            userRepository.save(new User("Bob HR", "hr@company.com", passwordEncoder.encode("admin123"), Role.HR));
            userRepository.save(new User("Carol Team Lead", "tl@company.com", passwordEncoder.encode("admin123"), Role.TEAM_LEAD));
            userRepository.save(new User("David Employee", "employee@company.com", passwordEncoder.encode("admin123"), Role.EMPLOYEE));
            userRepository.save(new User("Emma Employee", "emma@company.com", passwordEncoder.encode("admin123"), Role.EMPLOYEE));
            userRepository.save(new User("Frank Employee", "frank@company.com", passwordEncoder.encode("admin123"), Role.EMPLOYEE));
        }
    }
}
