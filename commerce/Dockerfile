# Build stage
FROM node:20-alpine AS builder

RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package*.json ./
COPY .npmrc ./

RUN npm install --production=false

COPY . .
RUN npm run build

# Production stage
FROM node:20-alpine AS runner

RUN apk add --no-cache libc6-compat

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY .npmrc ./

# Install only production dependencies
RUN npm ci --production

# Copy built files from builder
COPY --from=builder /app/.medusa /app/.medusa
COPY --from=builder /app/node_modules/.medusa /app/node_modules/.medusa
COPY --from=builder /app/dist /app/dist

# Copy source files needed at runtime
COPY medusa-config.ts ./
COPY instrumentation.ts ./
COPY src ./src
COPY static ./static

# Verify admin exists
RUN ls -la .medusa/server/public/admin/index.html || (echo "ERROR: Admin not found!" && exit 1)

CMD ["sh", "-c", "npx medusa db:migrate && npm run start"]

EXPOSE 9000