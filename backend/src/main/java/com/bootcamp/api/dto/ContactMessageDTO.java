package com.bootcamp.api.dto;

import jakarta.validation.constraints.*;
import lombok.*;
import java.time.LocalDateTime;

public class ContactMessageDTO {
    
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Request {
        @NotBlank(message = "Name is required")
        @Size(max = 100, message = "Name must not exceed 100 characters")
        private String name;
        
        @NotBlank(message = "Email is required")
        @Email(message = "Invalid email format")
        private String email;
        
        @Pattern(regexp = "^[0-9]{10}$", message = "Phone must be 10 digits")
        private String phone;
        
        private String courseInterest;
        
        @NotBlank(message = "Message is required")
        private String message;
    }
    
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Response {
        private Long id;
        private String name;
        private String email;
        private String phone;
        private String courseInterest;
        private String message;
        private String status;
        private LocalDateTime createdAt;
    }
}
