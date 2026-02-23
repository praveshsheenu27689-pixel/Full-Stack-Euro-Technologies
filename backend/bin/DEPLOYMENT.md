# Deployment Guide - Bootcamp Backend API

## 📋 Pre-Deployment Checklist

- [ ] Java 21 installed
- [ ] Maven configured
- [ ] MySQL database setup
- [ ] Environment variables configured
- [ ] Application tested locally
- [ ] Docker installed (for containerized deployment)
- [ ] Cloud account setup (AWS/Azure/GCP)

## 🚀 Deployment Methods

### 1. Local Server Deployment

#### Build Application
```cmd
cd "c:\Users\prave\OneDrive\Documents\Ishu Didi Works\backend"
mvn clean package -DskipTests
```

#### Run as Service (Windows)
```cmd
java -jar target/bootcamp-api-1.0.0.jar
```

#### Run as Background Process (Linux)
```bash
nohup java -jar target/bootcamp-api-1.0.0.jar > app.log 2>&1 &
```

### 2. Docker Deployment

#### Build Docker Image
```cmd
docker build -t bootcamp-api:1.0.0 .
```

#### Run Container
```cmd
docker run -d ^
  --name bootcamp-api ^
  -p 8080:8080 ^
  -e SPRING_PROFILES_ACTIVE=prod ^
  -e DATABASE_URL=jdbc:mysql://host.docker.internal:3306/bootcamp_db ^
  -e DATABASE_USERNAME=system ^
  -e DATABASE_PASSWORD=pravesh123 ^
  -e JWT_SECRET=your_secret_key ^
  bootcamp-api:1.0.0
```

#### Using Docker Compose
```cmd
docker-compose up -d
```

### 3. AWS Deployment

#### AWS Elastic Beanstalk

**Step 1: Install EB CLI**
```cmd
pip install awsebcli
```

**Step 2: Initialize**
```cmd
eb init -p java-21 bootcamp-api --region us-east-1
```

**Step 3: Create Environment**
```cmd
eb create bootcamp-api-prod
```

**Step 4: Configure Environment Variables**
```cmd
eb setenv DATABASE_URL=jdbc:mysql://your-rds-endpoint:3306/bootcamp_db
eb setenv DATABASE_USERNAME=admin
eb setenv DATABASE_PASSWORD=your_password
eb setenv JWT_SECRET=your_secret_key
eb setenv SPRING_PROFILES_ACTIVE=prod
```

**Step 5: Deploy**
```cmd
mvn clean package -DskipTests
eb deploy
```

**Step 6: Open Application**
```cmd
eb open
```

#### AWS EC2

**Step 1: Launch EC2 Instance**
- AMI: Amazon Linux 2023
- Instance Type: t2.micro (free tier) or t3.medium
- Security Group: Allow ports 22, 8080, 3306

**Step 2: Connect to Instance**
```cmd
ssh -i your-key.pem ec2-user@your-instance-ip
```

**Step 3: Install Java 21**
```bash
sudo yum update -y
sudo yum install java-21-amazon-corretto -y
java -version
```

**Step 4: Install MySQL**
```bash
sudo yum install mysql-server -y
sudo systemctl start mysqld
sudo systemctl enable mysqld
```

**Step 5: Setup Database**
```bash
mysql -u root -p
CREATE DATABASE bootcamp_db;
CREATE USER 'system'@'%' IDENTIFIED BY 'pravesh123';
GRANT ALL PRIVILEGES ON bootcamp_db.* TO 'system'@'%';
FLUSH PRIVILEGES;
EXIT;
```

**Step 6: Upload JAR File**
```cmd
scp -i your-key.pem target/bootcamp-api-1.0.0.jar ec2-user@your-instance-ip:/home/ec2-user/
```

**Step 7: Run Application**
```bash
export SPRING_PROFILES_ACTIVE=prod
export DATABASE_URL=jdbc:mysql://localhost:3306/bootcamp_db
export DATABASE_USERNAME=system
export DATABASE_PASSWORD=pravesh123
export JWT_SECRET=your_secret_key

nohup java -jar bootcamp-api-1.0.0.jar > app.log 2>&1 &
```

**Step 8: Create Systemd Service**
```bash
sudo nano /etc/systemd/system/bootcamp-api.service
```

Add:
```ini
[Unit]
Description=Bootcamp API
After=syslog.target network.target

[Service]
User=ec2-user
ExecStart=/usr/bin/java -jar /home/ec2-user/bootcamp-api-1.0.0.jar
SuccessExitStatus=143
Environment="SPRING_PROFILES_ACTIVE=prod"
Environment="DATABASE_URL=jdbc:mysql://localhost:3306/bootcamp_db"
Environment="DATABASE_USERNAME=system"
Environment="DATABASE_PASSWORD=pravesh123"
Environment="JWT_SECRET=your_secret_key"

[Install]
WantedBy=multi-user.target
```

Enable and start:
```bash
sudo systemctl daemon-reload
sudo systemctl enable bootcamp-api
sudo systemctl start bootcamp-api
sudo systemctl status bootcamp-api
```

### 4. Azure Deployment

#### Azure App Service

**Step 1: Install Azure CLI**
```cmd
winget install Microsoft.AzureCLI
```

**Step 2: Login**
```cmd
az login
```

**Step 3: Create Resource Group**
```cmd
az group create --name bootcamp-rg --location eastus
```

