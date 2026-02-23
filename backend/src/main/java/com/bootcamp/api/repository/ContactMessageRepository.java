package com.bootcamp.api.repository;

import com.bootcamp.api.entity.ContactMessage;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContactMessageRepository extends JpaRepository<ContactMessage, Long> {
    
    Page<ContactMessage> findByStatus(ContactMessage.Status status, Pageable pageable);
    
    Page<ContactMessage> findByEmail(String email, Pageable pageable);
}
