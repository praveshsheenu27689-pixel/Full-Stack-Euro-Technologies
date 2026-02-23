package com.bootcamp.api.service;

import com.bootcamp.api.dto.CourseDTO;
import com.bootcamp.api.entity.Course;
import com.bootcamp.api.exception.ResourceNotFoundException;
import com.bootcamp.api.repository.CourseRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import java.math.BigDecimal;
import java.util.Arrays;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CourseServiceTest {
    
    @Mock
    private CourseRepository courseRepository;
    
    @InjectMocks
    private CourseService courseService;
    
    private Course course;
    private CourseDTO.Request courseRequest;
    
    @BeforeEach
    void setUp() {
        course = Course.builder()
                .id(1L)
                .title("Full Stack Development")
                .description("Complete course")
                .level(Course.Level.BEGINNER)
                .duration("6 months")
                .price(new BigDecimal("999.99"))
                .instructor("John Doe")
                .isActive(true)
                .build();
        
        courseRequest = CourseDTO.Request.builder()
                .title("Full Stack Development")
                .description("Complete course")
                .level("BEGINNER")
                .duration("6 months")
                .price(new BigDecimal("999.99"))
                .instructor("John Doe")
                .build();
    }
    
    @Test
    void getAllCourses_ShouldReturnPageOfCourses() {
        Pageable pageable = PageRequest.of(0, 10);
        Page<Course> coursePage = new PageImpl<>(Arrays.asList(course));
        
        when(courseRepository.findAllActive(pageable)).thenReturn(coursePage);
        
        Page<CourseDTO.Response> result = courseService.getAllCourses(pageable);
        
        assertNotNull(result);
        assertEquals(1, result.getTotalElements());
        verify(courseRepository, times(1)).findAllActive(pageable);
    }
    
    @Test
    void getCourseById_WhenExists_ShouldReturnCourse() {
        when(courseRepository.findById(1L)).thenReturn(Optional.of(course));
        
        CourseDTO.Response result = courseService.getCourseById(1L);
        
        assertNotNull(result);
        assertEquals("Full Stack Development", result.getTitle());
        verify(courseRepository, times(1)).findById(1L);
    }
    
    @Test
    void getCourseById_WhenNotExists_ShouldThrowException() {
        when(courseRepository.findById(1L)).thenReturn(Optional.empty());
        
        assertThrows(ResourceNotFoundException.class, () -> courseService.getCourseById(1L));
        verify(courseRepository, times(1)).findById(1L);
    }
    
    @Test
    void createCourse_ShouldReturnCreatedCourse() {
        when(courseRepository.save(any(Course.class))).thenReturn(course);
        
        CourseDTO.Response result = courseService.createCourse(courseRequest);
        
        assertNotNull(result);
        assertEquals("Full Stack Development", result.getTitle());
        verify(courseRepository, times(1)).save(any(Course.class));
    }
}
