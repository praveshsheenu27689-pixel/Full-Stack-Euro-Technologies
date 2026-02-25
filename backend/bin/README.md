# Bootcamp Backend API

Production-ready Spring Boot REST API for Full Stack Web Development Bootcamp.

## 🚀 Technology Stack

- **Java 21** (LTS)
- **Spring Boot 3.2.1**
- **Spring Security** with JWT
- **Spring Data JPA**
- **MySQL 8.0**
- **HikariCP** Connection Pooling
- **Flyway** Database Migration
- **Swagger/OpenAPI** Documentation
- **JUnit 5** Testing
- **Maven** Build Tool
- **Docker** Containerization

## 📁 Project Structure

```
backend/
├── src/
│   ├── main/
│   │   ├── java/com/bootcamp/api/
│   │   │   ├── config/          # Configuration classes
│   │   │   ├── controller/      # REST Controllers
│   │   │   ├── dto/             # Data Transfer Objects
│   │   │   ├── entity/          # JPA Entities
│   │   │   ├── exception/       # Exception handling
│   │   │   ├── repository/      # Data repositories
│   │   │   ├── security/        # Security & JWT
│   │   │   ├── service/         # Business logic
│   │   │   └── BootcampApiApplication.java
│   │   └── resources/
│   │       ├── application.properties
│   │       ├── application-dev.properties
│   │       ├── application-test.properties
│   │       ├── application-prod.properties
│   │       └── db/migration/    # Flyway SQL scripts
│   └── test/                    # Unit & Integration tests
├── Dockerfile
├── docker-compose.yml
├── pom.xml
└── README.md
```

## 🔧 Prerequisites

- **JDK 21** or higher
- **Maven 3.8+**
- **MySQL 8.0+**
- **Spring Tool Suite (STS)** or IntelliJ IDEA
- **Docker** (optional)

## 📦 Installation & Setup

### Method 1: Using Spring Tool Suite (STS)

#### Step 1: Import Project
```
1. Open Spring Tool Suite
2. File → Import → Maven → Existing Maven Projects
3. Browse to backend folder
4. Click Finish
```

#### Step 2: Setup MySQL Database
```cmd
mysql -u root -p
CREATE DATABASE bootcamp_db;
CREATE USER 'system'@'localhost' IDENTIFIED BY 'pravesh123';
GRANT ALL PRIVILEGES ON bootcamp_db.* TO 'system'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

#### Step 3: Configure Application
Update `src/main/resources/application.properties` if needed:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/bootcamp_db
spring.datasource.username=system
spring.datasource.password=pravesh123
```

#### Step 4: Run Application in STS
```
1. Right-click on project
2. Run As → Spring Boot App
3. Application starts on http://localhost:8080/api
```

### Method 2: Using Command Prompt

#### Step 1: Navigate to Project
```cmd
cd "c:\Users\prave\OneDrive\Documents\Ishu Didi Works\backend"
```

#### Step 2: Build Project
```cmd
mvn clean install
```

#### Step 3: Run Application
```cmd
mvn spring-boot:run
```

Or run the JAR:
```cmd
java -jar target/bootcamp-api-1.0.0.jar
```

### Method 3: Using Docker

#### Step 1: Build and Run with Docker Compose
```cmd
cd "c:\Users\prave\OneDrive\Documents\Ishu Didi Works\backend"
docker-compose up -d
```

This will:
- Start MySQL container
- Build and start Spring Boot application
- Create network and volumes

#### Step 2: Check Status
```cmd
docker-compose ps
docker-compose logs -f app
```

#### Step 3: Stop Services
```cmd
docker-compose down
```

## 🔐 Security Configuration

### JWT Authentication
- **Algorithm**: HS256
- **Token Expiration**: 24 hours
- **Refresh Token**: 7 days

### Default Admin Credentials
```
Username: admin
Password: Admin@123
```

### Password Requirements
- Minimum 8 characters
- At least 1 uppercase letter
- At least 1 lowercase letter
- At least 1 number
- At least 1 special character

