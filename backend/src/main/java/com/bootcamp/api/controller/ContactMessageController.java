package com.bootcamp.api.controller;

import com.bootcamp.api.dto.ApiResponse;
import com.bootcamp.api.dto.ContactMessageDTO;
import com.bootcamp.api.service.ContactMessageService;
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
@RequestMapping("/api/v1/contact")
@RequiredArgsConstructor
@Tag(name = "Contact", description = "Contact message APIs")
public class ContactMessageController {
    
    private final ContactMessageService contactMessageService;
    
    @PostMapping
    @Operation(summary = "Submit contact message")
    public ResponseEntity<ApiResponse<ContactMessageDTO.Response>> createMessage(
            @Valid @RequestBody ContactMessageDTO.Request request) {
        ContactMessageDTO.Response response = contactMessageService.createMessage(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Message sent successfully", response));
    }
    
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "Bearer Authentication")
    @Operation(summary = "Get all messages (Admin only)")
    public ResponseEntity<ApiResponse<Page<ContactMessageDTO.Response>>> getAllMessages(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Page<ContactMessageDTO.Response> messages = contactMessageService.getAllMessages(pageable);
        return ResponseEntity.ok(ApiResponse.success(messages));
    }
    
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "Bearer Authentication")
    @Operation(summary = "Get message by ID (Admin only)")
    public ResponseEntity<ApiResponse<ContactMessageDTO.Response>> getMessageById(@PathVariable Long id) {
        ContactMessageDTO.Response message = contactMessageService.getMessageById(id);
        return ResponseEntity.ok(ApiResponse.success(message));
    }
    
    @PatchMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "Bearer Authentication")
    @Operation(summary = "Update message status (Admin only)")
    public ResponseEntity<ApiResponse<ContactMessageDTO.Response>> updateMessageStatus(
            @PathVariable Long id,
            @RequestParam String status) {
        ContactMessageDTO.Response message = contactMessageService.updateMessageStatus(id, status);
        return ResponseEntity.ok(ApiResponse.success("Status updated successfully", message));
    }
}