**Step 4: Create App Service Plan**
```cmd
az appservice plan create --name bootcamp-plan --resource-group bootcamp-rg --sku B1 --is-linux
```

**Step 5: Create Web App**
```cmd
az webapp create --resource-group bootcamp-rg --plan bootcamp-plan --name bootcamp-api-unique --runtime "JAVA:21-java21"
```

**Step 6: Configure Environment Variables**
```cmd
az webapp config appsettings set --resource-group bootcamp-rg --name bootcamp-api-unique --settings ^
  SPRING_PROFILES_ACTIVE=prod ^
  DATABASE_URL=jdbc:mysql://your-mysql-server:3306/bootcamp_db ^
  DATABASE_USERNAME=admin ^
  DATABASE_PASSWORD=your_password ^
  JWT_SECRET=your_secret_key
```

**Step 7: Deploy**
```cmd
mvn clean package -DskipTests
az webapp deploy --resource-group bootcamp-rg --name bootcamp-api-unique --src-path target/bootcamp-api-1.0.0.jar --type jar
```

### 5. Google Cloud Platform (GCP)

#### GCP App Engine

**Step 1: Install gcloud CLI**
Download from: https://cloud.google.com/sdk/docs/install

**Step 2: Initialize**
```cmd
gcloud init
```

**Step 3: Create app.yaml**
```yaml
runtime: java21
instance_class: F2
env_variables:
  SPRING_PROFILES_ACTIVE: "prod"
  DATABASE_URL: "jdbc:mysql://your-cloud-sql-ip:3306/bootcamp_db"
  DATABASE_USERNAME: "system"
  DATABASE_PASSWORD: "pravesh123"
  JWT_SECRET: "your_secret_key"
```

**Step 4: Deploy**
```cmd
mvn clean package -DskipTests
gcloud app deploy
```

### 6. Heroku Deployment

**Step 1: Install Heroku CLI**
```cmd
npm install -g heroku
```

**Step 2: Login**
```cmd
heroku login
```

**Step 3: Create Application**
```cmd
heroku create bootcamp-api-unique
```

**Step 4: Add MySQL Database**
```cmd
heroku addons:create cleardb:ignite
```

**Step 5: Get Database URL**
```cmd
heroku config:get CLEARDB_DATABASE_URL
```

**Step 6: Set Environment Variables**
```cmd
heroku config:set SPRING_PROFILES_ACTIVE=prod
heroku config:set DATABASE_URL=jdbc:mysql://your-cleardb-url
heroku config:set DATABASE_USERNAME=your_username
heroku config:set DATABASE_PASSWORD=your_password
heroku config:set JWT_SECRET=your_secret_key
```

**Step 7: Create Procfile**
```
web: java -jar target/bootcamp-api-1.0.0.jar
```

**Step 8: Deploy**
```cmd
git init
git add .
git commit -m "Initial commit"
heroku git:remote -a bootcamp-api-unique
git push heroku main
```

## 🔒 Production Security Checklist

- [ ] Change default admin password
- [ ] Use strong JWT secret (minimum 256 bits)
- [ ] Enable HTTPS/SSL
- [ ] Configure firewall rules
- [ ] Set up database backups
- [ ] Enable application monitoring
- [ ] Configure log aggregation
- [ ] Set up alerts for errors
- [ ] Implement rate limiting
- [ ] Use environment variables for secrets
- [ ] Enable CORS only for trusted domains
- [ ] Regular security updates
- [ ] Database connection encryption

## 📊 Post-Deployment Verification

### Health Check
```cmd
curl https://your-domain.com/api/actuator/health
```

### API Test
```cmd
curl https://your-domain.com/api/v1/courses
```

### Load Test
```cmd
ab -n 1000 -c 10 https://your-domain.com/api/actuator/health
```

## 🔄 CI/CD Pipeline Setup

### GitHub Actions (Already configured)
- Push to main branch triggers deployment
- Automated testing before deployment
- Docker image build and push
- Deployment to production

### Jenkins Pipeline
```groovy
pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                sh 'mvn clean package'
            }
        }
        stage('Test') {
            steps {
                sh 'mvn test'
            }
        }
        stage('Deploy') {
            steps {
                sh 'scp target/*.jar user@server:/app/'
                sh 'ssh user@server "systemctl restart bootcamp-api"'
            }
        }
    }
}
```

## 📈 Monitoring Setup

### Application Monitoring
- Use Spring Boot Actuator endpoints
- Integrate with Prometheus + Grafana
- Set up CloudWatch (AWS) or Application Insights (Azure)

### Database Monitoring
- Enable slow query log
- Monitor connection pool metrics
- Set up automated backups

### Log Management
- Use ELK Stack (Elasticsearch, Logstash, Kibana)
- Or use cloud-native solutions (CloudWatch Logs, Azure Monitor)

## 🆘 Rollback Procedure

### Docker Deployment
```cmd
docker stop bootcamp-api
docker rm bootcamp-api
docker run -d --name bootcamp-api bootcamp-api:previous-version
```

### Traditional Deployment
```cmd
systemctl stop bootcamp-api
cp /backup/bootcamp-api-previous.jar /app/bootcamp-api.jar
systemctl start bootcamp-api
```

## 📞 Support

For deployment issues:
- Check logs: `docker logs bootcamp-api` or `journalctl -u bootcamp-api`
- Verify environment variables
- Check database connectivity
- Review security group/firewall rules

---

**Deployment completed successfully! 🎉**
