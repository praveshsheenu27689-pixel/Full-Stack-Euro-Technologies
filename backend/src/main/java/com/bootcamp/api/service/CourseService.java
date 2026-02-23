package com.bootcamp.api.service;

import com.bootcamp.api.dto.CourseDTO;
import com.bootcamp.api.entity.Course;
import com.bootcamp.api.exception.ResourceNotFoundException;
import com.bootcamp.api.repository.CourseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CourseService {
    
    private final CourseRepository courseRepository;
    
    @Cacheable(value = "courses", key = "#pageable.pageNumber + '-' + #pageable.pageSize")
    public Page<CourseDTO.Response> getAllCourses(Pageable pageable) {
        return courseRepository.findAllActive(pageable)
                .map(this::mapToResponse);
    }
    
    @Cacheable(value = "courses", key = "'course-' + #id")
    public CourseDTO.Response getCourseById(Long id) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with id: " + id));
        return mapToResponse(course);
    }
    
    public Page<CourseDTO.Response> getCoursesByLevel(String level, Pageable pageable) {
        Course.Level courseLevel = Course.Level.valueOf(level.toUpperCase());
        return courseRepository.findActiveByLevel(courseLevel, pageable)
                .map(this::mapToResponse);
    }
    
    public Page<CourseDTO.Response> searchCourses(String keyword, Pageable pageable) {
        return courseRepository.searchCourses(keyword, pageable)
                .map(this::mapToResponse);
    }
    
    @Transactional
    @CacheEvict(value = "courses", allEntries = true)
    public CourseDTO.Response createCourse(CourseDTO.Request request) {
        Course course = Course.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .level(Course.Level.valueOf(request.getLevel().toUpperCase()))
                .duration(request.getDuration())
                .price(request.getPrice())
                .instructor(request.getInstructor())
                .syllabus(request.getSyllabus())
                .isActive(true)
                .build();
        
        course = courseRepository.save(course);
        return mapToResponse(course);
    }
    
    @Transactional
    @CacheEvict(value = "courses", allEntries = true)
    public CourseDTO.Response updateCourse(Long id, CourseDTO.Request request) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with id: " + id));
        
        course.setTitle(request.getTitle());
        course.setDescription(request.getDescription());
        course.setLevel(Course.Level.valueOf(request.getLevel().toUpperCase()));
        course.setDuration(request.getDuration());
        course.setPrice(request.getPrice());
        course.setInstructor(request.getInstructor());
        course.setSyllabus(request.getSyllabus());
        
        course = courseRepository.save(course);
        return mapToResponse(course);
    }
    
    @Transactional
    @CacheEvict(value = "courses", allEntries = true)
    public void deleteCourse(Long id) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with id: " + id));
        course.setIsActive(false);
        courseRepository.save(course);
    }
    
    private CourseDTO.Response mapToResponse(Course course) {
        return CourseDTO.Response.builder()
                .id(course.getId())
                .title(course.getTitle())
                .description(course.getDescription())
                .level(course.getLevel().name())
                .duration(course.getDuration())
                .price(course.getPrice())
                .instructor(course.getInstructor())
                .syllabus(course.getSyllabus())
                .isActive(course.getIsActive())
                .createdAt(course.getCreatedAt())
                .updatedAt(course.getUpdatedAt())
                .build();
    }
}
