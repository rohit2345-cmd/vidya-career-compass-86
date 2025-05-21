/*
  # Initial Database Schema

  1. New Tables
    - `profiles`
      - User profiles with basic information
    - `assessment_results` 
      - Stores all assessment results with scores and recommendations
    - `chat_messages`
      - Stores all AI counselor conversations
    - `admin_users`
      - Admin user management

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to access their own data
    - Add policies for admin access
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  first_name text,
  last_name text,
  created_at timestamptz DEFAULT now()
);

-- Create assessment results table
CREATE TABLE IF NOT EXISTS assessment_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users ON DELETE SET NULL,
  student_name text NOT NULL,
  assessment_type text NOT NULL,
  completed_on timestamptz DEFAULT now(),
  questions jsonb NOT NULL,
  scores jsonb,
  strengths jsonb,
  interests jsonb,
  is_guest boolean DEFAULT false
);

-- Create chat messages table
CREATE TABLE IF NOT EXISTS chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users ON DELETE SET NULL,
  assessment_result_id uuid REFERENCES assessment_results ON DELETE SET NULL,
  content text NOT NULL,
  role text NOT NULL,
  created_at timestamptz DEFAULT now(),
  is_guest boolean DEFAULT false
);

-- Create admin users table
CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  username text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessment_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Assessment results policies
CREATE POLICY "Users can view own results"
  ON assessment_results FOR SELECT
  TO authenticated
  USING (
    user_id = auth.uid() OR 
    is_guest = true
  );

CREATE POLICY "Users can create results"
  ON assessment_results FOR INSERT
  TO authenticated
  WITH CHECK (
    user_id = auth.uid() OR 
    is_guest = true
  );

-- Chat messages policies
CREATE POLICY "Users can view own messages"
  ON chat_messages FOR SELECT
  TO authenticated
  USING (
    user_id = auth.uid() OR 
    is_guest = true
  );

CREATE POLICY "Users can create messages"
  ON chat_messages FOR INSERT
  TO authenticated
  WITH CHECK (
    user_id = auth.uid() OR 
    is_guest = true
  );

-- Admin policies (using service_role for admin access)
CREATE POLICY "Admin full access"
  ON admin_users FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_assessment_results_user_id ON assessment_results(user_id);
CREATE INDEX IF NOT EXISTS idx_assessment_results_type ON assessment_results(assessment_type);
CREATE INDEX IF NOT EXISTS idx_chat_messages_user_id ON chat_messages(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_assessment ON chat_messages(assessment_result_id);