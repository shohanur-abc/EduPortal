import { type Metadata } from 'next';
import { BookOpen, CreditCard, GraduationCap, Headphones, HelpCircle, LifeBuoy, Lock, Mail, MessageCircle, Monitor, Phone, Rocket, School, Settings, Shield, Users, Zap, } from 'lucide-react';
import { FAQHero, GeneralFAQ, PricingFAQ, TechnicalFAQ, SecurityFAQ, FAQCategories, StillHaveQuestions, PopularFAQ, VideoGuides, FAQCTA, } from '@/features/(marketing)/faq';
import ROUTES from '@/lib/routes';

// TODO: Add structured data (FAQPage schema.org) for SEO
// TODO: Wire up search functionality with client component wrapper
// TODO: Add breadcrumb navigation

export const metadata: Metadata = {
    title: 'FAQ — EduSync School Management System',
    description:
        'Find answers to frequently asked questions about EduSync — the all-in-one school management platform for attendance, fees, results, and operations.',
    keywords: [
        'school management system FAQ',
        'EduSync help',
        'school ERP questions',
        'student information system FAQ',
        'school software support',
        'EdTech FAQ',
        'school attendance system help',
        'fee management questions',
    ],
    openGraph: {
        title: 'FAQ — EduSync School Management System',
        description:
            'Get quick answers about EduSync features, pricing, setup, security, and more. Everything you need to know about our school management platform.',
        url: ROUTES.marketing.faq,
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'FAQ — EduSync School Management System',
        description:
            'Get quick answers about EduSync features, pricing, setup, security, and more.',
    },
    alternates: {
        canonical: ROUTES.marketing.faq,
    },
};

