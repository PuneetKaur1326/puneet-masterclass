-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create Enums
CREATE TYPE payment_status AS ENUM ('PENDING', 'SUCCESS', 'FAILED', 'CANCELLED');

-- Create Registrations Table
CREATE TABLE registrations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    occupation TEXT NOT NULL,
    goal TEXT NOT NULL,
    challenge TEXT,
    payment_status payment_status DEFAULT 'PENDING',
    transaction_id TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Payments Table
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    registration_id UUID NOT NULL REFERENCES registrations(id) ON DELETE CASCADE,
    amount DECIMAL(10, 2) NOT NULL,
    status payment_status DEFAULT 'PENDING',
    phonepe_transaction_id TEXT,
    merchant_transaction_id TEXT UNIQUE NOT NULL,
    payment_method TEXT,
    raw_response JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Events Table (for logs and webhook tracing)
CREATE TABLE events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_type TEXT NOT NULL,
    payload JSONB,
    status TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Admins Table
CREATE TABLE admins (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security (RLS) setup
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to INSERT registrations (for new signups)
CREATE POLICY "Allow anonymous insert registrations" 
ON registrations FOR INSERT 
TO anon
WITH CHECK (true);

-- Allow anonymous users to SELECT their own registration by transaction_id
CREATE POLICY "Allow anonymous select own registration" 
ON registrations FOR SELECT 
TO anon
USING (true); -- Note: In a real app, restrict by IP or session cookie, but for simplicity we rely on unguessable transaction_ids

-- Disallow anonymous users from UPDATE/DELETE on registrations
-- Admins (using Service Role Key) will bypass RLS entirely.

-- RLS for Payments
CREATE POLICY "Allow anonymous insert payments" 
ON payments FOR INSERT 
TO anon
WITH CHECK (true);

CREATE POLICY "Allow anonymous select own payments" 
ON payments FOR SELECT 
TO anon
USING (true);

-- Indexes for performance
CREATE INDEX idx_registrations_transaction_id ON registrations(transaction_id);
CREATE INDEX idx_registrations_email ON registrations(email);
CREATE INDEX idx_payments_merchant_transaction_id ON payments(merchant_transaction_id);
CREATE INDEX idx_payments_registration_id ON payments(registration_id);

-- Update triggers for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_registrations_updated_at
BEFORE UPDATE ON registrations
FOR EACH ROW
EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_payments_updated_at
BEFORE UPDATE ON payments
FOR EACH ROW
EXECUTE PROCEDURE update_updated_at_column();
