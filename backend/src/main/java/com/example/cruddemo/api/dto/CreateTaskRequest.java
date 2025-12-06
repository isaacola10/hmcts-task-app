package com.example.cruddemo.api.dto;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import com.example.cruddemo.domain.TaskStatus;

import java.time.OffsetDateTime;

public record CreateTaskRequest(
    @NotBlank(message = "Title is required")
    @Size(max = 120, message = "title must be <= 120 characters")
    String title,

    @Size(max = 5000, message = "description must be <= 5000 characters")
    String description,

    @NotNull(message = "status is required")
    TaskStatus status,

    @NotNull(message = "dueDateTime is required")
    @FutureOrPresent(message = "dueDateTime must be in the present or future")
    OffsetDateTime dueDateTime
) {
}
