import type { Task } from "../types";

export function TaskCreatedCard({ task }: { task: Task }) {
  return (
    <div
      style={{
        marginTop: 12,
        border: "1px solid #e5e7eb",
        borderRadius: 14,
        padding: 16,
        background: "#fff",
        boxShadow: "0 10px 24px rgba(0,0,0,0.06)",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 12,
          alignItems: "center",
        }}
      >
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 4 }}>
            Task #{task.id}
          </div>
          <div
            style={{
              fontSize: 16,
              fontWeight: 800,
              color: "#111827",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {task.title}
          </div>
        </div>

        {/* Status pill */}
        <span
          style={{
            fontSize: 12,
            fontWeight: 700,
            padding: "6px 10px",
            borderRadius: 999,
            border: "1px solid #e5e7eb",
            background:
              task.status === "DONE"
                ? "#ecfdf5"
                : task.status === "IN_PROGRESS"
                ? "#eff6ff"
                : "#fff7ed",
            color:
              task.status === "DONE"
                ? "#065f46"
                : task.status === "IN_PROGRESS"
                ? "#1d4ed8"
                : "#9a3412",
          }}
        >
          {task.status === "IN_PROGRESS"
            ? "In progress"
            : task.status.toLowerCase()}
        </span>
      </div>

      {/* Description */}
      <div
        style={{
          marginTop: 10,
          paddingTop: 10,
          borderTop: "1px solid #f3f4f6",
          color: "#374151",
          fontSize: 13,
          lineHeight: 1.5,
          whiteSpace: "pre-wrap",
        }}
      >
        {task.description?.trim() ? (
          task.description
        ) : (
          <span style={{ color: "#9ca3af" }}>No description</span>
        )}
      </div>

      {/* Footer */}
      <div
        style={{
          marginTop: 12,
          display: "flex",
          justifyContent: "space-between",
          gap: 12,
          alignItems: "center",
          color: "#6b7280",
          fontSize: 12,
        }}
      >
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: 999,
              background: "#d1d5db",
              display: "inline-block",
            }}
          />
          <span>
            Due:{" "}
            <span style={{ color: "#111827", fontWeight: 600 }}>
              {new Date(task.dueDateTime).toLocaleString()}
            </span>
          </span>
        </div>

        <span style={{ fontVariantNumeric: "tabular-nums" }}>
          ID: {task.id}
        </span>
      </div>
    </div>
  );
}
