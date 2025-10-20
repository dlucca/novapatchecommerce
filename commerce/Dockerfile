FROM node:20-alpine

RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package*.json ./
COPY .npmrc ./

RUN npm install --production=false

COPY . .
RUN npm run build
RUN ls -laR .medusa/server/public/admin || (echo "ERROR: Admin not built!" && exit 1)

CMD ["sh", "-c", "npx medusa db:migrate && npm run start"]

EXPOSE 9000