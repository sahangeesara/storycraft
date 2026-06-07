# 📝 StoryCraft Blog Platform

A modern, feature-rich blogging platform built with Next.js 16, Supabase, and Stripe. StoryCraft offers a premium creator experience with role-based access control, advanced analytics, and subscription management.

## ✨ Features

### 🔐 Authentication & Authorization
- **User Authentication** - Secure email/password login with Supabase Auth
- **Role-Based Access Control** - Admin, Pro, and Free user tiers
- **Email Confirmation** - Optional email verification for new accounts
- **Session Management** - Persistent sessions with auto-refresh tokens

### 📰 Blog Management
- **Rich Content Creation** - Create, edit, and publish blog articles
- **Article Previews** - Beautiful article cards with excerpts
- **Author Attribution** - Track and display article authors
- **Admin Controls** - Full CRUD operations for admins
- **Public Blog Feed** - SEO-friendly article listing

### 💎 Pro Features
- **Pro Creator Hub** (`/blog/pro`) - Exclusive dashboard for Pro users
- **Advanced Analytics** - View counts, engagement rates, revenue tracking
- **Quick Actions** - Fast access to create posts, manage content
- **Activity Feed** - Recent posts and engagement notifications
- **Pro Benefits** - Unlimited posts, priority support, custom branding

### 👥 User Management
- **User Dashboard** - View and manage all users (Admin only)
- **Role Assignment** - Promote users to Pro or Admin
- **Profile Management** - User profiles with metadata

### 💳 Subscription & Payments
- **Stripe Integration** - Secure payment processing
- **Subscription Plans** - Monthly/yearly Pro memberships
- **Payment Management** - View and manage subscriptions
- **Upgrade Flow** - Seamless Pro upgrade experience

## 🚀 Tech Stack

- **Framework** - [Next.js 16](https://nextjs.org/) with App Router
- **Language** - TypeScript
- **Styling** - Tailwind CSS 4
- **Database** - [Supabase](https://supabase.com/) (PostgreSQL)
- **Authentication** - Supabase Auth
- **Payments** - [Stripe](https://stripe.com/)
- **UI Components** - SweetAlert2 for notifications
- **Deployment** - Vercel (recommended)

## 📁 Project Structure

```
storycraft/
├── app/
│   ├── auth/
│   │   ├── login/          # Login page
│   │   └── register/       # Registration page
│   ├── blog/
│   │   ├── create/         # Create new article
│   │   ├── edit/[id]/      # Edit article
│   │   ├── pro/            # Pro Creator Hub
│   │   └── [slug]/         # Article detail page
│   ├── users/              # User management (Admin)
│   └── subscription/       # Subscription management
├── components/
│   └── blog/
│       ├── AdminOnly.tsx   # Admin access wrapper
│       ├── ProOnly.tsx     # Pro access wrapper
│       ├── ArticlePreview.tsx
│       └── BlogActions.tsx
├── lib/
│   ├── supabase.ts         # Supabase client
│   ├── supabase-server.ts  # Server-side Supabase
│   └── blog.ts             # Blog utilities
└── types/
    └── blog.ts             # TypeScript types
```

## 🛠️ Installation

### Prerequisites
- Node.js 20+
- npm/yarn/pnpm
- Supabase account
- Stripe account (for payments)

### 1. Clone the repository

```bash
git clone <repository-url>
cd storycraft
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
```

### 4. Database Setup

Run the following SQL in your Supabase SQL Editor:

```sql
-- Create users table
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  username TEXT,
  email TEXT UNIQUE,
  role TEXT DEFAULT 'user',
  is_pro BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create articles table
CREATE TABLE articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT,
  author TEXT,
  author_id UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

-- Create policies (adjust as needed)
CREATE POLICY "Public articles are viewable by everyone"
  ON articles FOR SELECT
  USING (true);

CREATE POLICY "Users can view their own data"
  ON users FOR SELECT
  USING (auth.uid() = id);
```

### 5. Run the development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎯 Key Routes

| Route | Description | Access Level |
|-------|-------------|--------------|
| `/` | Homepage | Public |
| `/blog` | Blog feed | Public |
| `/blog/[slug]` | Article detail | Public |
| `/blog/create` | Create article | Admin only |
| `/blog/edit/[id]` | Edit article | Admin only |
| `/blog/pro` | Pro Creator Hub | Pro users only |
| `/auth/login` | Login page | Public |
| `/auth/register` | Registration | Public |
| `/users` | User management | Admin only |
| `/subscription` | Manage subscription | Authenticated |

## 🔑 User Roles

### Free User
- View blog articles
- Create account
- Access basic features

### Pro User
- All Free features
- Access Pro Creator Hub (`/blog/pro`)
- Advanced analytics dashboard
- Priority support
- Unlimited blog posts

### Admin
- All Pro features
- Create/edit/delete articles
- Manage users
- Full platform control

## 🎨 Design Features

- **Modern Dark UI** - Gradient backgrounds with glassmorphism
- **Responsive Design** - Mobile-first approach
- **Smooth Animations** - Hover effects and transitions
- **Color-Coded Stats** - Blue, emerald, purple, amber themes
- **Professional Icons** - Heroicons throughout
- **Accessible** - WCAG compliant components

## 🔒 Security

- **Environment Variables** - Sensitive keys stored securely
- **Row Level Security** - Supabase RLS policies
- **Auth Guards** - Protected routes with middleware
- **Session Management** - Secure token handling
- **Email Confirmation** - Optional account verification

## 🚢 Deployment

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Environment Variables in Production

Make sure to add all environment variables from `.env.local` to your hosting platform.

## 📝 Development

### Build for production

```bash
npm run build
npm run start
```

### Lint code

```bash
npm run lint
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary.

## 🆘 Support

For support, email your-email@example.com or open an issue in the repository.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Supabase](https://supabase.com/)
- [Stripe](https://stripe.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vercel](https://vercel.com/)

---

Built with ❤️ using Next.js and Supabase
