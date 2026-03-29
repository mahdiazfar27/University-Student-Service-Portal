-- IUMS Database Lab - Migration 002
-- Purpose: Setup Library and Department infrastructure for Checkpoint 2

-- 1. Departments Table
CREATE TABLE IF NOT EXISTS departments (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    code VARCHAR(10) UNIQUE NOT NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL
);

-- 2. Books Table
CREATE TABLE IF NOT EXISTS books (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    isbn VARCHAR(20) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    department_id BIGINT UNSIGNED,
    total_copies INT DEFAULT 0,
    available_copies INT DEFAULT 0,
    image_url VARCHAR(2048) NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE CASCADE
);

-- 3. Issued Books Table
CREATE TABLE IF NOT EXISTS issued_books (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    book_id BIGINT UNSIGNED NOT NULL,
    student_id BIGINT UNSIGNED NOT NULL,
    issue_date DATE NOT NULL,
    expected_return_date DATE NOT NULL,
    actual_return_date DATE NULL,
    status ENUM('issued', 'returned', 'overdue') DEFAULT 'issued',
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    FOREIGN KEY (book_id) REFERENCES books(id),
    FOREIGN KEY (student_id) REFERENCES students(id)
);

-- Insert Demo Data
INSERT IGNORE INTO departments (name, code) VALUES 
('Computer Science', 'CSE'),
("Registrar's Office", 'REG'),
('Finance & Accounts', 'FIN'),
('Human Resources', 'HR');

INSERT IGNORE INTO books (isbn, title, author, department_id, total_copies, available_copies) VALUES 
('978-0262033842', 'Introduction to Algorithms', 'Cormen et al.', 1, 15, 12),
('978-0321125217', 'Domain-Driven Design', 'Eric Evans', 1, 10, 8);
