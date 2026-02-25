# 🚀 EXECUTION GUIDE - Step by Step

## ⚡ FASTEST WAY TO RUN (Choose ONE)

### Option 1: Using Batch Script (EASIEST)
```cmd
cd "c:\Users\prave\OneDrive\Documents\Ishu Didi Works\backend"
run.bat
```
Then select option 2 to run the application.

### Option 2: Using Maven Command
```cmd
cd "c:\Users\prave\OneDrive\Documents\Ishu Didi Works\backend"
mvn spring-boot:run
```

### Option 3: Using Docker (NO MYSQL SETUP NEEDED)
```cmd
cd "c:\Users\prave\OneDrive\Documents\Ishu Didi Works\backend"
docker-compose up -d
```

---

## 📋 COMPLETE STEP-BY-STEP GUIDE

### STEP 1: Setup MySQL Database (Skip if using Docker)

Open Command Prompt as Administrator:
```cmd
mysql -u root -p
```

Enter your MySQL root password, then run:
```sql
CREATE DATABASE bootcamp_db;
CREATE USER 'system'@'localhost' IDENTIFIED BY 'pravesh123';
GRANT ALL PRIVILEGES ON bootcamp_db.* TO 'system'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### STEP 2: Navigate to Backend Folder
```cmd
cd "c:\Users\prave\OneDrive\Documents\Ishu Didi Works\backend"
```

### STEP 3: Build the Project
```cmd
mvn clean install
```

Expected output: `BUILD SUCCESS`

### STEP 4: Run the Application

Choose ONE method:

#### Method A: Maven Spring Boot Plugin
```cmd
mvn spring-boot:run
```

#### Method B: Run JAR File
```cmd
java -jar target\bootcamp-api-1.0.0.jar
```

#### Method C: Using Batch Script
```cmd
run.bat
```
Select option 2

### STEP 5: Verify Application is Running

Open browser and visit:
```
http://localhost:8080/api/actuator/health
```

You should see:
```json
{"status":"UP"}
```

### STEP 6: Access Swagger Documentation
```
http://localhost:8080/api/swagger-ui.html
```

---

## 🧪 TESTING THE API

### Test 1: Health Check
```cmd
curl http://localhost:8080/api/actuator/health
```

### Test 2: Login as Admin
```cmd
curl -X POST http://localhost:8080/api/v1/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"username\":\"admin\",\"password\":\"Admin@123\"}"
```

Copy the `token` from the response.

### Test 3: Get All Courses
```cmd
curl http://localhost:8080/api/v1/courses
```

### Test 4: Create a Course (Replace YOUR_TOKEN)
```cmd
curl -X POST http://localhost:8080/api/v1/courses ^
  -H "Content-Type: application/json" ^
  -H "Authorization: Bearer YOUR_TOKEN" ^
  -d "{\"title\":\"Full Stack Development\",\"description\":\"Complete bootcamp\",\"level\":\"BEGINNER\",\"duration\":\"6 months\",\"price\":999.99,\"instructor\":\"John Doe\"}"
```

### Test 5: Submit Contact Message
```cmd
curl -X POST http://localhost:8080/api/v1/contact ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"Test User\",\"email\":\"test@example.com\",\"phone\":\"1234567890\",\"message\":\"Test message\"}"
```

---

## 🐳 DOCKER EXECUTION (RECOMMENDED FOR BEGINNERS)

### Start Everything with One Command
```cmd
cd "c:\Users\prave\OneDrive\Documents\Ishu Didi Works\backend"
docker-compose up -d
```

This will:
- ✅ Start MySQL database
- ✅ Build Spring Boot application
- ✅ Start the API server
- ✅ Create network and volumes

### Check Status
```cmd
docker-compose ps
```

### View Logs
```cmd
docker-compose logs -f app
```

### Stop Everything
```cmd
docker-compose down
```

---

## 🔧 SPRING TOOL SUITE (STS) EXECUTION

### Step 1: Import Project
1. Open Spring Tool Suite
2. File → Import → Maven → Existing Maven Projects
3. Browse to: `c:\Users\prave\OneDrive\Documents\Ishu Didi Works\backend`
4. Click Finish

### Step 2: Wait for Dependencies
- STS will download all Maven dependencies
- Wait for "Building workspace" to complete

### Step 3: Run Application
1. Right-click on project
2. Run As → Spring Boot App
3. Wait for console message: "Started BootcampApiApplication"

### Step 4: Verify
Open browser: http://localhost:8080/api/actuator/health

---

## 📊 MONITORING & LOGS

### View Application Logs
```cmd
type logs\bootcamp-api.log
```

### Real-time Log Monitoring
```cmd
powershell Get-Content logs\bootcamp-api.log -Wait
```

### Check Running Process
```cmd
netstat -ano | findstr :8080
```

---

## 🛑 STOPPING THE APPLICATION

### If running with Maven
Press `Ctrl + C` in the command prompt

### If running as JAR
```cmd
# Find process ID
netstat -ano | findstr :8080

