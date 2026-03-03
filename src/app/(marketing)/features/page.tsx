import { type Metadata } from "next";
import {
  BookOpen,
  CalendarCheck,
  ClipboardList,
  CreditCard,
  FileBarChart,
  GraduationCap,
  LayoutDashboard,
  Mail,
  MessageSquare,
  Bell,
  BellRing,
  Bus,
  ClipboardCheck,
  Fingerprint,
  Globe,
  Library,
  LineChart,
  Lock,
  PieChart,
  QrCode,
  Receipt,
  School,
  Settings,
  Shield,
  Smartphone,
  UserCheck,
  Users,
  Video,
  Wifi,
} from "lucide-react";
import {
  Hero,
  FeatureGrid,
  Attendance,
  Gradebook,
  Communication,
  Reporting,
  Administration,
  MobileApp,
  IntegrationsPreview,
  CTA,
} from "@/features/(marketing)/features";
import { ROUTES } from "@/lib/routes";

// TODO: Add JSON-LD structured data for features page SEO
// TODO: Add dynamic OG image generation for social sharing
// TODO: Consider A/B testing different hero copy variations

export const metadata: Metadata = {
  title: "Features — Comprehensive School Management Platform | EduSync",
  description:
    "Explore the complete suite of EduSync features: automated attendance tracking, digital gradebooks, parent-teacher communication, fee management, analytics dashboards, and more — built for modern K-12 schools.",
  keywords: [
    "school management software features",
    "student attendance tracking",
    "digital gradebook",
    "parent teacher communication app",
    "school fee management",
    "education analytics",
    "school administration software",
    "K-12 school ERP",
    "student information system",
    "school mobile app",
  ],
  openGraph: {
    title: "Features — Comprehensive School Management Platform | EduSync",
    description:
      "Automated attendance, digital gradebooks, parent-teacher communication, fee management, analytics, and more — all in one powerful platform built for K-12 schools.",
    url: "/features",
    type: "website",
    images: [
      {
        url: "/placeholder.svg",
        width: 1200,
        height: 630,
        alt: "EduSync Features Overview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Features — Comprehensive School Management Platform | EduSync",
    description:
      "Automated attendance, digital gradebooks, parent-teacher communication, fee management, analytics, and more — built for modern schools.",
    images: ["/placeholder.svg"],
  },
  alternates: {
    canonical: "/features",
  },
};

export default function Page() {
  return (
    <>
      {/* TODO: Add breadcrumb schema markup */}
      <Hero
        badge="All-in-One School Platform"
        title="Everything Your School Needs to"
        highlight="Thrive Digitally"
        description="From automated attendance tracking and digital gradebooks to seamless parent communication and real-time analytics — EduSync replaces dozens of disconnected tools with one unified platform trusted by 2,500+ schools."
        cta={{
          primary: { text: "Start Free Trial", href: ROUTES.auth.signup },
          secondary: { text: "Book a Live Demo", href: ROUTES.marketing.demo },
        }}
      />

      {/* TODO: Consider adding animated feature count stats bar here */}
      <FeatureGrid
        eyebrow="Platform Overview"
        title="Built for Every Stakeholder in Education"
        subtitle="A comprehensive toolkit designed for administrators, teachers, students, and parents — covering every aspect of school operations from classroom management to financial oversight."
        features={[
          {
            icon: CalendarCheck,
            title: "Smart Attendance",
            description:
              "Automated roll-call with QR codes, biometric integration, and GPS-verified check-ins. Instant absence alerts sent to parents within seconds.",
          },
          {
            icon: ClipboardList,
            title: "Digital Gradebook",
            description:
              "Flexible grading scales, weighted categories, rubric-based assessment, and GPA calculation with automatic report card generation.",
          },
          {
            icon: MessageSquare,
            title: "Unified Communication",
            description:
              "In-app messaging, SMS broadcasts, email newsletters, and push notifications to keep teachers, parents, and staff connected effortlessly.",
          },
          {
            icon: CreditCard,
            title: "Fee Management",
            description:
              "Online payment portals, installment plans, automatic invoice generation, late-fee tracking, and scholarship disbursement in one place.",
          },
          {
            icon: FileBarChart,
            title: "Analytics & Reports",
            description:
              "Real-time dashboards for academic performance, attendance trends, financial health, and operational KPIs with exportable PDF and Excel reports.",
          },
          {
            icon: GraduationCap,
            title: "Exam & Results",
            description:
              "Schedule exams, manage seating arrangements, enter marks digitally, and publish results with merit lists and comparative analytics.",
          },
          {
            icon: Users,
            title: "User & Role Management",
            description:
              "Granular role-based access for admins, principals, teachers, students, and parents with audit trails and permission hierarchies.",
          },
          {
            icon: Bell,
            title: "Notice Board",
            description:
              "Digital notice board with category-based filtering, scheduling, read receipts, and multi-channel distribution to targeted audiences.",
          },
        ]}
      />

      {/* TODO: Replace placeholder images with actual product screenshots */}
      <Attendance
        eyebrow="Attendance Management"
        title="Never Miss a Student Again"
        description="Replace paper registers and error-prone manual processes with intelligent attendance tracking that saves teachers 15+ minutes per class and gives parents instant peace of mind."
        image={{
          src: "https://i.ibb.co.com/fY7fD6G5/image.png",
          alt: "EduSync attendance tracking dashboard showing real-time student check-in status",
        }}
        highlights={[
          {
            icon: QrCode,
            text: "QR code and biometric-based check-in with anti-spoofing verification for secure attendance logging",
          },
          {
            icon: BellRing,
            text: "Instant SMS and push notification alerts to parents within 60 seconds of an unmarked absence",
          },
          {
            icon: LineChart,
            text: "Daily, weekly, and monthly attendance trends with configurable thresholds for early intervention",
          },
          {
            icon: Fingerprint,
            text: "Biometric hardware integration supporting fingerprint and facial recognition scanners",
          },
          {
            icon: ClipboardCheck,
            text: "Bulk attendance correction workflow with teacher justification and admin approval chain",
          },
        ]}
        direction="ltr"
      />

      <Gradebook
        eyebrow="Gradebook & Assessment"
        title="Grading Made Effortless and Transparent"
        description="A powerful digital gradebook that supports any grading methodology — percentage-based, letter grades, GPA scales, or custom rubrics — while automatically calculating weighted averages and generating print-ready report cards."
        image={{
          // Using a professional data analytics/dashboard image for the gradebook interface
          src: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1200",
          alt: "EduSync digital gradebook interface with student performance charts and grade entry",
        }}
        highlights={[
          {
            icon: BookOpen,
            text: "Support for weighted categories including homework, quizzes, midterms, finals, and class participation",
          },
          {
            icon: PieChart,
            text: "Visual grade distribution charts and class-wide performance comparisons at a glance",
          },
          {
            icon: FileBarChart,
            text: "Automatic report card generation with customizable templates, principal remarks, and parent signatures",
          },
          {
            icon: UserCheck,
            text: "Student-level progress tracking with historical data spanning multiple academic years",
          },
          {
            icon: Shield,
            text: "Grade change audit trail with timestamps, editor identity, and rollback capability for compliance",
          },
        ]}
        // Setting direction to Right-to-Left for layout variety
        direction="rtl"
      />

      <Communication
        eyebrow="Communication Hub"
        title="Bridge the Gap Between School and Home"
        description="Keep every stakeholder in the loop with a multi-channel communication platform that centralizes messages, announcements, and alerts — eliminating lost circulars and missed updates forever."
        image={{
          src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200",
          alt: "EduSync communication dashboard showing parent-teacher messaging and broadcast notifications",
        }}
        highlights={[
          {
            icon: Mail,
            text: "Direct teacher-parent messaging with read receipts, translation support, and file attachments up to 25 MB",
          },
          {
            icon: Bell,
            text: "Targeted broadcast notifications by class, section, grade level, or custom parent/staff groups",
          },
          {
            icon: Video,
            text: "Integrated video conferencing for virtual parent-teacher meetings with calendar scheduling",
          },
          {
            icon: Globe,
            text: "Multi-language support with automatic message translation for diverse school communities",
          },
          {
            icon: Smartphone,
            text: "Push notifications on iOS and Android ensuring time-sensitive alerts are never missed",
          },
        ]}
        direction="ltr"
      />

      <Reporting
        eyebrow="Analytics & Reporting"
        title="Data-Driven Decisions for Better Outcomes"
        description="Transform raw school data into actionable insights with real-time dashboards, scheduled reports, and predictive analytics that help administrators and teachers identify trends before they become problems."
        image={{
          src: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1200",
          alt: "EduSync analytics dashboard with attendance trends, academic performance charts, and financial reports",
        }}
        highlights={[
          {
            icon: LayoutDashboard,
            text: "Role-specific dashboards for principals, administrators, department heads, and class teachers",
          },
          {
            icon: PieChart,
            text: "Academic performance analytics with subject-wise breakdowns, pass/fail ratios, and topper lists",
          },
          {
            icon: LineChart,
            text: "Attendance trend analysis with pattern detection and automatic at-risk student flagging",
          },
          {
            icon: Receipt,
            text: "Financial reports including fee collection summaries, outstanding balances, and revenue forecasts",
          },
          {
            icon: FileBarChart,
            text: "One-click export to PDF, Excel, and CSV with scheduled email delivery for board presentations",
          },
        ]}
        direction="rtl"
      />

      <Administration
        eyebrow="School Administration"
        title="Streamline Every Operational Workflow"
        description="From student enrollment and staff onboarding to transport management and inventory tracking — digitize and automate the administrative backbone of your institution with zero paperwork."
        image={{
          src: "https://images.unsplash.com/photo-1543286386-713bdd548da4?q=80&w=1200",
          alt: "EduSync admin panel showing student enrollment, staff management, and transport routing",
        }}
        highlights={[
          {
            icon: School,
            text: "Complete student lifecycle management from admission inquiry to alumni tracking with document vault",
          },
          {
            icon: Users,
            text: "Staff HR module with leave management, payroll integration, substitution scheduling, and appraisals",
          },
          {
            icon: Bus,
            text: "Transport management with GPS-tracked routes, stop assignments, and driver-parent live tracking",
          },
          {
            icon: Library,
            text: "Library module with barcode scanning, book cataloging, issue/return tracking, and overdue fine management",
          },
          {
            icon: Settings,
            text: "Configurable academic year setup, section management, time-table builder, and holiday calendar",
          },
        ]}
        direction="ltr"
      />

      {/* TODO: Add app store badges and download links when mobile apps launch */}
      <MobileApp
        eyebrow="Mobile Access"
        title="Your Entire School in Your Pocket"
        description="Give teachers, parents, and administrators instant access to every feature from their smartphones. The EduSync mobile app delivers real-time updates, quick actions, and full functionality — no desktop required."
        features={[
          {
            icon: CalendarCheck,
            title: "Mark Attendance",
            description:
              "Teachers can mark and submit attendance in under 30 seconds per class.",
          },
          {
            icon: Bell,
            title: "Instant Alerts",
            description:
              "Parents receive real-time push notifications for absences, grades, and notices.",
          },
          {
            icon: CreditCard,
            title: "Pay Fees",
            description:
              "Parents pay fees securely via UPI, cards, or net banking from the app.",
          },
          {
            icon: MessageSquare,
            title: "Chat & Messaging",
            description:
              "Direct messaging between teachers and parents with media sharing.",
          },
          {
            icon: FileBarChart,
            title: "View Reports",
            description:
              "Access report cards, attendance records, and progress charts anywhere.",
          },
          {
            icon: Lock,
            title: "Secure Login",
            description:
              "Biometric login and session management for data protection.",
          },
        ]}
        cta={{
          text: "Learn More About Mobile",
          href: ROUTES.marketing.features,
        }}
      />

      {/* TODO: Replace placeholder logos with actual integration partner logos */}
      <IntegrationsPreview
    eyebrow="Integrations"
    title="Connects with Tools You Already Use"
    subtitle="EduSync integrates seamlessly with popular education platforms, payment gateways, communication tools, and government portals — so your school ecosystem works as one."
    integrations={[
        {
            name: "Google Workspace",
            // Official Google Workspace icon
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1280px-Google_2015_logo.svg.png",
            description: "Classroom, Drive & Meet",
        },
        {
            name: "Microsoft 365",
            // Microsoft 365 icon
            logo: "https://companieslogo.com/img/orig/MSFT-a203b22d.png?t=1722952497",
            description: "Teams, Word & Excel",
        },
        {
            name: "Zoom",
            // Zoom brand icon
            logo: "https://img.icons8.com/color/144/zoom.png",
            description: "Virtual classrooms",
        },
        {
            name: "Razorpay",
            // Razorpay official logo
            logo: "https://cdn.worldvectorlogo.com/logos/razorpay.svg",
            description: "Payment gateway",
        },
        {
            name: "Stripe",
            // Stripe official logo
            logo: "https://cdn.worldvectorlogo.com/logos/stripe-4.svg",
            description: "Global payments",
        },
        {
            name: "WhatsApp",
            // WhatsApp brand icon
            logo: "https://img.icons8.com/color/144/whatsapp.png",
            description: "Parent messaging",
        },
        {
            name: "Tally",
            // Tally logo from official source
            logo: "https://upload.wikimedia.org/wikipedia/commons/0/09/Tally_-_Logo.png",
            description: "Accounting sync",
        },
        {
            name: "UDISE+",
            // Government portal placeholder or icon
            logo: "https://play-lh.googleusercontent.com/nr7QGXSW7IuqQYwVwHHoLqZlvyRoD4cPdv4Li_uGz8TKBiq0HNbKdZ-W2EnSiFFrb5w",
            description: "Govt. reporting",
        },
        {
            name: "Google Sheets",
            // Google Sheets official icon
            logo: "https://img.icons8.com/color/144/google-sheets.png",
            description: "Data export & sync",
        },
        {
            name: "Twilio",
            // Twilio official logo
            logo: "https://cdn.worldvectorlogo.com/logos/twilio.svg",
            description: "SMS notifications",
        },
        {
            name: "Firebase",
            // Firebase official logo
            logo: "https://img.icons8.com/color/144/firebase.png",
            description: "Push notifications",
        },
        {
            name: "AWS S3",
            // AWS S3 service icon
            logo: "https://img.icons8.com/color/144/amazon-s3.png",
            description: "Document storage",
        },
    ]}
    cta={{
        text: "View All Integrations",
        href: ROUTES.marketing.integrations,
    }}
/>

      {/* TODO: Add social proof counter (e.g., "Trusted by 2,500+ schools") above CTA */}
      <CTA
        title="Ready to Transform Your School?"
        description="Join 2,500+ schools that have eliminated paperwork, improved parent engagement by 85%, and saved 20+ hours per week with EduSync. Start your free 30-day trial today — no credit card required."
        primaryCta={{ text: "Start Free Trial", href: ROUTES.auth.signup }}
        secondaryCta={{ text: "Schedule a Demo", href: ROUTES.marketing.demo }}
      />
    </>
  );
}
