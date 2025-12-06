export type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE"

export type Task = {
    id: number
    title: string
    description: string|null
    status: TaskStatus
    dueDateTime: string
}

export type CreateTaskRequest = {
    title: string
    description?: string
    status: TaskStatus
    dueDateTime: string|Date
}