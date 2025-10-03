import test from "node:test";
import assert from "node:assert/strict";
import fs from "fs/promises";
import path from "path";
import os from "os";
import { getContentType, readFile, server } from "../src/server.js";

// --- Tests pour getContentType ---
test("getContentType retourne le bon type MIME", () => {
  assert.equal(getContentType(".html"), "text/html");
  assert.equal(getContentType(".js"), "text/javascript");
  assert.equal(getContentType(".css"), "text/css");
  assert.equal(getContentType(".png"), "image/png");
  assert.equal(getContentType(".jpg"), "image/jpeg");
  assert.equal(getContentType(".jpeg"), "image/jpeg");
  assert.equal(getContentType(".svg"), "image/svg+xml");
  assert.equal(getContentType(".unknown"), "application/octet-stream");
});

// --- Tests pour readFile ---
test("readFile retourne success true pour un fichier existant", async () => {
  const tempFile = path.join(os.tmpdir(), "temp_test.txt");
  await fs.writeFile(tempFile, "Hello World");

  const result = await readFile(tempFile);
  assert.equal(result.success, true);
  assert.equal(result.data.toString(), "Hello World");

  await fs.unlink(tempFile);
});

test("readFile retourne success false pour un fichier inexistant", async () => {
  const result = await readFile("fichier_inexistant.txt");
  assert.equal(result.success, false);
  assert.equal(result.data, null);
});

test("GET / renvoie index.html", async () => {
  const tempDir = os.tmpdir();
  const tempFile = path.join(tempDir, "index.html");
  await fs.writeFile(tempFile, "<h1>Hello Test</h1>");

  const oldCwd = process.cwd();
  process.chdir(tempDir);

  await new Promise((resolve) => server.listen(0, resolve));
  const port = server.address().port;

  const res = await fetch(`http://localhost:${port}/`);
  const text = await res.text();

  assert.equal(res.status, 200);
  assert.equal(res.headers.get("content-type"), "text/html");
  assert.equal(text, "<h1>Hello Test</h1>");

  process.chdir(oldCwd);
  await fs.unlink(tempFile);
  await new Promise((resolve) => server.close(resolve));
});

test("GET /fichier_inexistant renvoie 404", async () => {
  await new Promise((resolve) => server.listen(0, resolve));
  const port = server.address().port;

  const res = await fetch(`http://localhost:${port}/fichier_inexistant`);
  const text = await res.text();

  assert.equal(res.status, 404);
  assert.equal(text, "File not found");

  await new Promise((resolve) => server.close(resolve));
});
