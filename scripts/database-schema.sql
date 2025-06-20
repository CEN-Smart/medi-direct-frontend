-- MediDirect Database Schema

-- Users table (patients)
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20) UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    date_of_birth DATE,
    gender VARCHAR(10),
    address TEXT,
    lga VARCHAR(50),
    state VARCHAR(50) DEFAULT 'Lagos',
    email_verified BOOLEAN DEFAULT FALSE,
    phone_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Diagnostic centres table
CREATE TABLE diagnostic_centres (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20) NOT NULL,
    address TEXT NOT NULL,
    lga VARCHAR(50) NOT NULL,
    state VARCHAR(50) DEFAULT 'Lagos',
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    description TEXT,
    operating_hours JSONB, -- Store opening hours as JSON
    license_number VARCHAR(100),
    is_verified BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    rating DECIMAL(3, 2) DEFAULT 0.00,
    total_reviews INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Test types/categories
CREATE TABLE test_types (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    description TEXT,
    typical_duration INTEGER, -- in minutes
    preparation_required TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Services offered by centres
CREATE TABLE centre_services (
    id SERIAL PRIMARY KEY,
    centre_id INTEGER REFERENCES diagnostic_centres(id) ON DELETE CASCADE,
    test_type_id INTEGER REFERENCES test_types(id) ON DELETE CASCADE,
    price DECIMAL(10, 2) NOT NULL,
    is_available BOOLEAN DEFAULT TRUE,
    estimated_duration INTEGER, -- in minutes
    special_instructions TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(centre_id, test_type_id)
);

-- Bookings table
CREATE TABLE bookings (
    id SERIAL PRIMARY KEY,
    booking_reference VARCHAR(20) UNIQUE NOT NULL,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    centre_id INTEGER REFERENCES diagnostic_centres(id) ON DELETE CASCADE,
    service_id INTEGER REFERENCES centre_services(id) ON DELETE CASCADE,
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    status VARCHAR(20) DEFAULT 'pending', -- pending, confirmed, completed, cancelled
    total_amount DECIMAL(10, 2) NOT NULL,
    payment_status VARCHAR(20) DEFAULT 'pending', -- pending, paid, failed
    patient_notes TEXT,
    centre_notes TEXT,
    reminder_sent BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Reviews and ratings
CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    centre_id INTEGER REFERENCES diagnostic_centres(id) ON DELETE CASCADE,
    booking_id INTEGER REFERENCES bookings(id) ON DELETE CASCADE,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    review_text TEXT,
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, booking_id)
);

-- Centre availability slots
CREATE TABLE availability_slots (
    id SERIAL PRIMARY KEY,
    centre_id INTEGER REFERENCES diagnostic_centres(id) ON DELETE CASCADE,
    day_of_week INTEGER CHECK (day_of_week >= 0 AND day_of_week <= 6), -- 0 = Sunday
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    slot_duration INTEGER DEFAULT 30, -- in minutes
    max_bookings_per_slot INTEGER DEFAULT 1,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Test results (for future implementation)
CREATE TABLE test_results (
    id SERIAL PRIMARY KEY,
    booking_id INTEGER REFERENCES bookings(id) ON DELETE CASCADE,
    result_file_url VARCHAR(500),
    result_data JSONB, -- Store structured result data
    uploaded_by INTEGER, -- staff member who uploaded
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    patient_notified BOOLEAN DEFAULT FALSE
);

-- Admin users
CREATE TABLE admin_users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    role VARCHAR(50) DEFAULT 'admin', -- admin, super_admin
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Notifications/Messages
CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    centre_id INTEGER REFERENCES diagnostic_centres(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL, -- booking_confirmation, reminder, result_ready, etc.
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    sent_via VARCHAR(20), -- email, sms, push
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_phone ON users(phone);
CREATE INDEX idx_centres_lga ON diagnostic_centres(lga);
CREATE INDEX idx_centres_verified ON diagnostic_centres(is_verified);
CREATE INDEX idx_bookings_user ON bookings(user_id);
CREATE INDEX idx_bookings_centre ON bookings(centre_id);
CREATE INDEX idx_bookings_date ON bookings(appointment_date);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_reviews_centre ON reviews(centre_id);
CREATE INDEX idx_notifications_user ON notifications(user_id);

-- Insert sample test types
INSERT INTO test_types (name, category, description, typical_duration) VALUES
('Full Blood Count', 'Blood Tests', 'Complete blood count including RBC, WBC, platelets', 15),
('Lipid Profile', 'Blood Tests', 'Cholesterol and triglyceride levels', 15),
('Liver Function Test', 'Blood Tests', 'Tests to check liver health', 15),
('Chest X-Ray', 'Imaging', 'X-ray of chest area', 20),
('Abdominal Ultrasound', 'Imaging', 'Ultrasound scan of abdominal organs', 30),
('ECG', 'Cardiac', 'Electrocardiogram to check heart rhythm', 15),
('Echocardiogram', 'Cardiac', '2D echo to assess heart function', 45),
('MRI Brain', 'Imaging', 'Magnetic resonance imaging of brain', 60),
('CT Scan Abdomen', 'Imaging', 'Computed tomography of abdomen', 30),
('Mammography', 'Imaging', 'Breast cancer screening', 20);
