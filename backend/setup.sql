CREATE DATABASE IF NOT EXISTS course_tracker;
USE course_tracker;

CREATE TABLE IF NOT EXISTS courses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    course_number VARCHAR(20) NOT NULL,
    course_title VARCHAR(100) NOT NULL,
    credit_hours INT NOT NULL,
    semester VARCHAR(20) NOT NULL,
    grade VARCHAR(5),
    status VARCHAR(20) DEFAULT 'Not Started'
);

INSERT INTO courses (course_number, course_title, credit_hours, semester, grade, status) VALUES
('ITMD-504', 'Programming Application Foundations', 3, 'Spring 2026', '', 'In Progress'),
('ITMD-513', 'Open Source Programming', 3, 'Fall B 2026', 'A', 'Not Started'),
('ITMD-540', 'Introduction to Data Networks and the Internet', 3, 'Fall A 2025', 'A', 'Completed'),
('ITMD-556', 'Introduction to Open Source Operating Systems', 3, 'Fall 2025', 'A', 'Completed'),
('ITMD-503', 'Hardware and Operating System Foundations', 3, 'Spring B 2025', 'A', 'Completed'),
('ITMO-544', 'Cloud Computing Technologies', 3, 'Fall A 2026', '', 'Not Started'),
('ITMO-554', 'Operating Systems Virtualization', 3, 'Fall B 2026', '', 'Not Started'),
('ITMO-563', 'Cloud: Software as a Service', 3, 'Spring A 2027', '', 'Not Started'),
('ITMO-564', 'Cloud: Platform as a Service', 3, 'Spring B 2027', '', 'Not Started'),
('ITM707', 'OS Security PBA', 3, 'Fall 2025', 'A', 'Completed'),
('ITM706', 'Linux OS', 3, 'Spring B 2025', 'A', 'Completed'),
('ITM705', 'Microsoft Windows OS', 1, 'Spring A 2025', 'A', 'Completed');