## 📚 API Documentation

### Swagger UI
Access interactive API documentation:
```
http://localhost:8080/api/swagger-ui.html
```

### OpenAPI JSON
```
http://localhost:8080/api/v3/api-docs
```

## 🔌 API Endpoints

### Authentication APIs
```
POST   /api/v1/auth/register    - Register new user
POST   /api/v1/auth/login       - Login user
```

### Course APIs
```
GET    /api/v1/courses                    - Get all courses (paginated)
GET    /api/v1/courses/{id}               - Get course by ID
GET    /api/v1/courses/level/{level}      - Get courses by level
GET    /api/v1/courses/search?keyword=    - Search courses
POST   /api/v1/courses                    - Create course (Admin)
PUT    /api/v1/courses/{id}               - Update course (Admin)
DELETE /api/v1/courses/{id}               - Delete course (Admin)
```

### Contact APIs
```
POST   /api/v1/contact              - Submit contact message
GET    /api/v1/contact              - Get all messages (Admin)
GET    /api/v1/contact/{id}         - Get message by ID (Admin)
PATCH  /api/v1/contact/{id}/status  - Update message status (Admin)
```

### Actuator Endpoints
```
GET    /api/actuator/health    - Health check
GET    /api/actuator/info      - Application info
GET    /api/actuator/metrics   - Metrics
```

## 📝 Sample API Requests

### Register User
```bash
curl -X POST http://localhost:8080/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "email": "john@example.com",
    "password": "Password@123",
    "firstName": "John",
    "lastName": "Doe",
    "phone": "1234567890"
  }'
```

### Login
```bash
curl -X POST http://localhost:8080/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "Admin@123"
  }'
```

### Get All Courses
```bash
curl -X GET "http://localhost:8080/api/v1/courses?page=0&size=10"
```

### Create Course (Admin)
```bash
curl -X POST http://localhost:8080/api/v1/courses \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "Full Stack Development",
    "description": "Complete bootcamp course",
    "level": "BEGINNER",
    "duration": "6 months",
    "price": 999.99,
    "instructor": "John Doe",
    "syllabus": "HTML, CSS, JavaScript, React, Node.js, MongoDB"
  }'
```

### Submit Contact Message
```bash
curl -X POST http://localhost:8080/api/v1/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Smith",
    "email": "jane@example.com",
    "phone": "9876543210",
    "courseInterest": "Full Stack Development",
    "message": "I want to enroll in the course"
  }'
```

## 🧪 Testing

### Run All Tests
```cmd
mvn test
```

### Run Specific Test
```cmd
mvn test -Dtest=CourseServiceTest
```

### Run with Coverage
```cmd
mvn clean test jacoco:report
```

## 🚀 Deployment

### Local Deployment
```cmd
mvn clean package
java -jar target/bootcamp-api-1.0.0.jar
```

### Production Deployment

#### Environment Variables
```bash
export SPRING_PROFILES_ACTIVE=prod
export DATABASE_URL=jdbc:mysql://your-db-host:3306/bootcamp_db
export DATABASE_USERNAME=your_username
export DATABASE_PASSWORD=your_password
export JWT_SECRET=your_secret_key_here
export PORT=8080
```

#### Run with Environment Variables
```cmd
java -jar -Dspring.profiles.active=prod target/bootcamp-api-1.0.0.jar
```

### Cloud Deployment (AWS/Azure/GCP)

#### Build JAR
```cmd
mvn clean package -DskipTests
```

#### Deploy to AWS Elastic Beanstalk
```cmd
eb init -p java-21 bootcamp-api
eb create bootcamp-api-env
eb deploy
```

#### Deploy to Heroku
```cmd
heroku create bootcamp-api
heroku addons:create cleardb:ignite
heroku config:set SPRING_PROFILES_ACTIVE=prod
git push heroku main
```

#### Deploy to Azure
```cmd
az webapp create --resource-group myResourceGroup --plan myAppServicePlan --name bootcamp-api --runtime "JAVA:21-java21"
az webapp deploy --resource-group myResourceGroup --name bootcamp-api --src-path target/bootcamp-api-1.0.0.jar
```

