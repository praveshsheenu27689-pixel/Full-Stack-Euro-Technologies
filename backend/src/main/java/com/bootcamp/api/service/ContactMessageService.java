package com.bootcamp.api.service;

import com.bootcamp.api.dto.ContactMessageDTO;
import com.bootcamp.api.entity.ContactMessage;
import com.bootcamp.api.exception.ResourceNotFoundException;
import com.bootcamp.api.repository.ContactMessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ContactMessageService {
    
    private final ContactMessageRepository contactMessageRepository;
    
    @Transactional
    public ContactMessageDTO.Response createMessage(ContactMessageDTO.Request request) {
        ContactMessage message = ContactMessage.builder()
                .name(request.getName())
                .email(request.getEmail())
                .phone(request.getPhone())
                .courseInterest(request.getCourseInterest())
                .message(request.getMessage())
                .status(ContactMessage.Status.NEW)
                .build();
        
        message = contactMessageRepository.save(message);
        return mapToResponse(message);
    }
    
    public Page<ContactMessageDTO.Response> getAllMessages(Pageable pageable) {
        return contactMessageRepository.findAll(pageable)
                .map(this::mapToResponse);
    }
    
    public ContactMessageDTO.Response getMessageById(Long id) {
        ContactMessage message = contactMessageRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Message not found with id: " + id));
        return mapToResponse(message);
    }
    
    public Page<ContactMessageDTO.Response> getMessagesByStatus(String status, Pageable pageable) {
        ContactMessage.Status messageStatus = ContactMessage.Status.valueOf(status.toUpperCase());
        return contactMessageRepository.findByStatus(messageStatus, pageable)
                .map(this::mapToResponse);
    }
    
    @Transactional
    public ContactMessageDTO.Response updateMessageStatus(Long id, String status) {
        ContactMessage message = contactMessageRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Message not found with id: " + id));
        
        message.setStatus(ContactMessage.Status.valueOf(status.toUpperCase()));
        message = contactMessageRepository.save(message);
        return mapToResponse(message);
    }
    
    private ContactMessageDTO.Response mapToResponse(ContactMessage message) {
        return ContactMessageDTO.Response.builder()
                .id(message.getId())
                .name(message.getName())
                .email(message.getEmail())
                .phone(message.getPhone())
                .courseInterest(message.getCourseInterest())
                .message(message.getMessage())
                .status(message.getStatus().name())
                .createdAt(message.getCreatedAt())
                .build();
    }
}
