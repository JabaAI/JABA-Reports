# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Build-time environment variables
ARG VITE_AVAILABLE_REPORTS
ENV VITE_AVAILABLE_REPORTS=$VITE_AVAILABLE_REPORTS

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application (increase heap for large JSON data files)
RUN NODE_OPTIONS="--max-old-space-size=4096" npm run build

# Production stage
FROM nginx:alpine

# Copy custom nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Cloud Run uses PORT environment variable (default 8080)
EXPOSE 8080

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
