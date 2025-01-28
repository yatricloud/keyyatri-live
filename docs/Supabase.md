# Supabase Documentation

## Introduction

Supabase is an open-source Firebase alternative that provides a suite of tools for building and managing applications. It offers features such as authentication, database management, and real-time subscriptions.

## Setup

To get started with Supabase, follow these steps:

1. **Create a Supabase account**: Go to [Supabase](https://supabase.io/) and sign up for an account.
2. **Create a new project**: Once you have an account, create a new project in the Supabase dashboard.
3. **Get your API keys**: In the project settings, you will find your `Supabase URL` and `Supabase Anon Key`. These will be used to connect your application to Supabase.

## Authentication

Supabase provides built-in authentication with various providers such as email/password, OAuth, and more. Here's how to set up email/password authentication:

1. **Enable email/password authentication**: In the Supabase dashboard, go to the Authentication section and enable email/password authentication.
2. **Sign up users**: Use the Supabase client to sign up users with their email and password.
   ```javascript
   import { createClient } from '@supabase/supabase-js';

   const supabaseUrl = 'your-supabase-url';
   const supabaseKey = 'your-supabase-anon-key';
   const supabase = createClient(supabaseUrl, supabaseKey);

   const signUp = async (email, password) => {
     const { user, error } = await supabase.auth.signUp({
       email,
       password,
     });
     if (error) console.error('Error signing up:', error);
     else console.log('User signed up:', user);
   };
   ```
3. **Sign in users**: Use the Supabase client to sign in users with their email and password.
   ```javascript
   const signIn = async (email, password) => {
     const { user, error } = await supabase.auth.signInWithPassword({
       email,
       password,
     });
     if (error) console.error('Error signing in:', error);
     else console.log('User signed in:', user);
   };
   ```

## Database Management

Supabase uses PostgreSQL as its database. You can manage your database using SQL queries or the Supabase dashboard.

### Creating Tables

To create a table in your Supabase database, you can use SQL queries. For example, to create a `users` table:
```sql
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

### Inserting Data

To insert data into a table, you can use SQL queries or the Supabase client. For example, to insert a new user:
```javascript
const insertUser = async (email, password) => {
  const { data, error } = await supabase
    .from('users')
    .insert([{ email, password }]);
  if (error) console.error('Error inserting user:', error);
  else console.log('User inserted:', data);
};
```

### Querying Data

To query data from a table, you can use SQL queries or the Supabase client. For example, to get all users:
```javascript
const getUsers = async () => {
  const { data, error } = await supabase
    .from('users')
    .select('*');
  if (error) console.error('Error getting users:', error);
  else console.log('Users:', data);
};
```

## Best Practices

- **Use environment variables**: Store your Supabase URL and API keys in environment variables to keep them secure.
- **Enable Row Level Security (RLS)**: Use RLS to control access to your data at the row level.
- **Use policies**: Create policies to define who can access and modify your data.

## Common Pitfalls

- **Not enabling RLS**: Without RLS, your data may be accessible to unauthorized users.
- **Hardcoding API keys**: Avoid hardcoding your API keys in your code. Use environment variables instead.

## References

- [Supabase Documentation](https://supabase.io/docs)
- [Supabase GitHub Repository](https://github.com/supabase/supabase)
