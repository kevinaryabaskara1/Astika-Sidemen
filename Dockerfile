# Gunakan image node untuk build aplikasi Vite
FROM node:alpine3.20 AS build

# Set working directory
WORKDIR /app

# Copy file package.json dan package-lock.json ke container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy seluruh project ke dalam container
COPY . .

# Build aplikasi untuk production
RUN npm run build

# Expose port untuk aplikasi Vite preview
EXPOSE 5173
EXPOSE 4173

# Jalankan Vite preview
CMD ["npm", "run", "preview"]