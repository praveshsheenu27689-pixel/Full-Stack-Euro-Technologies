package com.bootcamp.api.repository;

import com.bootcamp.api.entity.Enrollment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {
    
    Page<Enrollment> findByUserId(Long userId, Pageable pageable);
    
    Page<Enrollment> findByCourseId(Long courseId, Pageable pageable);
    
    Optional<Enrollment> findByUserIdAndCourseId(Long userId, Long courseId);
    
    Boolean existsByUserIdAndCourseId(Long userId, Long courseId);
}
