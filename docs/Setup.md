# Project Setup

## Prerequisites

Before you begin, ensure you have met the following requirements:
- Node.js 14+ installed on your machine
- A Supabase account

## Installation

Follow these steps to set up the project:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/YatharthChauhan2362/keyyatri.git
   cd keyyatri
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create a Supabase project:**
   - Go to [Supabase](https://supabase.io/) and create a new project.
   - Note down the `Supabase URL` and `Supabase Anon Key`.

4. **Set up environment variables:**
   - Create a `.env` file in the root directory of the project.
   - Add the following environment variables:
     ```env
     VITE_SUPABASE_URL=your-supabase-url
     VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
     ```

5. **Set up the database:**
   - Create the following tables in your Supabase database:
     ```sql
     -- Create credentials table
     CREATE TABLE credentials (
       id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
       user_id UUID REFERENCES auth.users(id) NOT NULL,
       name TEXT NOT NULL,
       username TEXT NOT NULL,
       encrypted_password TEXT NOT NULL,
       description TEXT,
       url TEXT,
       created_at TIMESTAMPTZ DEFAULT now(),
       updated_at TIMESTAMPTZ DEFAULT now()
     );

     -- Enable RLS
     ALTER TABLE credentials ENABLE ROW LEVEL SECURITY;

     -- Create policies
     CREATE POLICY "Users can create their own credentials"
       ON credentials
       FOR INSERT
       TO authenticated
       WITH CHECK (auth.uid() = user_id);

     CREATE POLICY "Users can view their own credentials"
       ON credentials
       FOR SELECT
       TO authenticated
       USING (auth.uid() = user_id);

     CREATE POLICY "Users can update their own credentials"
       ON credentials
       FOR UPDATE
       TO authenticated
       USING (auth.uid() = user_id);

     CREATE POLICY "Users can delete their own credentials"
       ON credentials
       FOR DELETE
       TO authenticated
       USING (auth.uid() = user_id);
     ```

## Configuration

Ensure the following configurations are set up correctly:

- **Vite Configuration:**
  - The `vite.config.ts` file should be configured to include the necessary plugins and optimizations.

- **ESLint Configuration:**
  - The `eslint.config.js` file should be set up to lint the project files.

- **Tailwind CSS Configuration:**
  - The `tailwind.config.js` file should be configured to include the necessary content paths and plugins.

## Running the Project

To start the development server, run:
```bash
npm run dev
```

To build the project for production, run:
```bash
npm run build
```

To preview the production build, run:
```bash
npm run preview
```

## Docker and Docker Compose

For Docker and Docker Compose setup instructions, refer to the [Docker.md](Docker.md) file.
