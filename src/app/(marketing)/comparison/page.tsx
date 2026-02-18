import { type Metadata } from 'next';

import { Award, BarChart3, CheckCircle, Clock, Cloud, CreditCard, Database, DollarSign, Globe, GraduationCap, Headphones, Lock, MessageSquare, Rocket, School, Settings, Smartphone, TrendingUp, Upload, Users, Zap, } from 'lucide-react';
import { ComparisonHero, ComparisonTable, Advantages, Migration, ComparisonTestimonial, FeatureSpotlight, SupportComparison, ComparisonFAQ, ComparisonCTA, } from '@/features/(marketing)/comparison';
import ROUTES from '@/lib/routes';

// TODO: Add dynamic OG image for comparison page
// TODO: Add JSON-LD structured data for product comparison
// TODO: Add A/B testing for CTA variants
export const metadata: Metadata = {
    title: 'Compare EduSync vs PowerSchool vs Infinite Campus | School Management Software',
    description:
        'See how EduSync stacks up against PowerSchool, Infinite Campus, and other school management systems. Compare features, pricing, support, and more side by side.',
    keywords: [
        'school management software comparison',
        'PowerSchool alternative',
        'Infinite Campus alternative',
        'EduSync vs PowerSchool',
        'EduSync vs Infinite Campus',
        'best school management system',
        'EdTech comparison',
        'student information system comparison',
    ],
    openGraph: {
        title: 'EduSync vs The Competition — School Management Software Comparison',
        description:
            'Feature-by-feature comparison of EduSync with PowerSchool, Infinite Campus, and other leading school management platforms.',
        url: ROUTES.marketing.comparison,
        type: 'website',
        images: [
            {
                url: '/placeholder.svg',
                width: 1200,
                height: 630,
                alt: 'EduSync Comparison Overview',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'EduSync vs PowerSchool vs Infinite Campus',
        description:
            'Comprehensive side-by-side comparison of the top school management systems for K-12 institutions.',
        images: ['/placeholder.svg'],
    },
    alternates: {
        canonical: ROUTES.marketing.comparison,
    },
};

// TODO: Integrate live pricing data from API
// TODO: Track section visibility with analytics events
export default function ComparisonPage() {
    return (
        <>
            {/* TODO: Add breadcrumb navigation */}
            <ComparisonHero
                eyebrow="COMPARE SOLUTIONS"
                title="The Smarter Alternative to Legacy School Management"
                description="See why thousands of K-12 schools are switching to EduSync from PowerSchool, Infinite Campus, and other legacy platforms. Modern features, better pricing, and support that actually helps."
                highlights={[
                    {
                        icon: School,
                        value: '4,200+',
                        label: 'Schools Switched to EduSync',
                    },
                    {
                        icon: TrendingUp,
                        value: '47%',
                        label: 'Average Cost Savings',
                    },
                    {
                        icon: Clock,
                        value: '12 hrs',
                        label: 'Saved per Admin per Week',
                    },
                    {
                        icon: Award,
                        value: '4.9/5',
                        label: 'Customer Satisfaction Score',
                    },
                ]}
                cta={{
                    primary: { text: 'Start Free Trial', href: ROUTES.auth.signup },
                    secondary: { text: 'Request a Demo', href: ROUTES.marketing.demo },
                }}
            />

            {/* TODO: Add toggle for "Show only differences" filter */}
            <ComparisonTable
                eyebrow="Feature Comparison"
                title="How EduSync Compares Feature by Feature"
                subtitle="A transparent, detailed comparison across the categories that matter most to school administrators, teachers, and IT teams."
                products={[
                    { name: 'EduSync', highlighted: true },
                    { name: 'PowerSchool' },
                    { name: 'Infinite Campus' },
                    { name: 'Skyward' },
                ]}
                features={[
                    // Attendance Management
                    {
                        name: 'Real-Time Attendance Tracking',
                        category: 'Attendance',
                        availability: [true, true, true, true],
                    },
                    {
                        name: 'Biometric/RFID Attendance',
                        category: 'Attendance',
                        availability: [true, false, false, false],
                    },
                    {
                        name: 'GPS-Verified Bus Attendance',
                        category: 'Attendance',
                        availability: [true, false, false, false],
                    },
                    {
                        name: 'Parent Push Notifications',
                        category: 'Attendance',
                        availability: [true, true, 'Add-on', false],
                    },
                    {
                        name: 'Auto-Generated Absence Letters',
                        category: 'Attendance',
                        availability: [true, false, true, false],
                    },

                    // Fee Management
                    {
                        name: 'Online Fee Collection',
                        category: 'Fee Management',
                        availability: [true, true, true, true],
                    },
                    {
                        name: 'Multi-Currency Support',
                        category: 'Fee Management',
                        availability: [true, false, false, false],
                    },
                    {
                        name: 'Installment Plans & Auto-Reminders',
                        category: 'Fee Management',
                        availability: [true, 'Add-on', false, false],
                    },
                    {
                        name: 'Scholarship & Discount Engine',
                        category: 'Fee Management',
                        availability: [true, true, true, false],
                    },
                    {
                        name: 'Real-Time Revenue Dashboard',
                        category: 'Fee Management',
                        availability: [true, false, false, false],
                    },

                    // Academic Management
                    {
                        name: 'AI-Powered Report Cards',
                        category: 'Academics',
                        availability: [true, false, false, false],
                    },
                    {
                        name: 'Custom Grading Scales',
                        category: 'Academics',
                        availability: [true, true, true, true],
                    },
                    {
                        name: 'Standards-Based Gradebook',
                        category: 'Academics',
                        availability: [true, true, true, 'Partial'],
                    },
                    {
                        name: 'Timetable Auto-Generation',
                        category: 'Academics',
                        availability: [true, false, false, false],
                    },
                    {
                        name: 'Curriculum Mapping & Tracking',
                        category: 'Academics',
                        availability: [true, true, true, false],
                    },

                    // Communication
                    {
                        name: 'Built-In Messaging (Chat)',
                        category: 'Communication',
                        availability: [true, false, false, false],
                    },
                    {
                        name: 'SMS & Email Notifications',
                        category: 'Communication',
                        availability: [true, true, true, true],
                    },
                    {
                        name: 'Multi-Language Notices',
                        category: 'Communication',
                        availability: [true, false, false, false],
                    },
                    {
                        name: 'Parent–Teacher Conference Scheduler',
                        category: 'Communication',
                        availability: [true, 'Add-on', true, false],
                    },

                    // Technology & Platform
                    {
                        name: 'Mobile App (iOS & Android)',
                        category: 'Platform',
                        availability: [true, true, true, true],
                    },
                    {
                        name: 'Offline Mode Support',
                        category: 'Platform',
                        availability: [true, false, false, false],
                    },
                    {
                        name: 'Open REST API',
                        category: 'Platform',
                        availability: [true, true, 'Limited', false],
                    },
                    {
                        name: 'Single Sign-On (SSO)',
                        category: 'Platform',
                        availability: [true, true, true, true],
                    },
                    {
                        name: 'White-Label Branding',
                        category: 'Platform',
                        availability: [true, false, false, false],
                    },

                    // Security & Compliance
                    {
                        name: 'FERPA Compliant',
                        category: 'Security',
                        availability: [true, true, true, true],
                    },
                    {
                        name: 'SOC 2 Type II Certified',
                        category: 'Security',
                        availability: [true, true, false, false],
                    },
                    {
                        name: 'Role-Based Access Control',
                        category: 'Security',
                        availability: [true, true, true, 'Basic'],
                    },
                    {
                        name: 'Data Encryption at Rest & In Transit',
                        category: 'Security',
                        availability: [true, true, true, true],
                    },
                    {
                        name: 'Audit Logging',
                        category: 'Security',
                        availability: [true, true, 'Partial', false],
                    },
                ]}
            />

            <Advantages
                eyebrow="Why Schools Choose Us"
                title="Built Different, Built Better"
                subtitle="EduSync was designed from the ground up for modern schools — not retrofitted from a decades-old codebase. Here's what sets us apart."
                advantages={[
                    {
                        icon: Zap,
                        title: 'Lightning-Fast Performance',
                        description:
                            'Our modern cloud-native architecture delivers sub-second page loads and instant data processing, while legacy platforms leave admins waiting.',
                    },
                    {
                        icon: Smartphone,
                        title: 'True Mobile-First Design',
                        description:
                            'Every feature works beautifully on any device. Teachers take attendance from their phones, parents pay fees on the go, and admins manage operations from anywhere.',
                    },
                    {
                        icon: DollarSign,
                        title: 'Transparent, Predictable Pricing',
                        description:
                            'No hidden add-on fees, no per-module charges, no surprise invoices. One plan includes everything your school needs — period.',
                    },
                    {
                        icon: Settings,
                        title: 'Setup in Days, Not Months',
                        description:
                            'Schools go live in under 2 weeks with guided onboarding. PowerSchool implementations typically take 3–6 months and require dedicated IT staff.',
                    },
                    {
                        icon: Globe,
                        title: 'Multi-Language & Multi-Campus',
                        description:
                            'Manage multiple campuses, branches, and languages from a single dashboard. Built for school groups with 1 campus or 100.',
                    },
                    {
                        icon: Lock,
                        title: 'Enterprise-Grade Security',
                        description:
                            'SOC 2 Type II certified, FERPA compliant, end-to-end encryption, and granular role-based access control — without the enterprise price tag.',
                    },
                ]}
            />

            {/* TODO: Add animated tab transitions */}
            <FeatureSpotlight
                eyebrow="Deep Dive"
                title="Where EduSync Truly Shines"
                subtitle="Explore the key areas where our platform delivers a fundamentally better experience than legacy alternatives."
                spotlights={[
                    {
                        id: 'attendance',
                        label: 'Attendance',
                        icon: CheckCircle,
                        title: 'Smart Attendance That Goes Beyond Check-Ins',
                        description:
                            'EduSync combines biometric verification, GPS-tracked bus attendance, and real-time parent notifications into a seamless attendance workflow that eliminates manual errors and saves hours each week.',
                        highlights: [
                            'Biometric & RFID integration for tamper-proof records',
                            'Automatic SMS/push alerts within 60 seconds of absence',
                            'Period-wise attendance with flexible override rules',
                            'Predictive absence analytics to flag at-risk students',
                            'Offline mode syncs automatically when connectivity returns',
                        ],
                        comparisons: [
                            {
                                competitor: 'PowerSchool',
                                ourFeature:
                                    'Real-time biometric + GPS + push notifications with predictive analytics',
                                theirFeature:
                                    'Basic digital attendance with manual parent notification setup',
                                verdict: 'EduSync delivers 3x faster attendance workflows',
                            },
                            {
                                competitor: 'Infinite Campus',
                                ourFeature:
                                    'Period-wise tracking with auto-generated absence reports and parent alerts',
                                theirFeature:
                                    'Standard daily attendance with separate add-on for notifications',
                                verdict: 'Schools report 92% reduction in manual attendance tasks',
                            },
                        ],
                    },
                    {
                        id: 'fees',
                        label: 'Fee Management',
                        icon: CreditCard,
                        title: 'Complete Financial Management, Not Just Payment Collection',
                        description:
                            'From automated invoicing and installment plans to real-time revenue dashboards and multi-currency support, EduSync handles every aspect of school fee management without needing third-party tools.',
                        highlights: [
                            'Auto-generated invoices with customizable templates',
                            'Flexible installment plans with automated reminders',
                            'Multi-gateway payment processing (Stripe, Razorpay, PayPal)',
                            'Real-time revenue tracking and outstanding fee dashboards',
                            'Scholarship, sibling discount, and financial aid engine',
                        ],
                        comparisons: [
                            {
                                competitor: 'PowerSchool',
                                ourFeature:
                                    'Built-in payment processing with installment plans, auto-reminders, and revenue analytics',
                                theirFeature:
                                    'Third-party payment integration required; limited financial reporting',
                                verdict: 'Schools collect fees 60% faster with EduSync',
                            },
                            {
                                competitor: 'Infinite Campus',
                                ourFeature:
                                    'Multi-currency support with real-time revenue dashboards and scholarship engine',
                                theirFeature:
                                    'Basic fee collection with manual installment tracking',
                                verdict: 'Finance teams save 8+ hours weekly on fee reconciliation',
                            },
                        ],
                    },
                    {
                        id: 'reports',
                        label: 'Reports & Analytics',
                        icon: BarChart3,
                        title: 'AI-Powered Insights, Not Just Static Reports',
                        description:
                            'Go beyond basic data exports with AI-generated report cards, predictive analytics, and interactive dashboards that turn raw school data into actionable insights for every stakeholder.',
                        highlights: [
                            'AI-powered narrative report card generation',
                            'Predictive analytics for student performance trends',
                            'Custom dashboard builder with drag-and-drop widgets',
                            'Automated state & district compliance reports',
                            'Exportable charts, PDFs, and spreadsheets in one click',
                        ],
                        comparisons: [
                            {
                                competitor: 'PowerSchool',
                                ourFeature:
                                    'AI-generated narrative comments and predictive performance dashboards',
                                theirFeature:
                                    'Standard gradebook reports with manual comment entry',
                                verdict: 'Teachers save 5+ hours per reporting cycle',
                            },
                            {
                                competitor: 'Infinite Campus',
                                ourFeature:
                                    'Custom drag-and-drop analytics dashboards with real-time data',
                                theirFeature:
                                    'Pre-built reports with limited customization options',
                                verdict: 'Administrators get 360° visibility into school performance',
                            },
                        ],
                    },
                    {
                        id: 'communication',
                        label: 'Communication',
                        icon: MessageSquare,
                        title: 'Built-In Messaging That Replaces External Tools',
                        description:
                            'EduSync\'s integrated communication platform eliminates the need for separate email, SMS, and messaging services. Reach parents, teachers, and staff through a single, unified system with multi-language support.',
                        highlights: [
                            'Built-in real-time chat for parent–teacher communication',
                            'Automated multi-channel notifications (SMS, email, push, in-app)',
                            'Multi-language notice board with auto-translation',
                            'Scheduled announcements with read receipts and analytics',
                            'Emergency broadcast system with priority alerts',
                        ],
                        comparisons: [
                            {
                                competitor: 'PowerSchool',
                                ourFeature:
                                    'Unified messaging, multi-language notices, and emergency broadcasts — all built in',
                                theirFeature:
                                    'Basic notification system; requires third-party tools for advanced messaging',
                                verdict: 'Schools eliminate 2–3 separate communication tool subscriptions',
                            },
                            {
                                competitor: 'Infinite Campus',
                                ourFeature:
                                    'Real-time chat with auto-translation and read receipt analytics',
                                theirFeature:
                                    'Standard email/SMS notifications without built-in chat or translation',
                                verdict: 'Parent engagement increases by 65% on average',
                            },
                        ],
                    },
                ]}
            />

            <SupportComparison
                eyebrow="Support Comparison"
                title="Support That Actually Supports You"
                subtitle="When something goes wrong at 8 AM on a Monday, you need help now — not a ticket number and a 48-hour SLA. Compare support experiences across platforms."
                providers={[
                    {
                        icon: Headphones,
                        name: 'EduSync',
                        highlighted: true,
                        supportFeatures: [
                            { label: '24/7 Live Chat & Phone', available: true, detail: 'Average response time: under 2 minutes' },
                            { label: 'Dedicated Customer Success Manager', available: true, detail: 'Assigned from day one for all plans' },
                            { label: 'Free Onboarding & Training', available: true, detail: 'Unlimited live training sessions for your staff' },
                            { label: 'Free Data Migration', available: true, detail: 'White-glove migration from any platform' },
                            { label: 'In-App Help Center', available: true, detail: 'Searchable knowledge base + video tutorials' },
                            { label: 'Community Forum', available: true, detail: 'Active community with 10,000+ educators' },
                            { label: 'Quarterly Business Reviews', available: true, detail: 'Strategic sessions to maximize ROI' },
                            { label: 'Custom Feature Requests', available: true, detail: 'Direct input into product roadmap' },
                        ],
                    },
                    {
                        icon: Cloud,
                        name: 'PowerSchool',
                        supportFeatures: [
                            { label: '24/7 Live Chat & Phone', available: false, detail: 'Business hours only; premium support costs extra' },
                            { label: 'Dedicated Customer Success Manager', available: false, detail: 'Only available on enterprise plans' },
                            { label: 'Free Onboarding & Training', available: false, detail: 'Onboarding and training billed separately' },
                            { label: 'Free Data Migration', available: false, detail: 'Migration services start at $5,000' },
                            { label: 'In-App Help Center', available: true, detail: 'Knowledge base available' },
                            { label: 'Community Forum', available: true, detail: 'PowerSchool Community forums' },
                            { label: 'Quarterly Business Reviews', available: false, detail: 'Not included in standard plans' },
                            { label: 'Custom Feature Requests', available: false, detail: 'Limited to enterprise advisory boards' },
                        ],
                    },
                    {
                        icon: Database,
                        name: 'Infinite Campus',
                        supportFeatures: [
                            { label: '24/7 Live Chat & Phone', available: false, detail: 'Weekday support only; limited hours' },
                            { label: 'Dedicated Customer Success Manager', available: false, detail: 'Available at additional cost' },
                            { label: 'Free Onboarding & Training', available: false, detail: 'Implementation billed at $150/hr' },
                            { label: 'Free Data Migration', available: false, detail: 'Migration requires paid professional services' },
                            { label: 'In-App Help Center', available: true, detail: 'Online documentation portal' },
                            { label: 'Community Forum', available: true, detail: 'User community available' },
                            { label: 'Quarterly Business Reviews', available: false, detail: 'Not offered' },
                            { label: 'Custom Feature Requests', available: false, detail: 'Submitted via general feedback channels' },
                        ],
                    },
                ]}
            />

            <ComparisonTestimonial
                quote="We spent three years on PowerSchool and it never felt like it was designed for us. Within two weeks of switching to EduSync, our teachers actually started using the platform voluntarily. Attendance tracking went from a daily headache to a 30-second task, and our fee collection rate jumped from 72% to 96%."
                rating={5}
                switchedFrom="PowerSchool"
                author={{
                    name: 'Dr. Sarah Mitchell',
                    role: 'Superintendent',
                    school: 'Greenfield Unified School District',
                    avatar: '/placeholder.svg',
                }}
            />

            {/* TODO: Add animated step transitions on scroll */}
            <Migration
                eyebrow="Seamless Migration"
                title="Switch to EduSync in Under 2 Weeks"
                subtitle="Our white-glove migration process ensures zero data loss and minimal disruption. We handle the heavy lifting so your team can focus on what matters — educating students."
                steps={[
                    {
                        icon: MessageSquare,
                        title: 'Discovery Call',
                        description:
                            'We assess your current setup, map your data structure, and create a customized migration plan tailored to your school or district.',
                        duration: 'Day 1–2',
                    },
                    {
                        icon: Upload,
                        title: 'Data Migration',
                        description:
                            'Our engineers securely transfer all student records, attendance history, fee data, and user accounts from your existing platform.',
                        duration: 'Day 3–7',
                    },
                    {
                        icon: Users,
                        title: 'Training & Setup',
                        description:
                            'Unlimited live training sessions for administrators, teachers, and parents. We configure dashboards, roles, and workflows to match your needs.',
                        duration: 'Day 8–12',
                    },
                    {
                        icon: Rocket,
                        title: 'Go Live & Support',
                        description:
                            'Launch with confidence. Your dedicated success manager provides hands-on support during the first 30 days and beyond.',
                        duration: 'Day 13–14',
                    },
                ]}
                cta={{
                    text: 'Start Your Free Migration',
                    href: ROUTES.marketing.demo,
                }}
            />

            {/* TODO: Add search/filter for FAQ questions */}
            <ComparisonFAQ
                eyebrow="Common Questions"
                title="Comparison FAQ"
                subtitle="Answers to the most common questions schools ask when evaluating EduSync against other platforms."
                questions={[
                    {
                        question: 'How does EduSync pricing compare to PowerSchool and Infinite Campus?',
                        answer: 'EduSync typically costs 40–60% less than PowerSchool and Infinite Campus. Our pricing is all-inclusive with no per-module fees, no implementation charges, and no hidden costs. A school with 500 students pays around $3,600/year for EduSync compared to $8,500+ for PowerSchool with equivalent modules.',
                    },
                    {
                        question: 'Can I migrate from PowerSchool or Infinite Campus without losing data?',
                        answer: 'Absolutely. Our migration team has successfully transferred data from PowerSchool, Infinite Campus, Skyward, Tyler SIS, and dozens of other platforms. We handle the entire process — including student records, attendance history, grade data, fee records, and user accounts — with zero data loss guaranteed.',
                    },
                    {
                        question: 'How long does it take to switch from our current system?',
                        answer: 'Most schools are fully migrated and operational within 2 weeks. Larger districts with complex configurations may take 3–4 weeks. This is significantly faster than the 3–6 month implementation timelines typical of PowerSchool or Infinite Campus.',
                    },
                    {
                        question: 'Does EduSync support state reporting and compliance?',
                        answer: 'Yes. EduSync supports automated state reporting for all 50 US states, including CALPADS (California), TEDS (Texas), EMIS (Ohio), and more. We also maintain FERPA compliance, SOC 2 Type II certification, and COPPA compliance out of the box.',
                    },
                    {
                        question: 'What if we need features that EduSync doesn\'t have yet?',
                        answer: 'Every EduSync customer gets direct access to our product roadmap and can submit feature requests. Our average turnaround for customer-requested features is 6–8 weeks. Enterprise customers also get a dedicated product liaison and quarterly roadmap reviews.',
                    },
                    {
                        question: 'Is EduSync suitable for large school districts?',
                        answer: 'Yes. EduSync powers districts with up to 50,000+ students across multiple campuses. Our multi-tenant architecture ensures that large-scale deployments perform just as fast as single-school setups, with centralized dashboards for district-level oversight.',
                    },
                    {
                        question: 'Do we need dedicated IT staff to manage EduSync?',
                        answer: 'No. Unlike PowerSchool and Infinite Campus, which often require dedicated IT personnel for maintenance, updates, and troubleshooting, EduSync is fully cloud-managed. Updates are automatic, and our support team handles any technical issues 24/7.',
                    },
                    {
                        question: 'Can we try EduSync before committing?',
                        answer: 'Yes! We offer a 30-day free trial with full access to every feature — no credit card required. We also provide a guided demo where our team walks you through the platform using your actual school data so you can see exactly how it would work for your institution.',
                    },
                ]}
            />

            <ComparisonCTA
                title="Ready to Leave Legacy Systems Behind?"
                description="Join 4,200+ schools that have already made the switch. Start your free trial today and see the difference a modern school management platform makes."
                perks={[
                    '30-day free trial',
                    'No credit card required',
                    'Free data migration',
                    'Cancel anytime',
                    '24/7 onboarding support',
                ]}
                primaryCta={{ text: 'Start Free Trial', href: ROUTES.auth.signup }}
                secondaryCta={{ text: 'Schedule a Demo', href: ROUTES.marketing.demo }}
            />
        </>
    );
}
