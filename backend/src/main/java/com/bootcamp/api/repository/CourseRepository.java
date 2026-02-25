package com.bootcamp.api.repository;

import com.bootcamp.api.entity.Course;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
    
    Page<Course> findByLevel(Course.Level level, Pageable pageable);
    
    @Query("SELECT c FROM Course c WHERE c.isActive = true")
    Page<Course> findAllActive(Pageable pageable);
    
    @Query("SELECT c FROM Course c WHERE c.isActive = true AND c.level = :level")
    Page<Course> findActiveByLevel(Course.Level level, Pageable pageable);
    
    @Query("SELECT c FROM Course c WHERE c.isActive = true AND " +
           "(LOWER(c.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(c.description) LIKE LOWER(CONCAT('%', :keyword, '%')))")
    Page<Course> searchCourses(String keyword, Pageable pageable);
}
