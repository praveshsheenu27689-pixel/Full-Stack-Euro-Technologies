# Quick Start Guide - Bootcamp Backend API

## 🚀 Fastest Way to Run (5 Minutes)

### Step 1: Setup MySQL Database (2 minutes)
```cmd
mysql -u root -p
```
```sql
CREATE DATABASE bootcamp_db;
CREATE USER 'system'@'localhost' IDENTIFIED BY 'pravesh123';
GRANT ALL PRIVILEGES ON bootcamp_db.* TO 'system'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### Step 2: Navigate to Backend Folder
```cmd
cd "c:\Users\prave\OneDrive\Documents\Ishu Didi Works\backend"
```

### Step 3: Run Application (Choose ONE method)

#### Option A: Using Maven (Recommended)
```cmd
mvn spring-boot:run
```

#### Option B: Using Spring Tool Suite
1. Open STS
2. File → Import → Maven → Existing Maven Projects
3. Select backend folder
4. Right-click project → Run As → Spring Boot App

#### Option C: Using Docker
```cmd
docker-compose up -d
```

### Step 4: Verify Application is Running
Open browser: http://localhost:8080/api/actuator/health

Should see: `{"status":"UP"}`

### Step 5: Access Swagger Documentation
Open browser: http://localhost:8080/api/swagger-ui.html

## 🎯 Test the API

### 1. Login as Admin
```cmd
curl -X POST http://localhost:8080/api/v1/auth/login -H "Content-Type: application/json" -d "{\"username\":\"admin\",\"password\":\"Admin@123\"}"
```

Copy the `token` from response.

### 2. Get All Courses
```cmd
curl http://localhost:8080/api/v1/courses
```

### 3. Create a Course (Use token from step 1)
```cmd
curl -X POST http://localhost:8080/api/v1/courses -H "Content-Type: application/json" -H "Authorization: Bearer YOUR_TOKEN_HERE" -d "{\"title\":\"Full Stack Development\",\"description\":\"Complete course\",\"level\":\"BEGINNER\",\"duration\":\"6 months\",\"price\":999.99,\"instructor\":\"John Doe\"}"
```

## ✅ Success Indicators

- ✅ Application starts without errors
- ✅ Health endpoint returns UP
- ✅ Swagger UI loads
- ✅ Can login with admin credentials
- ✅ Can fetch courses list

## 🐛 Common Issues

**Port 8080 in use?**
```cmd
netstat -ano | findstr :8080
taskkill /PID <PID> /F
```

**MySQL not running?**
```cmd
net start MySQL80
```

**Build failed?**
```cmd
mvn clean install -U
```

## 📱 Connect Your Frontend

Update your frontend API base URL to:
```
http://localhost:8080/api/v1
```

## 🎉 You're Ready!

Your backend is now running and ready to serve your frontend application.

**API Base URL:** http://localhost:8080/api/v1
**Swagger Docs:** http://localhost:8080/api/swagger-ui.html
**Health Check:** http://localhost:8080/api/actuator/health
