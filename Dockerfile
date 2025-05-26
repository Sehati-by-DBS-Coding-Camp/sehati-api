# Gunakan image Node.js resmi sebagai base image
FROM node:20

# Set working directory di dalam container
WORKDIR /app

# Salin file package.json dan package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Salin semua source code ke dalam container
COPY . .

# Jalankan aplikasi
CMD ["npm", "start"]

# Jika aplikasi berjalan di port tertentu (misal 3000), expose port tersebut
EXPOSE 3000