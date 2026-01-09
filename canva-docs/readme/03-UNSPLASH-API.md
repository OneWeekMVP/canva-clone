# 03-UNSPLASH-API.md

## Unsplash API Setup (Stock Photos)

### Step 1: Create Unsplash Account

1. Go to [unsplash.com](https://unsplash.com)
2. Sign up or log in

**Troubleshooting:** If you get connection errors, try using Tor Browser: [torproject.org/download](https://www.torproject.org/download)

**See:** Fig.16.1, Fig.17

### Step 2: Access Developer API

1. Click on **"Product"** in the menu
2. Select **"Developers/API"**

**See:** Fig.18

### Step 3: Create Application

1. Click **"Your apps"**
2. Click **"New Application"**
3. Accept the terms and conditions
4. Name your application (e.g., "Canva Clone")
5. Submit

**See:** Fig.19, Fig.20, Fig.21, Fig.22

### Step 4: Get Access Key

1. In your app dashboard, find **"Access Key"**
2. Copy the key

**See:** Fig.23

### Step 5: Add to Environment File

Open `.env` and add:

```env
NEXT_PUBLIC_UNSPLASH_ACCESS_KEY=your_access_key_here
```

### Step 6: Restart Dev Server

```bash
# Stop the server (Ctrl+C)
# Start again
bun dev
```

### Step 7: Test Unsplash Integration

1. Open `http://localhost:3000`
2. Click on a project or create new one
3. Click **"Image"** in the left sidebar
4. You should see Unsplash photos!

**See:** Fig.24

---

**✅ Unsplash API setup complete!**

---

**Previous:** [02-DATABASE-SETUP.md](./02-DATABASE-SETUP.md)  
**Next:** [04-UPLOADTHING-API.md](./04-UPLOADTHING-API.md)

---
