import React, { useMemo, useState } from "react";
import type { TaskStatus, Task } from "../types";
import { createTask, type AxiosErrorResponse } from "../api/tasks";
import axios from "axios";

const statuses: TaskStatus[] = ["TODO", "IN_PROGRESS", "DONE"];

type ViolationsPayload = {
  message?: string;
  violations?: Array<{ field: string; message: string }>;
};

const inputBase: React.CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: 10,
  border: "1px solid #e5e7eb",
  background: "#fff",
  outline: "none",
  fontSize: 14,
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: 13,
  fontWeight: 600,
  color: "#111827",
  marginBottom: 6,
};

const helpStyle: React.CSSProperties = {
  fontSize: 12,
  color: "#6b7280",
  marginTop: 6,
  lineHeight: 1.35,
};

const errorText: React.CSSProperties = {
  marginTop: 6,
  fontSize: 12,
  color: "#b91c1c",
};

const fieldWrapper: React.CSSProperties = {
  display: "grid",
  gap: 6,
};

export const TaskForm = ({ onCreated }: { onCreated: (t: Task) => void }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<TaskStatus>("TODO");
  const [dueDateTimeLocal, setDueDateTimeLocal] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const dueDateTimeIso = useMemo(() => {
    if (!dueDateTimeLocal) return "";
    return new Date(dueDateTimeLocal);
  }, [dueDateTimeLocal]);

  const hasAnyFieldError = Object.keys(fieldErrors).length > 0;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setFieldErrors({});
    setSubmitting(true);

    try {
      const task = await createTask({
        title,
        description: description || undefined,
        status,
        dueDateTime: dueDateTimeIso,
      });

      onCreated(task);
      setTitle("");
      setDescription("");
      setStatus("TODO");
      setDueDateTimeLocal("");
    } catch (err: unknown) {
      // Defaults
      setErrorMsg("Failed");
      setFieldErrors({});

      // Only handle axios errors with a response payload
      if (!axios.isAxiosError(err) || !err.response) return;

      const axErr = err as AxiosErrorResponse<ViolationsPayload>;
      const data = axErr.response.data;

      setErrorMsg(data?.message ?? "Failed");

      const violations = Array.isArray(data?.violations) ? data.violations : [];
      const mapped: Record<string, string> = {};

      for (const v of violations) {
        if (v?.field) mapped[v.field] = v?.message ?? "";
      }

      setFieldErrors(mapped);
    } finally {
      setSubmitting(false);
    }
  };

  const fieldStyle = (fieldName: string): React.CSSProperties => {
    const hasError = Boolean(fieldErrors[fieldName]);
    return {
      ...inputBase,
      border: hasError ? "1px solid #fca5a5" : inputBase.border,
      background: hasError ? "#fff5f5" : inputBase.background,
      boxShadow: hasError ? "0 0 0 3px rgba(239,68,68,0.12)" : "none",
    };
  };

  return (
    <form
      onSubmit={onSubmit}
      style={{
        marginTop: 12,
        display: "grid",
        gap: 14,
      }}
    >
      {/* Top hint / status */}
      <div
        style={{
          padding: "10px 12px",
          borderRadius: 12,
          border: hasAnyFieldError ? "1px solid #fecaca" : "1px solid #e5e7eb",
          background: hasAnyFieldError ? "#fff5f5" : "#f9fafb",
          color: hasAnyFieldError ? "#991b1b" : "#374151",
          fontSize: 13,
          lineHeight: 1.35,
        }}
      >
        <div style={{ fontWeight: 700, marginBottom: 2 }}>
          {hasAnyFieldError
            ? "Please fix the highlighted fields"
            : "Create a task"}
        </div>
        <div style={{ opacity: 0.9 }}>
          Fields marked <b>*</b> are required.
        </div>
      </div>

      {/* Title */}
      <div style={fieldWrapper}>
        <label style={labelStyle} htmlFor="title">
          Title <span style={{ color: "#ef4444" }}>*</span>
        </label>
        <input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Review evidence bundle"
          style={fieldStyle("title")}
        />
        {fieldErrors.title ? (
          <div style={errorText}>{fieldErrors.title}</div>
        ) : (
          <div style={helpStyle}>Keep it short and action-focused.</div>
        )}
      </div>

      {/* Description */}
      <div style={fieldWrapper}>
        <label style={labelStyle} htmlFor="description">
          Description{" "}
          <span style={{ color: "#6b7280", fontWeight: 500 }}>(optional)</span>
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add context, links, or acceptance criteria…"
          rows={4}
          style={{
            ...fieldStyle("description"),
            resize: "vertical",
            minHeight: 96,
          }}
        />
        {fieldErrors.description && (
          <div style={errorText}>{fieldErrors.description}</div>
        )}
      </div>

      <div style={fieldWrapper}>
          <label style={labelStyle} htmlFor="status">
            Status <span style={{ color: "#ef4444" }}>*</span>
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value as TaskStatus)}
            style={fieldStyle("status")}
          >
            {statuses.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          {fieldErrors.status && (
            <div style={errorText}>{fieldErrors.status}</div>
          )}
        </div>

        <div style={fieldWrapper}>
          <label style={labelStyle} htmlFor="dueDateTime">
            Due date/time <span style={{ color: "#ef4444" }}>*</span>
          </label>
          <input
            id="dueDateTime"
            type="datetime-local"
            value={dueDateTimeLocal}
            onChange={(e) => setDueDateTimeLocal(e.target.value)}
            style={fieldStyle("dueDateTime")}
          />
          {fieldErrors.dueDateTime ? (
            <div style={errorText}>{fieldErrors.dueDateTime}</div>
          ) : (
            <div style={helpStyle}>
              Use local time (your browser’s timezone).
            </div>
          )}
        </div>

      {/* Global error */}
      {errorMsg && (
        <div
          role="alert"
          style={{
            padding: "10px 12px",
            borderRadius: 12,
            border: "1px solid #fecaca",
            background: "#fff5f5",
            color: "#991b1b",
            fontSize: 13,
            display: "flex",
            gap: 8,
            alignItems: "flex-start",
          }}
        >
          <span style={{ lineHeight: "18px" }}>❌</span>
          <div>
            <div style={{ fontWeight: 700 }}>Couldn’t create task</div>
            <div style={{ opacity: 0.95 }}>{errorMsg}</div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <button
          disabled={submitting}
          style={{
            padding: "11px 14px",
            borderRadius: 12,
            border: "1px solid #1f2937",
            background: submitting ? "#111827" : "#111827",
            color: "#fff",
            fontWeight: 700,
            cursor: submitting ? "not-allowed" : "pointer",
            opacity: submitting ? 0.7 : 1,
            flex: 1,
          }}
        >
          {submitting ? "Creating..." : "Create task"}
        </button>

        <button
          type="button"
          onClick={() => {
            setTitle("");
            setDescription("");
            setStatus("TODO");
            setDueDateTimeLocal("");
            setErrorMsg(null);
            setFieldErrors({});
          }}
          disabled={submitting}
          style={{
            padding: "11px 14px",
            borderRadius: 12,
            border: "1px solid #e5e7eb",
            background: "#fff",
            color: "#111827",
            fontWeight: 600,
            cursor: submitting ? "not-allowed" : "pointer",
            opacity: submitting ? 0.7 : 1,
          }}
        >
          Clear
        </button>
      </div>
    </form>
  );
};
