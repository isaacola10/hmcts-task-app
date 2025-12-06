import { useState } from "react";
import type { Task } from "./types";
import { TaskForm } from "./components/TaskForm";
import { TaskCreatedCard } from "./components/TaskCreatedCard";

function App() {
  const [created, setCreated] = useState<Task | null>(null);

  return (
    // Full-screen background (no outer margin)
    <div
      style={{
        fontFamily: "system-ui",
        background: "#ccc",
        minHeight: "100vh",
        width: "100vw",
        margin: 0,
        padding: 0,
      }}
    >
      {/* Content wrapper (adds inner spacing without margin around the page) */}
      <div style={{ padding: 16 }}>
        <div
          style={{
            display: "flex",
            gap: 20,
            alignItems: "flex-start",
            maxWidth: 1100,
            margin: "0 auto",
          }}
        >
          <div
            style={{
              flex: 1,
              background: "#f6f8ff",
              border: "1px solid #e5e7eb",
              borderRadius: 12,
              padding: 40,
              minWidth: 0,
            }}
          >
            <h1 style={{ marginTop: 0 }}>HMCTS Task Creator</h1>
            <TaskForm onCreated={setCreated} />
          </div>

          <div
            style={{
              flex: 1,
              background: "#ffffff",
              border: "1px solid #e5e7eb",
              borderRadius: 12,
              padding: 20,
              minWidth: 0,
            }}
          >
            <h1 style={{ marginTop: 0 }}>Task List</h1>

            {created ? (
              <div style={{ marginTop: 8 }}>
                <div
                  style={{
                    padding: 12,
                    border: "1px solid #c7f9cc",
                    background: "#e9fce9",
                    borderRadius: 8,
                    marginBottom: 12,
                  }}
                >
                  ✅ Task created successfully
                </div>

                <TaskCreatedCard task={created} />
              </div>
            ) : (
              <div
                style={{
                  marginTop: 8,
                  padding: 12,
                  border: "1px dashed #e5e7eb",
                  borderRadius: 10,
                  color: "#6b7280",
                }}
              >
                No tasks yet — create one on the left.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