### Docker Deployment

#### Build Image
```cmd
docker build -t bootcamp-api:1.0.0 .
```

#### Run Container
```cmd
docker run -d -p 8080:8080 \
  -e SPRING_PROFILES_ACTIVE=prod \
  -e DATABASE_URL=jdbc:mysql://host.docker.internal:3306/bootcamp_db \
  -e DATABASE_USERNAME=system \
  -e DATABASE_PASSWORD=pravesh123 \
  -e JWT_SECRET=your_secret_key \
  --name bootcamp-api \
  bootcamp-api:1.0.0
```

#### Push to Docker Hub
```cmd
docker tag bootcamp-api:1.0.0 yourusername/bootcamp-api:1.0.0
docker push yourusername/bootcamp-api:1.0.0
```

## 🔍 Monitoring & Health Check

### Health Endpoint
```
GET http://localhost:8080/api/actuator/health
```

### Application Metrics
```
GET http://localhost:8080/api/actuator/metrics
```

### Database Connection Check
```cmd
curl http://localhost:8080/api/actuator/health
```

## 🐛 Troubleshooting

### Issue: Port 8080 already in use
```cmd
# Windows
netstat -ano | findstr :8080
taskkill /PID <PID> /F

# Change port in application.properties
server.port=8081
```

### Issue: MySQL Connection Failed
```
1. Check MySQL is running: services.msc
2. Verify credentials in application.properties
3. Check firewall settings
4. Test connection: mysql -u system -p
```

### Issue: Flyway Migration Failed
```cmd
# Reset Flyway
mvn flyway:clean
mvn flyway:migrate

# Or manually
DROP DATABASE bootcamp_db;
CREATE DATABASE bootcamp_db;
```

### Issue: JWT Token Invalid
```
1. Check JWT_SECRET is set correctly
2. Verify token expiration time
3. Clear browser cache/cookies
4. Generate new token by logging in again
```

### Issue: Build Failed
```cmd
# Clean and rebuild
mvn clean install -U

# Skip tests
mvn clean install -DskipTests

# Clear Maven cache
rmdir /s /q %USERPROFILE%\.m2\repository
```

## 📊 Database Schema

### Tables
- **users** - User accounts and authentication
- **courses** - Course information
- **enrollments** - User course enrollments
- **testimonials** - Student reviews
- **contact_messages** - Contact form submissions
- **portfolio_projects** - Student projects
- **audit_logs** - System audit trail

### Indexes
- Email, username, role on users table
- Level, active status on courses table
- User ID, course ID on enrollments
- Status, created date on contact messages

## 🔒 Security Best Practices

1. **Never commit sensitive data** (passwords, keys)
2. **Use environment variables** for production
3. **Enable HTTPS** in production
4. **Implement rate limiting** (configured)
5. **Regular security updates**
6. **Strong password policy** (enforced)
7. **JWT token rotation**
8. **SQL injection prevention** (JPA)
9. **CORS configuration** (configured)
10. **Input validation** (Jakarta Validation)

## 📈 Performance Optimization

- **HikariCP** connection pooling (configured)
- **Caffeine** caching (enabled)
- **Database indexing** (implemented)
- **Lazy loading** for relationships
- **Pagination** for large datasets
- **Query optimization** with JPA
- **Async processing** (enabled)

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## 📄 License

This project is licensed under the Apache License 2.0

## 📞 Support

For issues and questions:
- Email: support@bootcamp.com
- Documentation: http://localhost:8080/api/swagger-ui.html

## 🎯 Next Steps

1. ✅ Setup complete
2. ✅ Database configured
3. ✅ Security implemented
4. ✅ APIs documented
5. 🔄 Connect frontend
6. 🔄 Deploy to production
7. 🔄 Setup CI/CD pipeline
8. 🔄 Configure monitoring

---

**Built with ❤️ using Spring Boot**
