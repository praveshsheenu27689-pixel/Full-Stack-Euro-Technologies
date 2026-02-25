@echo off
echo ========================================
echo Bootcamp Backend API - Quick Start
echo ========================================
echo.

:menu
echo Choose an option:
echo 1. Build Project
echo 2. Run Application
echo 3. Run Tests
echo 4. Build Docker Image
echo 5. Start Docker Compose
echo 6. Stop Docker Compose
echo 7. Clean Build
echo 8. Package JAR
echo 9. View Logs
echo 0. Exit
echo.

set /p choice="Enter your choice (0-9): "

if "%choice%"=="1" goto build
if "%choice%"=="2" goto run
if "%choice%"=="3" goto test
if "%choice%"=="4" goto docker_build
if "%choice%"=="5" goto docker_up
if "%choice%"=="6" goto docker_down
if "%choice%"=="7" goto clean
if "%choice%"=="8" goto package
if "%choice%"=="9" goto logs
if "%choice%"=="0" goto end

echo Invalid choice. Please try again.
goto menu

:build
echo Building project...
mvn clean install
pause
goto menu

:run
echo Starting application...
mvn spring-boot:run
pause
goto menu

:test
echo Running tests...
mvn test
pause
goto menu

:docker_build
echo Building Docker image...
docker build -t bootcamp-api:latest .
echo Docker image built successfully!
pause
goto menu

:docker_up
echo Starting Docker Compose...
docker-compose up -d
echo.
echo Services started!
echo MySQL: localhost:3306
echo API: http://localhost:8080/api
echo Swagger: http://localhost:8080/api/swagger-ui.html
pause
goto menu

:docker_down
echo Stopping Docker Compose...
docker-compose down
echo Services stopped!
pause
goto menu

:clean
echo Cleaning project...
mvn clean
echo Clean complete!
pause
goto menu

:package
echo Packaging JAR...
mvn clean package -DskipTests
echo JAR created in target/ folder
pause
goto menu

:logs
echo Viewing logs...
if exist logs\bootcamp-api.log (
    type logs\bootcamp-api.log
) else (
    echo No log file found. Application may not have run yet.
)
pause
goto menu

:end
echo.
echo Thank you for using Bootcamp Backend API!
echo.
exit
