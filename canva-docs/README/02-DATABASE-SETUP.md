# 02-DATABASE-SETUP.md

## Database Setup (Neon)

### Step 1: Create Neon Account

1. Go to [neon.com](https://neon.com)
2. Sign up for a free account
3. Complete organization setup

**See:** Fig.6

### Step 2: Create New Project

1. Click **"New Project"**
2. Name your project (e.g., "canva-clone")
3. Click **"Create"**

**See:** Fig.7

### Step 3: Get Connection String

1. In your project dashboard, click **"Connect"**
2. Copy the connection string
3. **Important:** Remove `&channel_binding=require` from the end

**Example:**
```
Before: postgresql://user:pass@host/db?sslmode=require&channel_binding=require
After:  postgresql://user:pass@host/db?sslmode=require
```

**See:** Fig.8, Fig.9

### Step 4: Add to Environment File

Open `.env` and add:

```env
DATABASE_URL=postgresql://user:pass@host/db?sslmode=require
```

**See:** Fig.10

### Step 5: Generate Auth Secret

Run this command:

```bash
openssl rand -base64 32
```

Copy the output and add to `.env`:

```env
AUTH_SECRET=your_generated_secret_here
```

**What is AUTH_SECRET?**  
Encrypts JWT tokens, cookies, and session data for NextAuth.js authentication.

**See:** Fig.10

### Step 6: Run Database Migrations

```bash
# Generate schema files
bun run db:generate

# Apply migrations
bun run db:migrate
```

**What these do:**
- `db:generate` - Creates database schema files from Drizzle config
- `db:migrate` - Applies schema changes to your database

**See:** Fig.11

### Step 7: Open Database Studio (Optional)

```bash
bun run db:studio
```

Opens Drizzle Studio at `https://local.drizzle.studio` where you can view/edit your database.

**See:** Fig.12, Fig.13

### Step 8: Test the Application

```bash
bun dev
```

Your app should now run at `http://localhost:3000` without errors!

Add to `.env`:
```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**See:** Fig.14

### Step 9: Create First Account

1. Open `http://localhost:3000`
2. Click "Sign Up"
3. Create an account with email/password
4. You'll be redirected to the dashboard

**See:** Fig.15

---

**✅ Database setup complete!**

---

**Previous:** [01-INSTALLATION.md](./01-INSTALLATION.md)  
**Next:** [03-UNSPLASH-API.md](./03-UNSPLASH-API.md)

---
