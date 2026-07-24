// The one data path: same-origin /api fetches (vite proxies to the backend in
// dev/preview; production serves the SPA and the API from one origin).

export class ApiError extends Error {
  status: number;
  constructor(status: number, path: string) {
    super(`${status} for ${path}`);
    this.status = status;
  }
}

export async function getJson<T>(path: string): Promise<T> {
  const response = await fetch(path);
  if (!response.ok) throw new ApiError(response.status, path);
  return response.json() as Promise<T>;
}
