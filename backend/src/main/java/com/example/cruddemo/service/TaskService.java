package com.example.cruddemo.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.example.cruddemo.api.dto.CreateTaskRequest;
import com.example.cruddemo.api.dto.TaskResponse;
import com.example.cruddemo.persistence.TaskEntity;
import com.example.cruddemo.persistence.TaskRepository;

import java.time.Clock;
import java.time.OffsetDateTime;

@Service
public class TaskService {
    
    private final TaskRepository repository;
    private final Clock clock;

    public TaskService(TaskRepository repository, Clock clock){
        this.repository = repository;
        this.clock = clock;
    }

    @Transactional
    public TaskResponse create (CreateTaskRequest req) {
        OffsetDateTime now = OffsetDateTime.now(clock);

        TaskEntity toSave = new TaskEntity(req.title().trim(), req.description(), req.status(), req.dueDateTime(), now);

        TaskEntity saved = repository.save(toSave);

        return new TaskResponse(
            saved.getId(),
            saved.getTitle(),
            saved.getDescription(),
            saved.getStatus(),
            saved.getDueDateTime()
        );
    }
}
