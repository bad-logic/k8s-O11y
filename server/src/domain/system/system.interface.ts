export interface HealthCheck {
  server: { status: string; uptime: string };
  memory: Partial<NodeJS.MemoryUsage>;
}
