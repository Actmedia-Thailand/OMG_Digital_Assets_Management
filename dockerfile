# Dockerfile
FROM node:18-alpine

# ตั้งค่า working directory
WORKDIR /app

# คัดลอก package.json และ package-lock.json
COPY package*.json ./

# ติดตั้ง dependencies
RUN npm install

# คัดลอกโค้ดทั้งหมดไปยัง container
COPY . .

# สร้างโปรเจกต์
RUN npm run build

# เปิดพอร์ต 3000
EXPOSE 3000

# รันแอปพลิเคชัน
CMD ["npm", "start"]