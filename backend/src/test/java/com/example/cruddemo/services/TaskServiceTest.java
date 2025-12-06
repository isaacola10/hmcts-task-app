package com.example.cruddemo.services;

import org.junit.jupiter.api.Test;
import com.example.cruddemo.api.dto.CreateTaskRequest;
import com.example.cruddemo.domain.TaskStatus;
import com.example.cruddemo.persistence.TaskEntity;
import com.example.cruddemo.persistence.TaskRepository;
import com.example.cruddemo.service.TaskService;

import java.time.*;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

public class TaskServiceTest {
    
    @Test
    void createTaskAndReturnsResponse() {
        TaskRepository repo = mock (TaskRepository.class);
        Clock fixedClock =  Clock.fixed(Instant.parse("2025-12-04T11:00:00Z"), ZoneOffset.UTC);

        TaskService service = new TaskService(repo, fixedClock);

        CreateTaskRequest req = new CreateTaskRequest("Test title", "desc", TaskStatus.TODO, OffsetDateTime.parse("2025-12-04T11:00:00Z"));

        TaskEntity saved = new TaskEntity("Test title", "desc", TaskStatus.TODO, OffsetDateTime.parse("2025-12-04T11:00:00Z"), OffsetDateTime.parse("2025-12-04T11:00:00Z"));

        when(repo.save(any(TaskEntity.class))).thenAnswer(inv -> {
            TaskEntity e = inv.getArgument(0);
            return saved;
        });

        var res = service.create(req);

        verify(repo, times(1)).save(any(TaskEntity.class));
        assertThat(res.title()).isEqualTo("Test title");
        assertThat(res.status()).isEqualTo(TaskStatus.TODO);
    }
}
