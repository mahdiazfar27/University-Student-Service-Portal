-- IUMS Database Lab - Migration 003
-- Purpose: Setup Student Results for GPA/CGPA calculations

CREATE TABLE IF NOT EXISTS student_results (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    student_id BIGINT UNSIGNED NOT NULL,
    course_id BIGINT UNSIGNED NOT NULL,
    semester VARCHAR(50) NOT NULL,
    grade_point DECIMAL(3, 2) NOT NULL,
    grade VARCHAR(2) NOT NULL,
    remarks VARCHAR(255) NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

-- Insert Demo Results for Testing
-- Assuming IDs exist from previous seeders
INSERT IGNORE INTO student_results (student_id, course_id, semester, grade_point, grade, remarks) VALUES 
(1, 1, 'Spring 2024', 4.00, 'A+', 'Excellent'),
(1, 2, 'Spring 2024', 3.75, 'A', 'Very Good');
