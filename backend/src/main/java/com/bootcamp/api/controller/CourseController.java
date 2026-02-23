package com.bootcamp.api.controller;

import com.bootcamp.api.dto.ApiResponse;
import com.bootcamp.api.dto.CourseDTO;
import com.bootcamp.api.service.CourseService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/courses")
@RequiredArgsConstructor
@Tag(name = "Courses", description = "Course management APIs")
public class CourseController {
    
    private final CourseService courseService;
    
    @GetMapping
    @Operation(summary = "Get all courses")
    public ResponseEntity<ApiResponse<Page<CourseDTO.Response>>> getAllCourses(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "DESC") String sortDir) {
        
        Sort sort = sortDir.equalsIgnoreCase("ASC") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(page, size, sort);
        
        Page<CourseDTO.Response> courses = courseService.getAllCourses(pageable);
        return ResponseEntity.ok(ApiResponse.success(courses));
    }
    
    @GetMapping("/{id}")
    @Operation(summary = "Get course by ID")
    public ResponseEntity<ApiResponse<CourseDTO.Response>> getCourseById(@PathVariable Long id) {
        CourseDTO.Response course = courseService.getCourseById(id);
        return ResponseEntity.ok(ApiResponse.success(course));
    }
    
    @GetMapping("/level/{level}")
    @Operation(summary = "Get courses by level")
    public ResponseEntity<ApiResponse<Page<CourseDTO.Response>>> getCoursesByLevel(
            @PathVariable String level,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        
        Pageable pageable = PageRequest.of(page, size);
        Page<CourseDTO.Response> courses = courseService.getCoursesByLevel(level, pageable);
        return ResponseEntity.ok(ApiResponse.success(courses));
    }
    
    @GetMapping("/search")
    @Operation(summary = "Search courses")
    public ResponseEntity<ApiResponse<Page<CourseDTO.Response>>> searchCourses(
            @RequestParam String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        
        Pageable pageable = PageRequest.of(page, size);
        Page<CourseDTO.Response> courses = courseService.searchCourses(keyword, pageable);
        return ResponseEntity.ok(ApiResponse.success(courses));
    }
    
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "Bearer Authentication")
    @Operation(summary = "Create new course (Admin only)")
    public ResponseEntity<ApiResponse<CourseDTO.Response>> createCourse(
            @Valid @RequestBody CourseDTO.Request request) {
        CourseDTO.Response course = courseService.createCourse(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Course created successfully", course));
    }
    
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "Bearer Authentication")
    @Operation(summary = "Update course (Admin only)")
    public ResponseEntity<ApiResponse<CourseDTO.Response>> updateCourse(
            @PathVariable Long id,
            @Valid @RequestBody CourseDTO.Request request) {
        CourseDTO.Response course = courseService.updateCourse(id, request);
        return ResponseEntity.ok(ApiResponse.success("Course updated successfully", course));
    }
    
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "Bearer Authentication")
    @Operation(summary = "Delete course (Admin only)")
    public ResponseEntity<ApiResponse<Void>> deleteCourse(@PathVariable Long id) {
        courseService.deleteCourse(id);
        return ResponseEntity.ok(ApiResponse.success("Course deleted successfully", null));
    }
}
