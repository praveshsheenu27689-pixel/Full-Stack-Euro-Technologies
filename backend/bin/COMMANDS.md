# 🎯 ALL COMMANDS - Quick Reference

## 📍 NAVIGATE TO PROJECT
```cmd
cd "c:\Users\prave\OneDrive\Documents\Ishu Didi Works\backend"
```

---

## 🗄️ DATABASE SETUP COMMANDS

### Create Database
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

### Check MySQL Status
```cmd
net start | findstr MySQL
```

### Start MySQL
```cmd
net start MySQL80
```

### Stop MySQL
```cmd
net stop MySQL80
```

---

## 🔨 BUILD COMMANDS

### Clean Build
```cmd
mvn clean
```

### Install Dependencies
```cmd
mvn install
```

### Clean Install
```cmd
mvn clean install
```

### Clean Install (Skip Tests)
```cmd
mvn clean install -DskipTests
```

### Update Dependencies
```cmd
mvn clean install -U
```

### Package JAR
```cmd
mvn clean package
```

### Package JAR (Skip Tests)
```cmd
mvn clean package -DskipTests
```

---

## ▶️ RUN COMMANDS

### Run with Maven
```cmd
mvn spring-boot:run
```

### Run with Maven (Specific Profile)
```cmd
mvn spring-boot:run -Dspring-boot.run.profiles=dev
```

### Run JAR File
```cmd
java -jar target\bootcamp-api-1.0.0.jar
```

### Run JAR (Production Profile)
```cmd
java -jar -Dspring.profiles.active=prod target\bootcamp-api-1.0.0.jar
```

### Run with Environment Variables
```cmd
set SPRING_PROFILES_ACTIVE=prod
set DATABASE_URL=jdbc:mysql://localhost:3306/bootcamp_db
set DATABASE_USERNAME=system
set DATABASE_PASSWORD=pravesh123
java -jar target\bootcamp-api-1.0.0.jar
```

### Run Batch Script
```cmd
run.bat
```

---

## 🧪 TEST COMMANDS

### Run All Tests
```cmd
mvn test
```

### Run Specific Test
```cmd
mvn test -Dtest=CourseServiceTest
```

### Run Tests with Coverage
```cmd
mvn clean test jacoco:report
```

### Skip Tests
```cmd
mvn install -DskipTests
```

---

## 🐳 DOCKER COMMANDS

### Build Docker Image
```cmd
docker build -t bootcamp-api:latest .
```

### Build with Tag
```cmd
docker build -t bootcamp-api:1.0.0 .
```

### Run Docker Container
```cmd
docker run -d -p 8080:8080 --name bootcamp-api bootcamp-api:latest
```

### Run with Environment Variables
```cmd
docker run -d -p 8080:8080 ^
  -e SPRING_PROFILES_ACTIVE=prod ^
  -e DATABASE_URL=jdbc:mysql://host.docker.internal:3306/bootcamp_db ^
  -e DATABASE_USERNAME=system ^
  -e DATABASE_PASSWORD=pravesh123 ^
  --name bootcamp-api ^
  bootcamp-api:latest
```

### Docker Compose Up
```cmd
docker-compose up -d
```

### Docker Compose Down
```cmd
docker-compose down
```

### Docker Compose Logs
```cmd
docker-compose logs -f app
```

### Docker Compose Restart
```cmd
docker-compose restart
```

### View Running Containers
```cmd
docker ps
```

### Stop Container
```cmd
docker stop bootcamp-api
```

### Remove Container
```cmd
docker rm bootcamp-api
```

### View Docker Logs
```cmd
docker logs bootcamp-api
```

### View Docker Logs (Follow)
```cmd
docker logs -f bootcamp-api
```

---

## 🔍 MONITORING COMMANDS

### Check Application Health
```cmd
curl http://localhost:8080/api/actuator/health
```

### Check Application Info
```cmd
curl http://localhost:8080/api/actuator/info
```

### Check Metrics
```cmd
curl http://localhost:8080/api/actuator/metrics
```

### View Logs
```cmd
type logs\bootcamp-api.log
```

### View Logs (Last 50 lines)
```cmd
powershell Get-Content logs\bootcamp-api.log -Tail 50
```

### View Logs (Real-time)
```cmd
powershell Get-Content logs\bootcamp-api.log -Wait
```

### Check Port Usage
```cmd
netstat -ano | findstr :8080
```

### Kill Process on Port
```cmd
taskkill /PID <PID> /F
```

---

## 🌐 API TEST COMMANDS

### Health Check
```cmd
curl http://localhost:8080/api/actuator/health
```

### Register User
```cmd
curl -X POST http://localhost:8080/api/v1/auth/register ^
  -H "Content-Type: application/json" ^
  -d "{\"username\":\"testuser\",\"email\":\"test@example.com\",\"password\":\"Test@123\",\"firstName\":\"Test\",\"lastName\":\"User\",\"phone\":\"1234567890\"}"
```

### Login
```cmd
curl -X POST http://localhost:8080/api/v1/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"username\":\"admin\",\"password\":\"Admin@123\"}"
```

