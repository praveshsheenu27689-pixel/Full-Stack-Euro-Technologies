-- Insert Default Admin User (password: Admin@123)
INSERT INTO users (username, email, password, first_name, last_name, role, is_active, created_at, updated_at) 
VALUES ('admin', 'admin@bootcamp.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Admin', 'User', 'ADMIN', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert Sample Courses
INSERT INTO courses (title, description, level, duration, price, instructor, is_active, created_at, updated_at)
VALUES 
('Full Stack Development', 'Complete web development bootcamp', 'BEGINNER', '6 months', 999.99, 'John Doe', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Frontend Development', 'Master React and modern frontend', 'INTERMEDIATE', '3 months', 599.99, 'Jane Smith', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Backend Development', 'Node.js and Spring Boot', 'ADVANCED', '4 months', 799.99, 'Mike Johnson', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
