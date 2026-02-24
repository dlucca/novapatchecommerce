import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import fs from "fs"
import path from "path"

export async function GET(req: MedusaRequest, res: MedusaResponse): Promise<void> {
  const { file } = req.params as { file?: string }

  if (!file) {
    res.status(400).json({ message: "File is required" })
    return
  }

  const safeFile = path.basename(file)
  const baseDir = process.env.NODE_ENV === "production" ? "/app" : process.cwd()
  const filePath = path.join(baseDir, "static", safeFile)

  try {
    const stat = await fs.promises.stat(filePath)
    if (!stat.isFile()) {
      res.status(404).json({ message: "Not a file" })
      return
    }
  } catch {
    res.status(404).json({ message: "File not found" })
    return
  }

  const ext = path.extname(filePath).toLowerCase()
  const contentTypes: { [key: string]: string } = {
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".gif": "image/gif",
    ".webp": "image/webp",
    ".svg": "image/svg+xml",
  }

  const contentType = contentTypes[ext] || "application/octet-stream"

  res.setHeader("Content-Type", contentType)
  res.setHeader("Cache-Control", "public, max-age=86400")
  res.setHeader("Access-Control-Allow-Origin", "*")

  res.sendFile(filePath)
}
