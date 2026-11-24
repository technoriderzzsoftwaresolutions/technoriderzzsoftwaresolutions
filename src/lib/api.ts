import { io } from "socket.io-client";

const API_BASE_URL = "/api";

// Safe in-memory event bus compatible with Socket.IO interface
type EventHandler = (...args: any[]) => void;

class FallbackSocket {
  private listeners: Map<string, Set<EventHandler>> = new Map();

  on(event: string, fn: EventHandler) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(fn);
    return this;
  }

  off(event: string, fn?: EventHandler) {
    if (!fn) {
      this.listeners.delete(event);
    } else {
      this.listeners.get(event)?.delete(fn);
    }
    return this;
  }

  emit(event: string, ...args: any[]) {
    this.listeners.get(event)?.forEach(fn => {
      try {
        fn(...args);
      } catch (err) {
        console.error(`Error in event listener for ${event}:`, err);
      }
    });
    return this;
  }
}

// Only connect to Socket.IO if explicitly configured with an external server URL
// or running locally. On Vercel serverless, standard persistent WebSockets are not supported.
const isBrowser = typeof window !== "undefined";
const isLocal = isBrowser && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1");
const customSocketUrl = import.meta.env.VITE_SOCKET_URL;
const shouldConnectSocket = isBrowser && (isLocal || (customSocketUrl && !customSocketUrl.startsWith("/")));

export const socket: any = shouldConnectSocket
  ? io(customSocketUrl || "http://localhost:5000", {
      autoConnect: true,
      reconnectionAttempts: 2,
      timeout: 3000,
      transports: ["polling", "websocket"]
    })
  : new FallbackSocket();

export const fetchProjects = async (category?: string) => {
  const url = category 
    ? `${API_BASE_URL}/projects?category=${encodeURIComponent(category)}`
    : `${API_BASE_URL}/projects`;
  const res = await fetch(url);
  return res.json();
};

export const addProject = async (projectData) => {
  const res = await fetch(`${API_BASE_URL}/projects`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(projectData)
  });
  return res.ok;
};

export const fetchProjectById = async (id: string) => {
  const res = await fetch(`${API_BASE_URL}/projects/${id}`);
  return res.json();
};

export const fetchCourses = async () => {
  const res = await fetch(`${API_BASE_URL}/courses`);
  return res.json();
};

export const fetchCourseById = async (id: string) => {
  const res = await fetch(`${API_BASE_URL}/courses/${id}`);
  return res.json();
};

export const fetchInternships = async () => {
  const res = await fetch(`${API_BASE_URL}/internships`);
  return res.json();
};

export const fetchInternshipById = async (id: string) => {
  const res = await fetch(`${API_BASE_URL}/internships/${id}`);
  return res.json();
};

export const fetchServices = async () => {
  const res = await fetch(`${API_BASE_URL}/services`);
  return res.json();
};

export const submitContact = async (data) => {
  const res = await fetch(`${API_BASE_URL}/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
};
