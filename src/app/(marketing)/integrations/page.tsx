import { type Metadata } from 'next';
import {
    BookOpen,
    CreditCard,
    Database,
    FileText,
    Globe,
    GraduationCap,
    LayoutDashboard,
    Link2,
    Lock,
    Mail,
    MonitorSmartphone,
    RefreshCw,
    Search,
    Settings,
    ShieldCheck,
    Users,
    Video,
    Zap,
} from 'lucide-react';
import { ROUTES } from '@/lib/routes';
import {
    Hero,
    IntegrationGrid,
    Categories,
    Featured,
    Api,
    Benefits,
    HowItWorks,
    Testimonial,
    Partners,
    CTA,
} from '@/features/(marketing)/integrations';

// TODO: Add dynamic OG image for integrations page
// TODO: Add JSON-LD structured data for software integrations
export const metadata: Metadata = {
    title: 'Integrations | EduPortal — Connect Your School Ecosystem',
    description:
        'Seamlessly integrate EduPortal with your favorite education tools, payment gateways, communication platforms, and learning management systems. 50+ integrations available.',
    keywords: [
        'school management integrations',
        'education software integrations',
        'LMS integration',
        'school ERP connectors',
        'student information system API',
        'edtech integrations',
        'payment gateway school',
        'Google Classroom integration',
        'Zoom school integration',
    ],
    openGraph: {
        title: 'Integrations | EduPortal — Connect Your School Ecosystem',
        description:
            'Seamlessly integrate EduPortal with your favorite education tools, payment gateways, communication platforms, and learning management systems.',
        url: ROUTES.marketing.integrations,
        type: 'website',
        images: [
            {
                url: '/placeholder.svg',
                width: 1200,
                height: 630,
                alt: 'EduPortal Integrations — Connect Your Entire School Ecosystem',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Integrations | EduPortal — Connect Your School Ecosystem',
        description:
            'Seamlessly integrate EduPortal with your favorite education tools, payment gateways, communication platforms, and learning management systems.',
        images: ['/placeholder.svg'],
    },
};

// TODO: Fetch integrations data from CMS or API in the future
// TODO: Add search/filter functionality with query params
export default function Page() {
    return (
        <>
            {/* TODO: Add breadcrumb navigation */}
            <Hero
                badge="50+ Integrations"
                title="Connect Your Entire School"
                highlight="Ecosystem"
                description="EduPortal integrates seamlessly with the tools your school already uses — from learning platforms and payment gateways to communication apps and government portals. No more switching between systems."
                searchPlaceholder="Search integrations (e.g., Google Classroom, Zoom, Stripe)..."
            />

            <Categories
                eyebrow="Browse by Category"
                title="Find Integrations by Category"
                subtitle="Explore our growing library of integrations organized by function. Whether you need a payment processor, a video conferencing tool, or an academic platform — we've got you covered."
                categories={[
                    { icon: BookOpen, label: 'Learning Management', count: 8 },
                    { icon: CreditCard, label: 'Payment Gateways', count: 6 },
                    { icon: Video, label: 'Video Conferencing', count: 5 },
                    { icon: Mail, label: 'Communication', count: 7 },
                    { icon: FileText, label: 'Document Management', count: 4 },
                    { icon: Database, label: 'Data & Analytics', count: 5 },
                    { icon: ShieldCheck, label: 'Government & Compliance', count: 3 },
                    { icon: MonitorSmartphone, label: 'Hardware & Devices', count: 4 },
                    { icon: GraduationCap, label: 'Assessment & Exams', count: 6 },
                    { icon: Users, label: 'HR & Staff', count: 3 },
                ]}
            />

            {/* TODO: Add real integration logos when available */}
            <IntegrationGrid
                eyebrow="All Integrations"
                title="Powerful Integrations for Every School Need"
                subtitle="Connect EduPortal to the services your staff, students, and parents rely on daily. Each integration is designed for one-click setup and zero downtime."
                integrations={[
                    {
                        logo: 'https://i.ibb.co.com/Cp9k8NN2/image.png',
                        name: 'Google Classroom',
                        category: 'Learning Management',
                        description:
                            'Sync assignments, grades, and rosters automatically between EduPortal and Google Classroom. Two-way sync keeps everything up to date.',
                        connectLabel: 'Connect',
                    },
                    {
                        logo: 'https://i.ibb.co.com/zHrG2Pqc/image.png',
                        name: 'Microsoft Teams',
                        category: 'Communication',
                        description:
                            'Enable virtual classrooms, staff meetings, and parent conferences directly from EduPortal with deep Microsoft Teams integration.',
                        connectLabel: 'Connect',
                    },
                    {
                        logo: 'https://i.ibb.co.com/TD6cbcV1/image.png',
                        name: 'Zoom',
                        category: 'Video Conferencing',
                        description:
                            'Schedule and launch online classes, parent-teacher meetings, and staff training sessions with one-click Zoom meeting creation.',
                        connectLabel: 'Connect',
                    },
                    {
                        logo: 'https://i.ibb.co.com/B5zHDhwQ/image.png',
                        name: 'Stripe',
                        category: 'Payment Gateways',
                        description:
                            'Accept tuition fees, exam fees, and activity payments online with secure Stripe checkout. Supports cards, wallets, and bank transfers.',
                        connectLabel: 'Connect',
                    },
                    {
                        logo: 'https://i.ibb.co.com/QjdmKZvX/image.png',
                        name: 'Razorpay',
                        category: 'Payment Gateways',
                        description:
                            'Collect school fees via UPI, net banking, and cards with Razorpay. Auto-reconciliation ensures every payment is tracked accurately.',
                        connectLabel: 'Connect',
                    },
                    {
                        logo: 'https://i.ibb.co.com/hxF8BnpR/image.png',
                        name: 'Moodle',
                        category: 'Learning Management',
                        description:
                            'Connect your Moodle LMS to pull course progress, quiz scores, and completion certificates directly into student profiles.',
                        connectLabel: 'Connect',
                    },
                    {
                        logo: 'https://i.ibb.co.com/5XkrCj9s/image.png',
                        name: 'Canvas LMS',
                        category: 'Learning Management',
                        description:
                            'Integrate Canvas to synchronize course enrollments, assignment submissions, and gradebook data in real time.',
                        connectLabel: 'Connect',
                    },
                    {
                        logo: 'https://i.ibb.co.com/FkQhxnmV/image.png',
                        name: 'Twilio',
                        category: 'Communication',
                        description:
                            'Send SMS alerts for attendance updates, fee reminders, exam schedules, and emergency announcements to parents and staff.',
                        connectLabel: 'Connect',
                    },
                    {
                        logo: 'https://i.ibb.co.com/bM6W832r/image.png',
                        name: 'Google Drive',
                        category: 'Document Management',
                        description:
                            'Store and share report cards, circulars, study materials, and administrative documents with automatic Google Drive sync.',
                        connectLabel: 'Connect',
                    },
                    {
                        logo: 'https://i.ibb.co.com/1tX8qCgw/image.png',
                        name: 'SendGrid',
                        category: 'Communication',
                        description:
                            'Automate email notifications for fee receipts, exam results, newsletters, and event invitations with reliable SendGrid delivery.',
                        connectLabel: 'Connect',
                    },
                    {
                        logo: 'https://i.ibb.co.com/MyWX9frL/image.png',
                        name: 'Tally (SARAL)',
                        category: 'Government & Compliance',
                        description:
                            'Export financial data to Tally ERP for accounting compliance. Generate SARAL-ready reports for government submissions.',
                        connectLabel: 'Connect',
                    },
                    {
                        logo: 'https://i.ibb.co.com/G3k1KXgj/image.png',
                        name: 'Biometric Devices',
                        category: 'Hardware & Devices',
                        description:
                            'Connect fingerprint and RFID attendance devices to sync real-time check-in data for students and staff automatically.',
                        connectLabel: 'Connect',
                    },
                ]}
            />

            {/* TODO: Update featured integrations based on user analytics */}
            <Featured
                eyebrow="Featured Integrations"
                title="Most Popular Integrations"
                subtitle="These are the integrations schools love the most. Deep, purpose-built connections that save hours of admin work every week."
                integrations={[
                    {
                        logo: 'https://i.ibb.co.com/Cp9k8NN2/image.png',
                        name: 'Google Classroom',
                        category: 'Learning Management',
                        description:
                            'The most popular LMS integration. Automatically sync class rosters, assignments, and grades between EduPortal and Google Classroom without any manual effort.',
                        highlights: [
                            'Automatic two-way roster syncing with zero duplicates',
                            'Assignments and grades push to both platforms in real time',
                            'Supports multi-school setups with org-unit mapping',
                            'One-click provisioning for new academic sessions',
                        ],
                        href: ROUTES.marketing.integrations,
                        ctaLabel: 'Learn more',
                    },
                    {
                        logo: 'https://i.ibb.co.com/B5zHDhwQ/image.png',
                        name: 'Stripe',
                        category: 'Payment Gateways',
                        description:
                            "Collect tuition, transport, and activity fees with the world's most trusted payment processor. Full PCI compliance and automatic receipt generation included.",
                        highlights: [
                            'Accept credit cards, debit cards, and digital wallets',
                            'Automated fee receipt generation and email delivery',
                            'Support for installment plans and partial payments',
                            'Real-time payment status synced to parent dashboard',
                        ],
                        href: ROUTES.marketing.integrations,
                        ctaLabel: 'Learn more',
                    },
                    {
                        logo: 'https://i.ibb.co.com/TD6cbcV1/image.png',
                        name: 'Zoom',
                        category: 'Video Conferencing',
                        description:
                            'Launch virtual classes, parent-teacher conferences, and administrative meetings from anywhere inside EduPortal. Calendar sync, recording, and attendance tracking included.',
                        highlights: [
                            'One-click meeting creation from timetable or calendar',
                            'Automatic attendance logging for virtual sessions',
                            'Cloud recording storage linked to class resources',
                            'Breakout rooms for group activities and tutorials',
                        ],
                        href: ROUTES.marketing.integrations,
                        ctaLabel: 'Learn more',
                    },
                ]}
            />

            <Api
                eyebrow="Developer API"
                title="Build Custom Integrations with Our API"
                description="EduPortal provides a comprehensive REST API so your development team can build custom integrations, automate workflows, and connect bespoke systems unique to your institution."
                badge="REST API v2 — Stable"
                features={[
                    {
                        icon: Lock,
                        text: 'OAuth 2.0 & API key authentication with role-based scopes',
                    },
                    {
                        icon: RefreshCw,
                        text: 'Real-time webhooks for attendance, fee, and grade events',
                    },
                    {
                        icon: Database,
                        text: 'Full CRUD operations on students, staff, classes, and fees',
                    },
                    {
                        icon: Zap,
                        text: 'Rate-limited to 10,000 requests/min with burst support',
                    },
                    {
                        icon: FileText,
                        text: 'Interactive API docs with Swagger/OpenAPI 3.0 spec',
                    },
                ]}
                codePreview={{
                    title: 'students.js',
                    language: 'JavaScript',
                    code: `// Fetch all students in Grade 10 with attendance data
const response = await fetch(
  'https://api.EduPortal.io/v2/students?grade=10&include=attendance',
  {
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY',
      'Content-Type': 'application/json',
    },
  }
);

const { data, pagination } = await response.json();
console.log(\`Found \${pagination.total} students\`);`,
                }}
                cta={{
                    text: 'Explore API Docs',
                    href: ROUTES.marketing.resources,
                }}
            />

            <Benefits
                eyebrow="Why Integrate?"
                title="The Benefits of a Connected School"
                subtitle="When your tools talk to each other, your school runs smoother. Here's what changes when you connect EduPortal with your existing systems."
                benefits={[
                    {
                        icon: Zap,
                        title: 'Eliminate Manual Data Entry',
                        description:
                            'Stop copying student records, grades, and attendance between systems. Integrations keep every platform synchronized automatically, saving 15+ hours per week.',
                    },
                    {
                        icon: ShieldCheck,
                        title: 'Enterprise-Grade Security',
                        description:
                            'Every integration uses encrypted connections with OAuth 2.0 authentication. Data is transmitted securely and never stored in third-party intermediaries.',
                    },
                    {
                        icon: RefreshCw,
                        title: 'Real-Time Synchronization',
                        description:
                            'Changes made in any connected platform reflect in EduPortal within seconds. No batch processing delays — attendance, grades, and fees sync instantly.',
                    },
                    {
                        icon: LayoutDashboard,
                        title: 'Unified Dashboard View',
                        description:
                            'See data from every connected system in one place. Teachers, admins, and parents get a complete picture without logging into multiple platforms.',
                    },
                    {
                        icon: Settings,
                        title: 'Zero-Code Setup',
                        description:
                            'Most integrations can be activated with a single click. No developers needed — connect Google Classroom, Zoom, or Stripe in under 2 minutes.',
                    },
                    {
                        icon: Globe,
                        title: 'Works Across Regions',
                        description:
                            "Whether you're in India, the Middle East, Africa, or Southeast Asia, our integrations support local payment gateways, compliance systems, and languages.",
                    },
                ]}
            />

            <HowItWorks
                eyebrow="How It Works"
                title="Connect in 4 Simple Steps"
                subtitle="Getting your school connected takes minutes, not days. Our guided setup flow ensures every integration is configured correctly the first time."
                steps={[
                    {
                        icon: Search,
                        title: 'Browse & Select',
                        description:
                            'Explore our integration marketplace and choose the tools your school already uses or wants to adopt.',
                    },
                    {
                        icon: Link2,
                        title: 'Authorize & Connect',
                        description:
                            'Click "Connect" and authorize EduPortal to communicate with your chosen platform via secure OAuth flow.',
                    },
                    {
                        icon: Settings,
                        title: 'Configure & Map',
                        description:
                            'Map your classes, sections, and academic sessions. Choose what data to sync and set your preferred sync frequency.',
                    },
                    {
                        icon: Zap,
                        title: 'Go Live & Monitor',
                        description:
                            'Activate the integration and monitor real-time sync status from your admin dashboard. Alerts notify you of any issues.',
                    },
                ]}
            />

            <Testimonial
                quote="Before EduPortal, our staff spent 3 hours every day manually entering attendance and fee data across platforms. With the Google Classroom and Stripe integrations, everything syncs automatically. We've saved over 15 hours per week and eliminated data entry errors completely."
                author="Priya Sharma"
                role="Principal"
                school="Delhi International Academy"
                avatar="https://i.ibb.co.com/Fbrpkc3H/image.png"
                logo="https://i.ibb.co.com/spwDtGz0/image.png"
            />

            <Partners
                eyebrow="Trusted Technology Partners"
                title="Built on Industry-Leading Platforms"
                subtitle="We partner with the world's most trusted technology companies to deliver reliable, scalable, and secure integrations for schools of all sizes."
                partners={[
                    {
                        name: 'Google for Education',
                        logo: 'https://i.ibb.co.com/DHxFXYtd/image.png',
                    },
                    {
                        name: 'Microsoft Education',
                        logo: 'https://i.ibb.co.com/nZhbBT1/image.png',
                    },
                    { name: 'Zoom', logo: 'https://i.ibb.co.com/sJCD3ybs/image.png' },
                    { name: 'Stripe', logo: 'https://i.ibb.co.com/fzJF1LtF/image.png' },
                    { name: 'Twilio', logo: 'https://i.ibb.co.com/RGZgkbf7/image.png' },
                    {
                        name: 'Amazon Web Services',
                        logo: 'https://i.ibb.co.com/k2nKhHjt/image.png',
                    },
                    { name: 'Razorpay', logo: 'https://i.ibb.co.com/6JpT1pty/image.png' },
                    { name: 'Moodle', logo: 'https://i.ibb.co.com/q3BLcQfR/image.png' },
                    { name: 'Canvas', logo: 'https://i.ibb.co.com/kV9n0g87/image.png' },
                    { name: 'SendGrid', logo: 'https://i.ibb.co.com/JjjWxXqT/image.png' },
                    {
                        name: 'Cloudflare',
                        logo: 'https://i.ibb.co.com/ymDRSsgJ/image.pnghttps://i.ibb.co.com/ymDRSsgJ/image.png',
                    },
                    { name: 'MongoDB', logo: 'https://i.ibb.co.com/rK3QfwS0/image.png' },
                ]}
            />

            <CTA
                title="Ready to Connect Your School?"
                description="Join 2,500+ schools already using EduPortal integrations to eliminate busywork and create a seamless experience for teachers, parents, and students."
                primaryCta={{
                    text: 'Start Free Trial',
                    href: ROUTES.auth.signup,
                }}
                secondaryCta={{
                    text: 'View All Integrations',
                    href: ROUTES.marketing.demo,
                }}
            />
        </>
    );
}