export default function FAQPage() {
    return (
        <>
            {/* TODO: Add breadcrumb component */}

            <FAQHero
                eyebrow="Help Center"
                title="Frequently Asked Questions"
                subtitle="Everything you need to know about EduSync. Can't find what you're looking for? Our support team is always ready to help."
                searchPlaceholder="Search questions — e.g. attendance, fee collection, report cards..."
            />

            <FAQCategories
                eyebrow="Browse by Topic"
                title="Find Answers by Category"
                subtitle="Jump directly to the topic you need help with. We've organized our FAQs into clear categories so you can find answers faster."
                categories={[
                    {
                        icon: HelpCircle,
                        label: 'General',
                        description:
                            'Learn the basics — what EduSync is, who it\'s for, and how to get started.',
                        anchor: '#general',
                        count: 8,
                    },
                    {
                        icon: CreditCard,
                        label: 'Pricing & Billing',
                        description:
                            'Plans, payment methods, invoicing, and everything related to costs.',
                        anchor: '#pricing',
                        count: 7,
                    },
                    {
                        icon: Monitor,
                        label: 'Technical',
                        description:
                            'System requirements, integrations, data migration, and API access.',
                        anchor: '#technical',
                        count: 7,
                    },
                    {
                        icon: Shield,
                        label: 'Security & Privacy',
                        description:
                            'Data protection, compliance, access controls, and student privacy.',
                        anchor: '#security',
                        count: 6,
                    },
                    {
                        icon: GraduationCap,
                        label: 'Student Management',
                        description:
                            'Enrollment, attendance tracking, report cards, and student portals.',
                        anchor: '#general',
                        count: 5,
                    },
                    {
                        icon: Users,
                        label: 'Parent & Teacher',
                        description:
                            'Communication tools, parent portals, and teacher dashboards.',
                        anchor: '#general',
                        count: 4,
                    },
                    {
                        icon: Settings,
                        label: 'Setup & Onboarding',
                        description:
                            'Installation, configuration, training, and initial data import.',
                        anchor: '#technical',
                        count: 5,
                    },
                    {
                        icon: LifeBuoy,
                        label: 'Support',
                        description:
                            'How to reach us, response times, and available support channels.',
                        anchor: '#still-have-questions',
                        count: 4,
                    },
                ]}
            />

            <PopularFAQ
                eyebrow="Most Asked"
                title="Popular Questions"
                subtitle="Here are the questions our schools ask most often. Start here for quick answers to common topics."
                questions={[
                    {
                        icon: School,
                        question: 'What is EduSync and how does it help schools?',
                        answer: 'EduSync is an all-in-one school management system that digitizes attendance, fee collection, exam results, timetabling, and parent communication. It reduces administrative workload by up to 70% and gives principals real-time visibility into every aspect of school operations.',
                        category: 'General',
                    },
                    {
                        icon: Rocket,
                        question: 'How long does it take to set up EduSync?',
                        answer: 'Most schools are fully operational within 2–4 weeks. Our onboarding team handles data migration, staff training, and initial configuration. Small schools with fewer than 500 students can often go live in under 10 days.',
                        category: 'Setup',
                    },
                    {
                        icon: CreditCard,
                        question: 'Can parents pay fees through the platform?',
                        answer: 'Yes. EduSync supports online fee collection via credit/debit cards, bank transfers, UPI, and mobile wallets. Parents receive automated receipts, and the finance team gets real-time reconciliation dashboards with overdue alerts.',
                        category: 'Fees',
                    },
                    {
                        icon: BookOpen,
                        question: 'Does EduSync generate report cards automatically?',
                        answer: 'Absolutely. Teachers enter marks once, and EduSync auto-calculates grades, rankings, and cumulative GPAs. Report cards are generated in your school\'s branded template and can be shared digitally with parents or printed in bulk.',
                        category: 'Results',
                    },
                    {
                        icon: Users,
                        question: 'How do parents stay informed about their child?',
                        answer: 'Parents get a dedicated mobile portal with real-time access to attendance records, exam results, fee statements, homework assignments, and school announcements. Push notifications ensure they never miss critical updates.',
                        category: 'Communication',
                    },
                    {
                        icon: Lock,
                        question: 'Is student data safe on EduSync?',
                        answer: 'We use AES-256 encryption at rest and TLS 1.3 in transit. All data is stored in SOC 2 Type II certified data centers with daily backups. Role-based access control ensures that staff only see the data they\'re authorized to view.',
                        category: 'Security',
                    },
                ]}
            />

            <GeneralFAQ
                eyebrow="General"
                title="General Questions"
                subtitle="Get answers to the most common questions about EduSync, our mission, and how the platform works for schools of all sizes."
                questions={[
                    {
                        question: 'What types of schools can use EduSync?',
                        answer: 'EduSync is designed for K-12 schools, pre-schools, international schools, school chains, and after-school programs. Whether you have 50 students or 50,000 across multiple campuses, the platform scales to fit your needs with multi-branch support and role-based access.',
                    },
                    {
                        question: 'Do we need any special hardware to run EduSync?',
                        answer: 'No special hardware is required. EduSync is fully cloud-based and works on any modern web browser — Chrome, Firefox, Safari, or Edge. For attendance, you can optionally integrate biometric scanners or RFID readers, but the built-in mobile app also supports QR-code-based attendance.',
                    },
                    {
                        question: 'Can EduSync handle multiple branches or campuses?',
                        answer: 'Yes. Our multi-branch architecture lets school chains manage all campuses from a single admin dashboard. Each branch retains its own data isolation while the central office gets consolidated reports, fee summaries, and performance analytics across all locations.',
                    },
                    {
                        question: 'Is there a mobile app available?',
                        answer: 'EduSync offers dedicated mobile apps for Android and iOS for three user roles: administrators, teachers, and parents. Teachers can mark attendance and enter grades on the go, while parents can view real-time updates, pay fees, and communicate with teachers directly.',
                    },
                    {
                        question: 'What languages does EduSync support?',
                        answer: 'The platform currently supports English, Hindi, Bengali, Spanish, French, and Arabic with full right-to-left layout support. We add new languages based on demand and can work with your team to provide translations for your region.',
                    },
                    {
                        question: 'How is EduSync different from a regular ERP?',
                        answer: 'Unlike generic ERPs, EduSync is purpose-built for education. Every feature — from the attendance engine to the report card generator — is designed around academic workflows. We understand term structures, grading scales, parent-teacher dynamics, and education compliance requirements out of the box.',
                    },
                    {
                        question: 'Can we customize EduSync to match our school branding?',
                        answer: 'Absolutely. You can upload your school logo, set brand colors, customize report card templates, and even use your own domain for the parent portal. Premium plans include fully white-labeled experiences with custom email templates and SMS sender IDs.',
                    },
                    {
                        question: 'Does EduSync work offline?',
                        answer: 'The mobile app supports offline mode for critical tasks like attendance marking and grade entry. Data syncs automatically once the device reconnects to the internet. The web dashboard requires an active internet connection for full functionality.',
                    },
                ]}
            />

            <PricingFAQ
                eyebrow="Pricing & Billing"
                title="Pricing & Billing Questions"
                subtitle="Transparent pricing with no hidden fees. Understand exactly what you're paying for and how our plans work."
                questions={[
                    {
                        question: 'How much does EduSync cost?',
                        answer: 'EduSync offers three tiers: Starter at $2/student/month for small schools up to 300 students, Professional at $3.50/student/month for mid-size schools with advanced analytics and integrations, and Enterprise with custom pricing for school chains with 5+ campuses. All plans include unlimited admin and teacher accounts.',
                    },
                    {
                        question: 'Is there a free trial available?',
                        answer: 'Yes, we offer a 30-day free trial with full access to all Professional plan features. No credit card is required to start. Our onboarding team will even help you import sample data so you can experience the platform with realistic school scenarios.',
                    },
                    {
                        question: 'What payment methods do you accept?',
                        answer: 'We accept credit/debit cards (Visa, MasterCard, Amex), bank wire transfers, ACH payments, and UPI for Indian schools. Annual plans can be invoiced for purchase-order-based procurement workflows commonly used by school boards and government institutions.',
                    },
                    {
                        question: 'Are there any setup fees or hidden charges?',
                        answer: 'There are no setup fees for Starter and Professional plans. Data migration assistance, staff training (up to 4 sessions), and standard support are included at no extra cost. Custom integrations and dedicated onboarding managers are available as add-ons for Enterprise clients.',
                    },
                    {
                        question: 'Can we switch plans mid-year?',
                        answer: 'Yes, you can upgrade your plan at any time and the pricing difference is prorated. Downgrades take effect at the next billing cycle. If your student count changes significantly during the year, we adjust billing automatically at the end of each quarter.',
                    },
                    {
                        question: 'Do you offer discounts for annual billing?',
                        answer: 'Annual billing comes with a 20% discount compared to monthly pricing. We also offer special pricing for government schools, non-profit institutions, and schools in underserved communities. Contact our sales team to discuss eligibility.',
                    },
                    {
                        question: 'What happens to our data if we cancel?',
                        answer: 'Upon cancellation, your data remains accessible in read-only mode for 90 days. You can export all records — student profiles, financial data, attendance logs, and report cards — in CSV, Excel, or PDF format at any time. After 90 days, data is securely purged from our servers.',
                    },
                ]}
            />

            <TechnicalFAQ
                eyebrow="Technical"
                title="Technical Questions"
                subtitle="Deep-dive into system requirements, integrations, APIs, and data migration. Built for IT administrators and tech-savvy school leaders."
                questions={[
                    {
                        question: 'What are the system requirements for EduSync?',
                        answer: 'EduSync is a cloud-based SaaS platform that runs in any modern browser (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+). The mobile apps require iOS 15+ or Android 10+. A stable internet connection of 2 Mbps or higher is recommended for optimal performance.',
                    },
                    {
                        question: 'Does EduSync provide an API for custom integrations?',
                        answer: 'Yes. EduSync offers a comprehensive RESTful API with full documentation, SDKs for Node.js and Python, and webhook support for real-time event notifications. The API covers all core modules — students, attendance, fees, results, and communications. OAuth 2.0 authentication is supported.',
                    },
                    {
                        question: 'Can we migrate data from our existing system?',
                        answer: 'Absolutely. Our data migration team supports imports from Excel spreadsheets, CSV files, and direct database transfers from popular systems like Fedena, OpenSIS, and PowerSchool. We validate all data during migration and provide a detailed reconciliation report before going live.',
                    },
                    {
                        question: 'Does EduSync integrate with accounting software?',
                        answer: 'EduSync integrates natively with Tally, QuickBooks, Xero, and Zoho Books. Fee collection data, expense records, and salary disbursements sync automatically. We also support custom integrations through our API for proprietary accounting systems.',
                    },
                    {
                        question: 'What is the uptime guarantee?',
                        answer: 'We guarantee 99.9% uptime backed by an SLA. Our infrastructure runs on redundant cloud servers across multiple availability zones. In the past 12 months, our actual uptime has been 99.97%. Scheduled maintenance windows are communicated 72 hours in advance and occur outside school hours.',
                    },
                    {
                        question: 'Can EduSync integrate with biometric attendance devices?',
                        answer: 'Yes. EduSync supports integration with popular biometric devices from ZKTeco, eSSL, and HikVision via our hardware bridge application. We also support RFID card readers and NFC-based attendance for younger students who may have difficulty with biometric scanners.',
                    },
                    {
                        question: 'How are updates and new features rolled out?',
                        answer: 'EduSync follows a continuous deployment model. Minor updates and bug fixes are released weekly without any downtime. Major feature releases happen quarterly and are communicated through in-app announcements, email newsletters, and detailed release notes in our knowledge base.',
                    },
                ]}
            />

            <SecurityFAQ
                eyebrow="Security & Privacy"
                title="Security & Privacy Questions"
                subtitle="Student data protection is our top priority. Learn how EduSync safeguards sensitive information and meets compliance standards."
                questions={[
                    {
                        question: 'How does EduSync protect student data?',
                        answer: 'All data is encrypted using AES-256 at rest and TLS 1.3 in transit. We implement role-based access control (RBAC) so that each user — teacher, parent, admin — only sees the data they\'re authorized to access. Multi-factor authentication is available for all accounts and enforced for admin roles.',
                    },
                    {
                        question: 'Is EduSync compliant with data protection regulations?',
                        answer: 'Yes. EduSync is compliant with GDPR, FERPA, COPPA, and India\'s DPDP Act. We conduct annual third-party security audits and maintain SOC 2 Type II certification. Our data processing agreements (DPAs) are available upon request for institutional review.',
                    },
                    {
                        question: 'Where is our school data stored?',
                        answer: 'Data is stored in SOC 2 certified data centers in the region closest to your school — currently AWS Mumbai, AWS Frankfurt, and AWS Virginia. Indian schools\' data stays within India per data localization requirements. Enterprise clients can request specific data residency locations.',
                    },
                    {
                        question: 'How often is data backed up?',
                        answer: 'Full backups run daily with incremental backups every 4 hours. Backups are stored in a geographically separate location and retained for 90 days. In the event of data loss, we can restore your school\'s data to any point within the last 90 days with a recovery time objective (RTO) of under 4 hours.',
                    },
                    {
                        question: 'Can we control who accesses what data?',
                        answer: 'Absolutely. EduSync offers granular role-based permissions. School administrators can create custom roles — for example, a "Class Teacher" role that can only see their assigned students, or a "Fee Clerk" role limited to financial data. All access is logged in an immutable audit trail.',
                    },
                    {
                        question: 'What happens in case of a security breach?',
                        answer: 'We have a documented incident response plan. In the unlikely event of a breach, affected schools are notified within 24 hours with a full impact assessment. We maintain a bug bounty program and conduct quarterly penetration testing with independent security firms to proactively identify vulnerabilities.',
                    },
                ]}
            />

            <VideoGuides
                eyebrow="Video Tutorials"
                title="Watch & Learn"
                subtitle="Prefer watching over reading? Our video guides walk you through common tasks step-by-step so you can get the most out of EduSync."
                videos={[
                    {
                        title: 'Getting Started with EduSync',
                        description:
                            'A complete walkthrough of initial setup — adding your school, importing students, and configuring your first academic year.',
                        thumbnailUrl: 'https://i.ibb.co.com/TqJgTQsK/8o-Eepun-Mjt-U-HD.jpg',
                        duration: '8:42',
                        category: 'Onboarding',
                        href: 'https://www.youtube.com/watch?v=8oEepunMjtU',
                    },
                    {
                        title: 'Marking Attendance in Under 60 Seconds',
                        description:
                            'Learn how teachers can mark class attendance using the mobile app with QR codes or the web dashboard in just a few taps.',
                        thumbnailUrl: 'https://i.ibb.co.com/VcK7Y3QH/va-SL9782-Jo-U-HD.jpg',
                        duration: '3:15',
                        category: 'Attendance',
                        href: 'https://www.youtube.com/watch?v=vaSL9782JoU&list=PLD4yJgnADM0pHZu1PMb8EljbcqWMchfA5',
                    },
                    {
                        title: 'Setting Up Online Fee Collection',
                        description:
                            'Configure payment gateways, create fee structures, assign fees to classes, and enable parent self-service payments.',
                        thumbnailUrl: 'https://i.ibb.co.com/tMKkLnFg/Features-and-Benefits-School-Fee-Management-Software-System.jpg',
                        duration: '6:30',
                        category: 'Fees',
                        href: 'https://www.youtube.com/watch?v=jNLJ4r8Cwpg',
                    },
                    {
                        title: 'Generating & Publishing Report Cards',
                        description:
                            'Enter exam marks, configure grading scales, and generate branded report cards that parents can view instantly.',
                        thumbnailUrl: 'https://i.ibb.co.com/Q3sCjqfw/j-Afi-Glm-Lxso-HD.jpg',
                        duration: '5:48',
                        category: 'Results',
                        href: 'https://www.youtube.com/watch?v=jAfiGlmLxso&list=PLDLLuBZ1-Ett1_-2vax4_nMqVnn7mTtv7',
                    },
                    {
                        title: 'Managing Roles & Permissions',
                        description:
                            'Create custom roles for teachers, department heads, and clerks with fine-grained data access control.',
                        thumbnailUrl: 'https://i.ibb.co.com/PGzxdzxz/Role-of-School-Management-System.jpg',
                        duration: '4:22',
                        category: 'Admin',
                        href: 'https://www.youtube.com/watch?v=10An8tiwh6w',
                    },
                    {
                        title: 'Parent Portal Overview',
                        description:
                            'See how parents use the EduSync app to track attendance, view results, pay fees, and communicate with teachers.',
                        thumbnailUrl: 'https://i.ibb.co.com/spFWpLTL/KSURo-J9-IVZY-HD.jpg',
                        duration: '5:10',
                        category: 'Parents',
                        href: 'https://www.youtube.com/watch?v=KSURoJ9IVZY',
                    },
                ]}
            />

            <StillHaveQuestions
                eyebrow="Need More Help?"
                title="Still Have Questions?"
                subtitle="Our support team is here for you. Reach out through any of these channels and we'll get back to you promptly."
                channels={[
                    {
                        icon: MessageCircle,
                        label: 'Live Chat',
                        description:
                            'Chat with our support team in real time. Available Monday–Saturday, 8 AM – 8 PM IST with average response time under 2 minutes.',
                        buttonLabel: 'Start Chat',
                        href: ROUTES.marketing.contact,
                    },
                    {
                        icon: Mail,
                        label: 'Email Support',
                        description:
                            'Send us a detailed query and our team will respond within 4 business hours. Great for non-urgent or complex questions.',
                        buttonLabel: 'Send Email',
                        href: 'mailto:support@edusync.io',
                    },
                    {
                        icon: Phone,
                        label: 'Phone Support',
                        description:
                            'Speak directly with a support specialist. Available for Professional and Enterprise plan subscribers during business hours.',
                        buttonLabel: 'Call Us',
                        href: 'tel:+918001234567',
                    },
                ]}
            />

            {/* TODO: Add community forum link section */}
            {/* TODO: Add knowledge base / documentation link */}

            <FAQCTA
                eyebrow="Ready to Get Started?"
                title="See EduSync in Action"
                subtitle="Join 2,500+ schools already using EduSync to streamline operations, engage parents, and improve student outcomes."
                actions={[
                    {
                        icon: Rocket,
                        label: 'Book a Free Demo',
                        href: ROUTES.marketing.demo,
                        variant: 'default',
                    },
                    {
                        icon: Zap,
                        label: 'Start Free Trial',
                        href: ROUTES.auth.signup,
                        variant: 'outline',
                    },
                    {
                        icon: Headphones,
                        label: 'Contact Sales',
                        href: ROUTES.marketing.contact,
                        variant: 'secondary',
                    },
                ]}
            />
        </>
    );
}