package com.example.cruddemo.api.error;

import java.time.OffsetDateTime;
import java.util.List;

public record ApiError(
    OffsetDateTime timestamp,
    int status,
    String error,
    String message,
    List<FieldViolation> violations
) {
    public record FieldViolation(String field, String message) {}
}