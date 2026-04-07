-- Leave Management System Database Setup
-- Create database if not exists
CREATE DATABASE IF NOT EXISTS leave_management;

-- Use the database
USE leave_management;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('CEO', 'MANAGER', 'HR', 'TEAM_LEAD', 'EMPLOYEE') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_email (email)
);

-- Create leave_requests table
CREATE TABLE IF NOT EXISTS leave_requests (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    from_date DATE NOT NULL,
    to_date DATE NOT NULL,
    total_days INT NOT NULL,
    leave_type ENUM('SICK_LEAVE', 'CASUAL_LEAVE', 'ANNUAL_LEAVE', 'MATERNITY_LEAVE', 'PATERNITY_LEAVE', 'EMERGENCY_LEAVE', 'UNPAID_LEAVE') NOT NULL,
    reason TEXT,
    status ENUM('PENDING', 'APPROVED', 'REJECTED') NOT NULL DEFAULT 'PENDING',
    current_level ENUM('TEAM_LEAD', 'HR', 'MANAGER', 'CEO') NOT NULL DEFAULT 'TEAM_LEAD',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_status (status),
    INDEX idx_current_level (current_level)
);

-- Insert sample users (passwords are BCrypt encoded for "admin123")
INSERT IGNORE INTO users (name, email, password, role) VALUES
('John CEO', 'ceo@company.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'CEO'),
('Alice Manager', 'manager@company.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'MANAGER'),
('Bob HR', 'hr@company.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'HR'),
('Carol Team Lead', 'tl@company.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'TEAM_LEAD'),
('David Employee', 'employee@company.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'EMPLOYEE'),
('Emma Employee', 'emma@company.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'EMPLOYEE'),
('Frank Employee', 'frank@company.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'EMPLOYEE');

-- Show the created tables
SHOW TABLES;

-- Show sample users
SELECT id, name, email, role FROM users;
