package com.example.cruddemo.persistence;

import java.time.OffsetDateTime;

import com.example.cruddemo.domain.TaskStatus;
import jakarta.persistence.*;;

@Entity
@Table(name = "tasks")
public class TaskEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 120)
    private String title;

    @Column(columnDefinition = "text")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private TaskStatus status;

    @Column(name = "due_date_time", nullable = false)
    private OffsetDateTime dueDateTime;

    @Column(name="created_at", nullable = false)
    private OffsetDateTime createdAt;

    protected TaskEntity() {}

    public TaskEntity(String title, String description, TaskStatus status, OffsetDateTime dueDateTime, OffsetDateTime createdAt)
    {
        this.title = title;
        this.description = description;
        this.status = status;
        this.dueDateTime = dueDateTime;
        this.createdAt = createdAt;
    }

    public Long getId() { return id; }
    public String getTitle() { return title; }
    public String getDescription() { return description; }
    public TaskStatus getStatus() { return status; }
    public OffsetDateTime getDueDateTime() { return dueDateTime; }
    public OffsetDateTime getCreatedAt() { return createdAt; }

}
