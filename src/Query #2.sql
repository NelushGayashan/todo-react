CREATE DATABASE IF NOT EXISTS todo_app;

USE todo_app;

CREATE TABLE IF NOT EXISTS tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    description VARCHAR(255) NOT NULL
);
INSERT INTO tasks (description) VALUES
    ('Task 01'),
    ('Task 02'),
    ('Task 03');
