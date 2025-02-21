Create database script  for aicar

# Create the database
CREATE DATABASE IF NOT EXISTS aicar;
USE aicar;


CREATE TABLE user (
    id INT AUTO_INCREMENT PRIMARY KEY,        -- Identificador único para cada usuario
    first_name VARCHAR(100) NOT NULL,         -- Primer nombre
    last_name VARCHAR(100) NOT NULL,          -- Apellido
    email VARCHAR(100) UNIQUE NOT NULL,       -- Correo electrónico único
    hashedPassword VARCHAR(255) NOT NULL,      -- Contraseña cifrada
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Fecha de creación
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- Fecha de actualización
);

CREATE TABLE user_info (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    gender ENUM('Male', 'Female', 'Other'),
    height DECIMAL(5,2),
    weight DECIMAL(5,2),
    age INT,
    
    -- Información médica
    diabetes BOOLEAN,
    family_history_arrhythmias BOOLEAN,
    high_blood_pressure BOOLEAN,
    high_cholesterol BOOLEAN,
    obesity BOOLEAN,
    autoimmune_diseases BOOLEAN,
    chronic_kidney_disease BOOLEAN,
    metabolic_syndrome BOOLEAN,
    acute_myocardial_infarction BOOLEAN,

    -- Hábitos
    hours_of_sleep TINYINT,
    activity_level ENUM('Sedentary', 'Light', 'Moderate', 'Active', 'Very Active'),
    smoke ENUM('Never', 'Occasionally', 'Regularly'),
    drugs ENUM('Never', 'Occasionally', 'Regularly'),
    caffeine ENUM('None', 'Low', 'Moderate', 'High'),
    stress_level TINYINT,

    -- Contacto de emergencia
    emergency_contact1_name VARCHAR(100),
    emergency_contact1_number VARCHAR(20),
    emergency_contact2_name VARCHAR(100),
    emergency_contact2_number VARCHAR(20),

    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);




# Create the app user
CREATE USER IF NOT EXISTS 'aicar'@'localhost' IDENTIFIED BY 'qwertyuiop'; 
GRANT ALL PRIVILEGES ON aicar.* TO 'aicar'@'localhost';