### Get All Courses
```cmd
curl http://localhost:8080/api/v1/courses
```

### Get Course by ID
```cmd
curl http://localhost:8080/api/v1/courses/1
```

### Search Courses
```cmd
curl "http://localhost:8080/api/v1/courses/search?keyword=full"
```

### Create Course (Admin - Replace TOKEN)
```cmd
curl -X POST http://localhost:8080/api/v1/courses ^
  -H "Content-Type: application/json" ^
  -H "Authorization: Bearer YOUR_TOKEN" ^
  -d "{\"title\":\"Full Stack Development\",\"description\":\"Complete course\",\"level\":\"BEGINNER\",\"duration\":\"6 months\",\"price\":999.99,\"instructor\":\"John Doe\"}"
```

### Submit Contact Message
```cmd
curl -X POST http://localhost:8080/api/v1/contact ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"John Doe\",\"email\":\"john@example.com\",\"phone\":\"1234567890\",\"message\":\"I want to enroll\"}"
```

---

## 🗃️ DATABASE COMMANDS

### Connect to MySQL
```cmd
mysql -u system -p
```

### Show Databases
```sql
SHOW DATABASES;
```

### Use Database
```sql
USE bootcamp_db;
```

### Show Tables
```sql
SHOW TABLES;
```

### Describe Table
```sql
DESCRIBE users;
```

### View Users
```sql
SELECT * FROM users;
```

### View Courses
```sql
SELECT * FROM courses;
```

### View Contact Messages
```sql
SELECT * FROM contact_messages;
```

### Reset Database
```sql
DROP DATABASE bootcamp_db;
CREATE DATABASE bootcamp_db;
```

---

## 🔄 FLYWAY COMMANDS

### Run Migrations
```cmd
mvn flyway:migrate
```

### Clean Database
```cmd
mvn flyway:clean
```

### Validate Migrations
```cmd
mvn flyway:validate
```

### Show Migration Info
```cmd
mvn flyway:info
```

---

## 🚀 DEPLOYMENT COMMANDS

### AWS Elastic Beanstalk
```cmd
eb init -p java-21 bootcamp-api
eb create bootcamp-api-prod
eb deploy
eb open
```

### Heroku
```cmd
heroku create bootcamp-api
heroku addons:create cleardb:ignite
git push heroku main
heroku open
```

### Azure
```cmd
az webapp create --resource-group myResourceGroup --plan myAppServicePlan --name bootcamp-api --runtime "JAVA:21-java21"
az webapp deploy --resource-group myResourceGroup --name bootcamp-api --src-path target/bootcamp-api-1.0.0.jar
```

### Google Cloud
```cmd
gcloud app deploy
```

---

## 🛠️ UTILITY COMMANDS

### Check Java Version
```cmd
java -version
```

### Check Maven Version
```cmd
mvn -version
```

### Check Docker Version
```cmd
docker --version
```

### Check MySQL Version
```cmd
mysql --version
```

### List Maven Dependencies
```cmd
mvn dependency:tree
```

### Update Maven Dependencies
```cmd
mvn versions:display-dependency-updates
```

### Clean Maven Cache
```cmd
rmdir /s /q %USERPROFILE%\.m2\repository
```

---

## 📂 FILE OPERATIONS

### View Project Structure
```cmd
tree /F
```

### Count Lines of Code
```cmd
powershell "(Get-ChildItem -Recurse -Include *.java | Get-Content | Measure-Object -Line).Lines"
```

### Find Files
```cmd
dir /s /b *.java
```

---

## 🔐 SECURITY COMMANDS

### Generate JWT Secret
```cmd
powershell "[Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes((New-Guid).ToString()))"
```

### Hash Password (BCrypt)
Use Swagger UI or create a test endpoint

---

## 📊 PERFORMANCE COMMANDS

### Load Test with Apache Bench
```cmd
ab -n 1000 -c 10 http://localhost:8080/api/actuator/health
```

### Memory Usage
```cmd
jcmd <PID> VM.native_memory summary
```

---

## 🎯 QUICK START (ONE COMMAND)

### Option 1: Maven
```cmd
cd "c:\Users\prave\OneDrive\Documents\Ishu Didi Works\backend" && mvn spring-boot:run
```

### Option 2: Docker
```cmd
cd "c:\Users\prave\OneDrive\Documents\Ishu Didi Works\backend" && docker-compose up -d
```

### Option 3: Batch Script
```cmd
cd "c:\Users\prave\OneDrive\Documents\Ishu Didi Works\backend" && run.bat
```

---

## 🌐 BROWSER URLS

```
http://localhost:8080/api/swagger-ui.html
http://localhost:8080/api/v3/api-docs
http://localhost:8080/api/actuator/health
http://localhost:8080/api/actuator/info
http://localhost:8080/api/actuator/metrics
```

---

## 📝 NOTES

- Replace `YOUR_TOKEN` with actual JWT token from login response
- Replace `<PID>` with actual process ID
- All commands assume you're in the backend directory
- Use `Ctrl+C` to stop running applications
- Check logs if any command fails

---

**Keep this file handy for quick reference! 📌**
