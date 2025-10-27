import http from "http";
import fs from "fs/promises";
import path from "path";

export function getContentType(extension) {
  const mimeTypes = {
    ".html": "text/html",
    ".js": "text/javascript",
    ".css": "text/css",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".svg": "image/svg+xml"
  };
  return mimeTypes[extension] || "application/octet-stream";
}

export async function readFile(filePath) {
  try {
    const data = await fs.readFile(filePath);
    return { success: true, data };
  } catch {
    return { success: false, data: null };
  }
}

export const server = http.createServer(async (req, res) => {
  const filePath = path.join(process.cwd(), req.url === "/" ? "index.html" : req.url);
  const ext = path.extname(filePath).toLowerCase();
  const contentType = getContentType(ext);

  const file = await readFile(filePath);

  if (file.success === false) {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("File not found");
    return;
  }

  res.writeHead(200, { "Content-Type": contentType });
  res.end(file.data);
});
