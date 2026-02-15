# EG12-08: Unified School Management System

A comprehensive, modern school management platform built with Next.js 16, React 19, and TypeScript. Designed to streamline educational operations across attendance, fees, results, and administrative functions.

## 🎯 Overview

EG12-08 is a full-featured school management system that provides centralized management for:
- **Academic Management**: Attendance tracking, results entry, report generation
- **Financial Management**: Fee collection, payment tracking, billing statements
- **Operational Management**: Staff management, class scheduling, notice distribution
- **User Management**: Role-based access control, permission management, activity tracking

## 🛠️ Tech Stack    

### Frontend
- **Framework**: [Next.js 16](https://nextjs.org/) - React meta-framework
- **UI Library**: [React 19](https://react.dev/) - JavaScript library
- **Language**: [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) - Utility-first CSS
- **Components**: [shadcn/ui](https://ui.shadcn.com/) - High-quality React components
- **Icons**: [Lucide React](https://lucide.dev/) - Beautiful icon library

### Backend & Database
- **ODM**: [Mongoose 9](https://mongoosejs.com/) - MongoDB object modeling
- **Server**: [MCP Server](https://modelcontextprotocol.io/) - Context protocol support

### Runtime & Package Manager
- **Runtime**: [Bun](https://bun.sh/) - Fast JavaScript runtime
- **Package Manager**: Bun package management

## 📁 Project Structure

```
src/
├── app/                           # Next.js app directory
│   ├── (marketing)/              # Marketing pages layout group
│   ├── auth/                     # Authentication pages
│   └── dashboard/                # Dashboard pages
├── components/                    # Reusable UI components
│   └── ui/                       # shadcn/ui components
├── features/                      # Feature modules
│   └── navigation/               # Navigation components
├── hooks/                         # Custom React hooks
└── lib/                          # Utility functions & config
    └── routes.ts                 # Centralized route index
```

## 🚀 Getting Started

### Prerequisites
- **Bun** 1.0+ - [Install Bun](https://bun.sh)
- **Node.js** 18+ (if not using Bun)
- **MongoDB** (for database)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd next

# Install dependencies with Bun
bun install

# Or with npm
npm install
```

### Environment Setup

Create a `.env.local` file in the root directory:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/eg12-08

# Next.js
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Development

```bash
# Start development server with Bun
bun run dev

# Or with npm
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your application.

## 📚 Key Features

### 🎓 Academic Management
- Attendance tracking, correction, and reporting
- Results management with grade entry and report cards
- Comprehensive report generation and analytics

### 💰 Financial Management
- Fee structure management and collection tracking
- Payment tracking and financial statements
- Financial analytics and reporting

### 📢 Operational Management
- Notice management with publishing and analytics
- Staff and student management
- Class and calendar scheduling
- System settings and preferences

### 👥 User Management
- Role-based access control (Admin, Principal, Teacher, Parent, Student)
- Permission management per role
- User activity tracking and credential management

### 🧭 Navigation
- Responsive desktop and mobile navigation
- Dashboard sidebar with collapsible icon mode
- Notification and user profile menus
- Sticky headers and optimized for all screen sizes

## 🗂️ Routes

All routes are centralized in `src/lib/routes.ts` for easy management:

```typescript
import { ROUTES, NAVIGATION_MENU, DASHBOARD_MENU } from '@/lib/routes';

// Type-safe route access
ROUTES.dashboard.attendance.reports
ROUTES.marketing.features
ROUTES.auth.login
```

## 🎨 Design System

Built with **shadcn/ui** and **Tailwind CSS 4**:
- Pre-configured UI components
- Responsive mobile-first design
- Consistent design patterns
- Dark mode ready
- Fully customizable

## 🔧 Development

### Adding New Routes
1. Update `src/lib/routes.ts`
2. Create page at `src/app/path/page.tsx`
3. Update navigation menus as needed

### Adding Components
```bash
# Add shadcn/ui component
bun x shadcn-ui@latest add component-name

# Or with npm
npx shadcn-ui@latest add component-name
```

## ✅ Build & Deploy

```bash
# Build for production
bun run build

# Preview production build
bun run start

# Or with npm
npm run build
npm start
```

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make changes following code style
3. Commit clearly: `git commit -m "feat: add feature"`
4. Push and open a Pull Request

## 📄 License

This project is proprietary software. All rights reserved.

---

**Built with ❤️ using Next.js 16, React 19, and TypeScript**

**Last Updated**: February 15, 2026