# Kill process (replace PID)
taskkill /PID <PID> /F
```

### If running with Docker
```cmd
docker-compose down
```

### If running in STS
Click the red square (Stop) button in Console view

---

## 🔍 TROUBLESHOOTING

### Problem: Port 8080 already in use
```cmd
# Find what's using port 8080
netstat -ano | findstr :8080

# Kill the process
taskkill /PID <PID> /F

# Or change port in application.properties
server.port=8081
```

### Problem: MySQL connection failed
```cmd
# Check if MySQL is running
net start | findstr MySQL

# Start MySQL if not running
net start MySQL80

# Test connection
mysql -u system -p
```

### Problem: Build failed
```cmd
# Clean and rebuild
mvn clean install -U

# Skip tests if needed
mvn clean install -DskipTests
```

### Problem: Out of memory
```cmd
# Increase Maven memory
set MAVEN_OPTS=-Xmx1024m

# Then rebuild
mvn clean install
```

### Problem: Flyway migration failed
```cmd
# Reset database
mysql -u root -p
DROP DATABASE bootcamp_db;
CREATE DATABASE bootcamp_db;
EXIT;

# Restart application
mvn spring-boot:run
```

---

## ✅ SUCCESS CHECKLIST

After running, verify these:

- [ ] Application starts without errors
- [ ] Health endpoint returns `{"status":"UP"}`
- [ ] Swagger UI loads at http://localhost:8080/api/swagger-ui.html
- [ ] Can login with admin/Admin@123
- [ ] Can fetch courses list
- [ ] Database tables are created
- [ ] Logs are being written to logs/bootcamp-api.log

---

## 🎯 QUICK COMMANDS REFERENCE

```cmd
# Navigate to project
cd "c:\Users\prave\OneDrive\Documents\Ishu Didi Works\backend"

# Build
mvn clean install

# Run
mvn spring-boot:run

# Test
mvn test

# Package
mvn clean package

# Docker build
docker build -t bootcamp-api .

# Docker run
docker-compose up -d

# Docker stop
docker-compose down

# View logs
type logs\bootcamp-api.log

# Check health
curl http://localhost:8080/api/actuator/health
```

---

## 🌐 IMPORTANT URLS

| Service | URL |
|---------|-----|
| API Base | http://localhost:8080/api/v1 |
| Swagger UI | http://localhost:8080/api/swagger-ui.html |
| API Docs | http://localhost:8080/api/v3/api-docs |
| Health Check | http://localhost:8080/api/actuator/health |
| Metrics | http://localhost:8080/api/actuator/metrics |

---

## 📞 NEED HELP?

1. Check README.md for detailed documentation
2. Check QUICKSTART.md for 5-minute setup
3. Check DEPLOYMENT.md for deployment options
4. Check PROJECT_SUMMARY.md for project overview
5. Check logs/bootcamp-api.log for error details

---

## 🎉 YOU'RE ALL SET!

Your backend is now running and ready to serve your frontend application!

**Next Steps:**
1. ✅ Backend is running
2. 🔄 Connect your frontend
3. 🔄 Test all APIs
4. 🔄 Deploy to production

**Happy Coding! 🚀**
