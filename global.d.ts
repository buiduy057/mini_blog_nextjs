// global.d.ts
declare global {
  // Định nghĩa prisma vào globalThis
  // để tránh tạo nhiều instance khi hot reload ở dev
  var prisma: import("@prisma/client").PrismaClient | undefined;
}

export {};
