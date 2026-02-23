package com.bootcamp.api.dto;

import jakarta.validation.constraints.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

public class CourseDTO {
    
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Request {
        @NotBlank(message = "Title is required")
        @Size(max = 200, message = "Title must not exceed 200 characters")
        private String title;
        
        private String description;
        
        @NotNull(message = "Level is required")
        private String level;
        
        private String duration;
        
        @NotNull(message = "Price is required")
        @DecimalMin(value = "0.0", message = "Price must be positive")
        private BigDecimal price;
        
        private String instructor;
        private String syllabus;
    }
    
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Response {
        private Long id;
        private String title;
        private String description;
        private String level;
        private String duration;
        private BigDecimal price;
        private String instructor;
        private String syllabus;
        private Boolean isActive;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;
    }
}
