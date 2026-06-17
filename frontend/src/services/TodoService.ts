import { env } from "@/envs/Environment";
import type { Todo } from "@/interfaces/Todo";

export async function findTodos(): Promise<Todo[]> {
  try {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImVtYWlsIjoiZ2l1bGlhbm9AZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzgxNjU3MjEyLCJleHAiOjE3ODE2NjA4MTJ9.7AIo0icvugvcMMgv9XCEEclCSlaRuAI8MbLgQY8-a10'
    const res = await fetch(`${env.apiBaseUrl}/todos`, {
      method: "GET",
      headers: {
        "Content-Type": "applications/json",
        Authorization: `Bearer ${token}`
      },
    });
    return await res.json()
  } catch (error) {
    console.error('Error fetching todos:', error)
  }
}
