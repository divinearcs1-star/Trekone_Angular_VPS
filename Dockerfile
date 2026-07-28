# ---------- Build Stage ----------
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./

# Faster and deterministic install
RUN --mount=type=cache,target=/root/.npm npm ci

COPY . .

RUN npm run build

# ---------- Production Stage ----------
FROM nginx:1.28-alpine

# Remove default nginx files
RUN rm -rf /usr/share/nginx/html/*

COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Copy Angular build
COPY --from=build /app/dist/clients/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]