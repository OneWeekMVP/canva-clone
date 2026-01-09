# 🎨 Canva Clone - Full-Featured Graphic Design SaaS Platform

<img width="5706" height="1806" alt="canva-clone" src="/canva-clone.png" />

A production-ready graphic design SaaS platform with an intuitive drag-and-drop editor, AI-powered features, and complete subscription management. Built with Next.js 14, Fabric.js canvas engine, Replicate AI, and Stripe payments.

**Credit:** This project is based on the tutorial by [Antonio Erdeljac (Code With Antonio)](https://github.com/antonioerdeljac)
**Docs:** For a comprehensive documentation, go to docs(/docs) folder.

## ✨ Features

### 🎨 **Professional Design Editor**
- 🖼️ **Template System** - Pre-built templates for quick starts
- ✏️ **Text Editing** - Custom fonts, styles, colors, and alignment
- 📐 **Shape Tools** - Rectangles, circles, triangles with full customization
- 🖌️ **Drawing Tools** - Freehand drawing with brush controls
- 🖼️ **Image Management** - Upload, resize, crop, and position images
- 🎭 **Layers System** - Manage element ordering and visibility
- 🔄 **Undo/Redo** - Full history management for all actions
- 💾 **Auto-Save** - Real-time project saving to database

### 🤖 **AI-Powered Features**
- 🖼️ **AI Image Generation** - Create images from text prompts using Replicate
- 🧹 **Background Removal** - AI-powered background removal for images
- 🎨 **Smart Templates** - AI-optimized design suggestions

### 🚀 **Core Platform Features**
- 🔐 **Multi-Provider Authentication** - Google, GitHub, and Email/Password via Auth.js
- 💳 **Stripe Subscriptions** - Complete billing and payment management
- 📤 **Export Options** - Download as PNG, JPG, SVG, or JSON
- 🌓 **Dark/Light Mode** - Theme switching with next-themes
- 📱 **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile
- 🔍 **Project Management** - Create, save, and organize multiple projects
- 🎯 **Unsplash Integration** - Access millions of free stock photos

### 💎 **Pro Subscription Benefits**
- ✨ Unlimited projects
- 🎨 Access to premium templates
- 🤖 Unlimited AI generations
- 📤 High-resolution exports
- 💾 Priority support

## 🛠️ Tech Stack

### **Frontend**
- [Next.js 14](https://nextjs.org/) - React framework with App Router
- [React 18](https://react.dev/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [TailwindCSS](https://tailwindcss.com/) - Utility-first styling
- [Shadcn UI](https://ui.shadcn.com/) - Beautiful component library
- [Fabric.js](http://fabricjs.com/) - Powerful HTML5 canvas library
- [Lucide React](https://lucide.dev/) - Modern icon system
- [Next Themes](https://github.com/pacocoursey/next-themes) - Dark mode support
- [Zustand](https://zustand-demo.pmnd.rs/) - State management
- [TanStack Query](https://tanstack.com/query) - Server state management

### **Backend & Database**
- [Hono.js](https://hono.dev/) - Ultra-fast web framework for API routes
- [Drizzle ORM](https://orm.drizzle.team/) - TypeScript ORM
- [Neon PostgreSQL](https://neon.tech/) - Serverless Postgres database
- [Auth.js (NextAuth v5)](https://authjs.dev/) - Complete authentication solution

### **AI & Media**
- [Replicate AI](https://replicate.com/) - AI image generation & background removal
- [Unsplash](https://unsplash.com/) - Free stock photo integration
- [UploadThing](https://uploadthing.com/) - File upload handling
- [React Color](https://casesandberg.github.io/react-color/) - Color picker

### **Payments & Subscriptions**
- [Stripe](https://stripe.com/) - Payment processing
- Stripe Checkout - Subscription management
- Stripe Webhooks - Real-time payment events
- Stripe Customer Portal - Self-service billing

### **Development Tools**
- [Zod](https://zod.dev/) - Schema validation
- [date-fns](https://date-fns.org/) - Date manipulation
- [Sonner](https://sonner.emilkowal.ski/) - Toast notifications

## 📋 Prerequisites

Before you begin, ensure you have:

- Node.js (v18 or higher)
- npm, yarn, pnpm, or bun
- Git
- Accounts for:
  - [Auth.js Providers](https://authjs.dev/getting-started/providers) (Google, GitHub)
  - [Neon](https://neon.tech/) (PostgreSQL Database)
  - [UploadThing](https://uploadthing.com/) (File Uploads)
  - [Replicate](https://replicate.com/) (AI Features)
  - [Unsplash](https://unsplash.com/developers) (Stock Photos)
  - [Stripe](https://stripe.com/) (Payments)

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/git-adventures/canva-clone.git
cd canva-clone
```

### 2. Install dependencies
```bash
npm install
# or
bun install
```

### 3. Setup Environment Variables

Create a `.env.local` file in the root directory:

```env
# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Auth.js (NextAuth v5)
AUTH_SECRET=your_auth_secret_generate_with_openssl
AUTH_GITHUB_ID=your_github_oauth_client_id
AUTH_GITHUB_SECRET=your_github_oauth_client_secret
AUTH_GOOGLE_ID=your_google_oauth_client_id
AUTH_GOOGLE_SECRET=your_google_oauth_client_secret

# Database (Neon PostgreSQL)
DATABASE_URL=your_neon_postgres_connection_string

# UploadThing (File Upload)
UPLOADTHING_SECRET=your_uploadthing_secret_key
UPLOADTHING_APP_ID=your_uploadthing_app_id
UPLOADTHING_TOKEN=your_uploadthing_token

# Unsplash API (Stock Photos)
NEXT_PUBLIC_UNSPLASH_ACCESS_KEY=your_unsplash_access_key

# Replicate AI (Image Generation & Background Removal)
REPLICATE_API_TOKEN=your_replicate_api_token

# Stripe (Payments & Subscriptions)
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PRICE_ID=your_stripe_price_id
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
```

### 4. Setup Drizzle Database

```bash
# Generate Drizzle schema
bun run db:generate

# Push schema to database
bun run db:migrate

# (Optional) Open Drizzle Studio to manage database
bun run db:studio
```

### 5. Setup Stripe Webhooks (for local development)

```bash
# Download Stripe CLI to project folder
wget https://github.com/stripe/stripe-cli/releases/download/v1.21.8/stripe_1.21.8_linux_x86_64.tar.gz
tar -xvf stripe_1.21.8_linux_x86_64.tar.gz
rm stripe_1.21.8_linux_x86_64.tar.gz

# Login to Stripe CLI
./stripe login

# Forward webhooks to your local server
./stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

Copy the webhook signing secret to your `.env.local` file as `STRIPE_WEBHOOK_SECRET`.

### 6. Start the development server

```bash
npm run dev
# or
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `bun run db:generate` | Generate Drizzle schema |
| `bun run db:migrate` | Push schema to database |
| `bun run db:studio` | Open Drizzle Studio |

## 🔧 Troubleshooting

### Database Issues
- Ensure `DATABASE_URL` is correct
- Run `bun run db:migrate` to sync schema
- Check Neon dashboard for connection status

### Stripe Webhooks
- For local dev, keep `./stripe listen` running
- For production, add webhook endpoint in Stripe dashboard
- Webhook URL: `https://yourdomain.com/api/webhooks/stripe`

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Drizzle ORM Documentation](https://orm.drizzle.team/docs)
- [Auth.js Documentation](https://authjs.dev/)
- [Fabric.js Documentation](http://fabricjs.com/docs/)
- [Hono.js Documentation](https://hono.dev/)
- [Stripe Documentation](https://stripe.com/docs)
- [Replicate Documentation](https://replicate.com/docs)
- [UploadThing Documentation](https://docs.uploadthing.com/)

## 🙏 Acknowledgments

- [YouTube Tutorial](https://youtu.be/dxwKklKfFWI?si=PsvqyR9l3g4Txpu_) - Original 18-hour course
- [Code With Antonio](https://github.com/antonioerdeljac) - Course creator
- [Vercel](https://vercel.com/) - Deployment platform
- [Shadcn](https://ui.shadcn.com/) - UI components

---

⭐ If you found this project helpful, please give it a star!
