package com.example.cruddemo.api.dto;

import com.example.cruddemo.domain.TaskStatus;

import java.time.OffsetDateTime;

public record TaskResponse(
    Long id,
    String title,
    String description,
    TaskStatus status,
    OffsetDateTime dueDateTime
) {
}