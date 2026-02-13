import { defineMiddlewares } from "@medusajs/medusa"
import { NextFunction, Request, Response } from "express"
import path from "path"
import fs from "fs"

const serveStaticFiles = (req: Request, res: Response, next: NextFunction) => {
  if (!req.path.startsWith("/static")) {
    return next()
  }

  const baseDir = process.env.NODE_ENV === "production" ? "/app" : process.cwd()
  const filePath = path.join(baseDir, req.path)

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ message: "File not found" })
  }

  const stat = fs.statSync(filePath)
  if (!stat.isFile()) {
    return res.status(404).json({ message: "Not a file" })
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

  return res.sendFile(filePath)
}

export default defineMiddlewares({
  routes: [
    {
      matcher: "/static/*",
      middlewares: [serveStaticFiles],
    },
  ],
})
