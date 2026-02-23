package com.bootcamp.api.dto;

import jakarta.validation.constraints.*;
import lombok.*;

public class AuthDTO {
    
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class LoginRequest {
        @NotBlank(message = "Username is required")
        private String username;
        
        @NotBlank(message = "Password is required")
        private String password;
    }
    
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class RegisterRequest {
        @NotBlank(message = "Username is required")
        @Size(min = 3, max = 50, message = "Username must be between 3 and 50 characters")
        private String username;
        
        @NotBlank(message = "Email is required")
        @Email(message = "Invalid email format")
        private String email;
        
        @NotBlank(message = "Password is required")
        @Size(min = 8, message = "Password must be at least 8 characters")
        @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$",
                message = "Password must contain uppercase, lowercase, number and special character")
        private String password;
        
        @NotBlank(message = "First name is required")
        private String firstName;
        
        @NotBlank(message = "Last name is required")
        private String lastName;
        
        @Pattern(regexp = "^[0-9]{10}$", message = "Phone must be 10 digits")
        private String phone;
    }
    
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class AuthResponse {
        private String token;
        private String refreshToken;
        private String type = "Bearer";
        private Long id;
        private String username;
        private String email;
        private String role;
    }
}
