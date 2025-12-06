package com.example.cruddemo.api;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.cruddemo.api.dto.CreateTaskRequest;
import com.example.cruddemo.api.dto.TaskResponse;
import com.example.cruddemo.service.TaskService;

import java.net.URI;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {
    
    private final TaskService service;

    public TaskController(TaskService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<TaskResponse> create(@Valid @RequestBody CreateTaskRequest request) {
        TaskResponse created = service.create(request);
        return ResponseEntity.created(URI.create("/api/tasks/" + created.id())).body(created);
    }
}
