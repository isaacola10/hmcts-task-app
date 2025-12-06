CREATE TABLE IF NOT EXISTS tasks (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(120) NOT NULL,
    description TEXT NULL,
    status VARCHAR (30) NOT NULL,
    due_date_time TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ NOT NULL
)