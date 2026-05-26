import { io } from "socket.io-client";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:5000";

export const socket = io(SOCKET_URL);

export const fetchProjects = async () => {
  const res = await fetch(`${API_BASE_URL}/projects`);
  return res.json();
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
