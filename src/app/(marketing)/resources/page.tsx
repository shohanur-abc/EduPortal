import { type Metadata } from 'next';
import { BookOpen, CalendarCheck, ClipboardList, CreditCard, FileSpreadsheet, GraduationCap, MessageSquare, Rocket, School, Settings, ShieldCheck, Users, } from 'lucide-react';
import { Hero, Guides, Webinars, Templates, Videos, HelpCenter, Community, Newsletter, CaseStudiesPreview, CTA, } from '@/features/(marketing)/resources';

import { ROUTES } from '@/lib/routes';

// TODO: Add structured data (JSON-LD) for resource hub page
// TODO: Add dynamic category filtering via searchParams
// TODO: Integrate CMS for guides, webinars, and video content
// TODO: Add pagination or infinite scroll for resource listings
// TODO: Track resource downloads and video views via analytics

export const metadata: Metadata = {
    title: 'Resources — Guides, Webinars & Templates for School Management',
    description:
        'Access free guides, webinars, downloadable templates, tutorial videos, and community forums to help your school get the most out of EduPortal — the all-in-one school management platform.',
    keywords: [
        'school management resources',
        'edtech guides',
        'school administration templates',
        'education webinars',
        'school ERP tutorials',
        'student management help',
        'attendance tracking guide',
        'fee management templates',
    ],
    openGraph: {
        title: 'Resources — Guides, Webinars & Templates | EduPortal ',
        description:
            'Everything you need to succeed with EduPortal . Browse our library of guides, templates, recorded webinars, and tutorial videos for school administrators and educators.',
        url: '/resources',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Resources — Guides, Webinars & Templates | EduPortal ',
        description:
            'Browse our comprehensive resource library with guides, webinars, downloadable templates, and tutorial videos for school management.',
    },
};

export default function Page() {
    return (
        <>
            {/* TODO: Add breadcrumb navigation */}
            <Hero
                badge="Resource Center"
                title="Everything You Need to"
                highlight="Succeed"
                description="Explore our comprehensive library of guides, webinars, templates, and tutorials designed to help school administrators, teachers, and staff master EduPortal and streamline school operations."
                searchPlaceholder="Search guides, templates, webinars..."
                categories={[
                    { label: 'All Resources', active: true },
                    { label: 'Guides', count: 12 },
                    { label: 'Webinars', count: 8 },
                    { label: 'Templates', count: 15 },
                    { label: 'Videos', count: 20 },
                    { label: 'Help Articles', count: 45 },
                ]}
            />

            {/* TODO: Connect guides to CMS or API endpoint */}
            <Guides
                eyebrow="In-Depth Guides"
                title="Master School Management"
                subtitle="Step-by-step guides and whitepapers written by education technology experts to help you optimize every aspect of school administration."
                guides={[
                    {
                        type: 'guide',
                        title: 'The Complete Guide to Digital Attendance Tracking',
                        description:
                            'Learn how to set up automated attendance tracking, configure absence notifications for parents, and generate compliance-ready attendance reports across all grade levels.',
                        pages: 34,
                        downloadUrl: '#',
                    },
                    {
                        type: 'whitepaper',
                        title: 'Reducing Fee Defaults by 60%: A Data-Driven Approach',
                        description:
                            'Discover proven strategies used by 200+ schools to reduce fee defaults through automated reminders, flexible payment plans, and real-time parent communication.',
                        pages: 22,
                        downloadUrl: '#',
                    },
                    {
                        type: 'ebook',
                        title: 'Digital Transformation in K-12 Schools',
                        description:
                            'A comprehensive roadmap for transitioning from paper-based administration to a fully digital school management ecosystem, including change management best practices.',
                        pages: 58,
                        downloadUrl: '#',
                    },
                    {
                        type: 'guide',
                        title: 'Setting Up Exam Management & Report Cards',
                        description:
                            'Configure grading scales, create exam schedules, enter marks efficiently, and generate professional report cards with cumulative performance analytics.',
                        pages: 28,
                        downloadUrl: '#',
                    },
                    {
                        type: 'whitepaper',
                        title: 'School Data Security & FERPA Compliance',
                        description:
                            'Understand how EduPortal protects student data with encryption, role-based access, audit trails, and full FERPA/COPPA compliance — including a security audit checklist.',
                        pages: 18,
                        downloadUrl: '#',
                    },
                    {
                        type: 'guide',
                        title: 'Parent Engagement: Communication Best Practices',
                        description:
                            'Maximize parent involvement with automated notices, real-time grade updates, attendance alerts, and fee reminders through multi-channel communication.',
                        pages: 24,
                        downloadUrl: '#',
                    },
                ]}
            />

            {/* TODO: Integrate with webinar platform API for live status */}
            <Webinars
                eyebrow="Live & Recorded Webinars"
                title="Learn from Education Experts"
                subtitle="Join our live sessions or watch recordings at your own pace. Our webinars cover everything from platform onboarding to advanced administrative workflows."
                webinars={[
                    {
                        status: 'upcoming',
                        title: 'Streamlining Mid-Year Admissions with EduPortal ',
                        description:
                            'Learn how to handle mid-year student enrollments, transfer records, and section assignments without disrupting ongoing operations.',
                        date: 'March 15, 2026 — 2:00 PM EST',
                        duration: '60 min',
                        speaker: {
                            name: 'Dr. Priya Sharma',
                            role: 'Head of Product, EduPortal ',
                            avatar: '/placeholder.svg',
                        },
                        attendees: 342,
                        actionUrl: '#',
                    },
                    {
                        status: 'upcoming',
                        title: 'Advanced Report Card Customization Workshop',
                        description:
                            'Hands-on session covering custom grading rubrics, co-scholastic assessments, teacher remarks templates, and multi-language report card generation.',
                        date: 'March 28, 2026 — 11:00 AM EST',
                        duration: '90 min',
                        speaker: {
                            name: 'Michael Torres',
                            role: 'Senior Education Consultant',
                            avatar: '/placeholder.svg',
                        },
                        attendees: 189,
                        actionUrl: '#',
                    },
                    {
                        status: 'recorded',
                        title: 'Fee Collection Automation: Zero to Fully Digital',
                        description:
                            'Complete walkthrough of setting up fee structures, payment gateways, installment plans, late-fee rules, and automated receipt generation.',
                        date: 'January 20, 2026',
                        duration: '75 min',
                        speaker: {
                            name: 'Anita Desai',
                            role: 'Finance Solutions Lead',
                            avatar: '/placeholder.svg',
                        },
                        attendees: 1_247,
                        actionUrl: '#',
                    },
                    {
                        status: 'recorded',
                        title: 'Getting Started with EduPortal : Complete Onboarding',
                        description:
                            'A beginner-friendly walkthrough covering initial school setup, academic year configuration, class creation, staff onboarding, and student data import.',
                        date: 'December 5, 2025',
                        duration: '45 min',
                        speaker: {
                            name: 'Rahul Menon',
                            role: 'Customer Success Manager',
                            avatar: '/placeholder.svg',
                        },
                        attendees: 3_580,
                        actionUrl: '#',
                    },
                    {
                        status: 'recorded',
                        title: 'Data-Driven Decision Making for School Principals',
                        description:
                            'How to leverage EduPortal analytics dashboards for enrollment trends, attendance patterns, academic performance insights, and resource allocation.',
                        date: 'November 12, 2025',
                        duration: '55 min',
                        speaker: {
                            name: 'Dr. Sarah Okonkwo',
                            role: 'Education Analytics Expert',
                            avatar: '/placeholder.svg',
                        },
                        attendees: 2_134,
                        actionUrl: '#',
                    },
                    {
                        status: 'recorded',
                        title: 'Multi-Branch School Management Best Practices',
                        description:
                            'Strategies for managing multiple campuses from a single dashboard, including centralized reporting, unified fee structures, and cross-branch staff management.',
                        date: 'October 8, 2025',
                        duration: '65 min',
                        speaker: {
                            name: 'James Whitfield',
                            role: 'Enterprise Solutions Architect',
                            avatar: '/placeholder.svg',
                        },
                        attendees: 978,
                        actionUrl: '#',
                    },
                ]}
            />

            {/* TODO: Add file format icons and download tracking */}
            <Templates
                eyebrow="Downloadable Templates"
                title="Ready-to-Use School Templates"
                subtitle="Save hours of administrative work with professionally designed templates for every aspect of school management. Customize and use them instantly."
                templates={[
                    {
                        icon: CalendarCheck,
                        title: 'Annual Academic Calendar Template',
                        description:
                            'Pre-structured academic year calendar with slots for term dates, exam schedules, holidays, parent-teacher meetings, and school events.',
                        format: 'xlsx',
                        category: 'Planning',
                        downloadUrl: '#',
                    },
                    {
                        icon: FileSpreadsheet,
                        title: 'Student Bulk Import Spreadsheet',
                        description:
                            'Formatted spreadsheet for bulk-uploading student records including personal details, guardian info, class assignments, and medical information.',
                        format: 'csv',
                        category: 'Data Entry',
                        downloadUrl: '#',
                    },
                    {
                        icon: CreditCard,
                        title: 'Fee Structure Planning Worksheet',
                        description:
                            'Comprehensive template for defining tuition, transport, lab, activity fees with installment breakdowns, sibling discounts, and scholarship adjustments.',
                        format: 'xlsx',
                        category: 'Finance',
                        downloadUrl: '#',
                    },
                    {
                        icon: ClipboardList,
                        title: 'Exam Timetable Generator Template',
                        description:
                            'Class-wise and subject-wise exam scheduling template with conflict detection columns, room allocation, and invigilator assignment sheets.',
                        format: 'xlsx',
                        category: 'Examinations',
                        downloadUrl: '#',
                    },
                    {
                        icon: Users,
                        title: 'Staff Onboarding Checklist',
                        description:
                            'Step-by-step onboarding checklist for new teachers and staff including document collection, system access setup, timetable assignment, and training schedule.',
                        format: 'pdf',
                        category: 'HR',
                        downloadUrl: '#',
                    },
                    {
                        icon: BookOpen,
                        title: 'Daily Lesson Plan Template',
                        description:
                            'Structured lesson plan format with learning objectives, teaching activities, assessment methods, homework assignments, and reflection notes for teachers.',
                        format: 'docx',
                        category: 'Teaching',
                        downloadUrl: '#',
                    },
                    {
                        icon: ShieldCheck,
                        title: 'School Safety & Emergency Plan',
                        description:
                            'Complete emergency preparedness document template covering evacuation procedures, emergency contacts, drill schedules, and incident reporting forms.',
                        format: 'pdf',
                        category: 'Safety',
                        downloadUrl: '#',
                    },
                    {
                        icon: MessageSquare,
                        title: 'Parent Communication Templates Pack',
                        description:
                            'Collection of email and SMS templates for fee reminders, attendance alerts, event invitations, report card notifications, and general announcements.',
                        format: 'docx',
                        category: 'Communication',
                        downloadUrl: '#',
                    },
                ]}
            />

            {/* TODO: Integrate with video hosting platform (YouTube/Vimeo) API */}
            <Videos
                eyebrow="Tutorial Videos"
                title="Watch & Learn"
                subtitle="Short, focused video tutorials that walk you through every feature of EduPortal . Perfect for quick onboarding and ongoing reference."
                videos={[
                    {
                        thumbnail: 'https://i.ytimg.com/vi/dQJUDYCiLMs/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLDCaZsjSwIvJUUf5tFtX_jgUAoSJw',
                        title: 'Dashboard Overview: Your School at a Glance',
                        description:
                            'A quick tour of the EduPortal dashboard showing real-time enrollment stats, attendance summaries, fee collection status, and upcoming events.',
                        duration: '2:16',
                        category: 'Getting Started',
                        url: 'https://www.youtube.com/watch?v=dQJUDYCiLMs&pp=ygUrRGFzaGJvYXJkIE92ZXJ2aWV3OiBZb3VyIFNjaG9vbCBhdCBhIEdsYW5jZQ%3D%3D',
                    },
                    {
                        thumbnail: 'https://i.ytimg.com/vi/Rf650IcQAlQ/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLC1Pq9u_S_TYF1TeY0al0UJ6CC0FA',
                        title: 'Marking Attendance in Under 30 Seconds',
                        description:
                            'See how teachers can mark class-wide attendance with a single tap, handle late arrivals, and auto-notify absent students\' parents instantly.',
                        duration: '13:04',
                        category: 'Attendance',
                        url: 'https://www.youtube.com/watch?v=Rf650IcQAlQ&pp=ygUmTWFya2luZyBBdHRlbmRhbmNlIGluIFVuZGVyIDMwIFNlY29uZHM%3D',
                    },
                    {
                        thumbnail: 'https://i.ytimg.com/vi/17lmT_H9e7U/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLCNSQ2qAJwqfMNV23ykkMMpkZceJQ',
                        title: 'Creating and Managing Fee Structures',
                        description:
                            'Step-by-step walkthrough of setting up fee categories, defining installment schedules, applying discounts, and enabling online payment collection.',
                        duration: '3:01',
                        category: 'Fees & Finance',
                        url: 'https://www.youtube.com/watch?v=17lmT_H9e7U&pp=ygUkQ3JlYXRpbmcgYW5kIE1hbmFnaW5nIEZlZSBTdHJ1Y3R1cmVz',
                    },
                    {
                        thumbnail: 'https://i.ytimg.com/vi/C_BhochIS9I/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLAfA_rpWfvHdXA2er0uMwoVS4AkoQ',
                        title: 'Generating Report Cards Automatically',
                        description:
                            'Learn how to configure grading systems, enter marks, and generate beautifully formatted report cards with performance charts and teacher comments.',
                        duration: '19:47',
                        category: 'Results',
                        url: 'https://www.youtube.com/watch?v=C_BhochIS9I&pp=ygUlR2VuZXJhdGluZyBSZXBvcnQgQ2FyZHMgQXV0b21hdGljYWxseQ%3D%3D',
                    },
                    {
                        thumbnail: 'https://i.ytimg.com/vi/ydvrMGpC82Q/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLCf4onuditM5vXHhNunxzpNKrDDAA',
                        title: 'Managing Classes, Sections & Timetables',
                        description:
                            'Create class hierarchies, assign sections, build master timetables, manage subject-teacher mappings, and handle substitution scheduling.',
                        duration: '11:34',
                        category: 'Operations',
                        url: 'https://www.youtube.com/watch?v=ydvrMGpC82Q&pp=ygUnTWFuYWdpbmcgQ2xhc3NlcywgU2VjdGlvbnMgJiBUaW1ldGFibGVz',
                    },
                    {
                        thumbnail: 'https://i.ytimg.com/vi/Cy-o0LECWWU/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLCoeGI5zVtypkKHKjz8y2nri2rchg',
                        title: 'Role-Based Access Control Setup',
                        description:
                            'Configure user roles for admins, principals, teachers, accountants, and parents with granular permissions to protect sensitive school data.',
                        duration: '41:09',
                        category: 'Security',
                        url: 'https://www.youtube.com/watch?v=HHuiV841g_w&pp=ygUfUm9sZS1CYXNlZCBBY2Nlc3MgQ29udHJvbCBTZXR1cA%3D%3D',
                    },
                ]}
            />

            {/* TODO: Integrate with knowledge base API for article counts */}
            <HelpCenter
                eyebrow="Help Center"
                title="Find Answers Instantly"
                subtitle="Browse our organized help center with detailed articles, step-by-step tutorials, and troubleshooting guides for every EduPortal module."
                categories={[
                    {
                        icon: Rocket,
                        title: 'Getting Started',
                        description:
                            'School setup, academic year configuration, initial data import, and first-time onboarding walkthroughs for administrators.',
                        articleCount: 14,
                        href: '#',
                    },
                    {
                        icon: GraduationCap,
                        title: 'Student Management',
                        description:
                            'Enrollment, admissions, student profiles, class assignments, promotions, transfer certificates, and alumni tracking.',
                        articleCount: 18,
                        href: '#',
                    },
                    {
                        icon: CalendarCheck,
                        title: 'Attendance & Leave',
                        description:
                            'Daily attendance marking, biometric integration, leave applications, absence notifications, and attendance reporting.',
                        articleCount: 11,
                        href: '#',
                    },
                    {
                        icon: CreditCard,
                        title: 'Fees & Payments',
                        description:
                            'Fee structure setup, online payment gateways, receipt generation, installment tracking, and financial reporting.',
                        articleCount: 16,
                        href: '#',
                    },
                    {
                        icon: ClipboardList,
                        title: 'Exams & Results',
                        description:
                            'Exam scheduling, marks entry, grade calculation, report card generation, and academic performance analytics.',
                        articleCount: 13,
                        href: '#',
                    },
                    {
                        icon: Settings,
                        title: 'Administration & Settings',
                        description:
                            'User roles, permissions, notifications, integrations, data backup, school branding, and system configuration.',
                        articleCount: 20,
                        href: '#',
                    },
                ]}
            />

            {/* TODO: Connect community stats to live data */}
            <Community
                eyebrow="Join the Community"
                title="Connect with Educators Worldwide"
                subtitle="Be part of a thriving community of school administrators, principals, teachers, and edtech enthusiasts sharing best practices and success stories."
                stats={[
                    { value: '12,500+', label: 'Community Members' },
                    { value: '3,200+', label: 'Schools Represented' },
                    { value: '850+', label: 'Discussion Threads' },
                    { value: '45+', label: 'Countries' },
                ]}
                channels={[
                    {
                        icon: MessageSquare,
                        title: 'Discussion Forum',
                        description:
                            'Ask questions, share workflows, and exchange ideas with fellow school administrators and EduPortal power users.',
                        memberCount: 8_400,
                        href: '#',
                    },
                    {
                        icon: Users,
                        title: 'Principal\'s Circle',
                        description:
                            'An exclusive community for school principals and heads to discuss leadership, policy implementation, and institutional growth strategies.',
                        memberCount: 1_250,
                        href: '#',
                    },
                    {
                        icon: School,
                        title: 'Feature Requests & Roadmap',
                        description:
                            'Vote on upcoming features, submit your ideas, and directly influence the EduPortal product roadmap based on your school\'s needs.',
                        memberCount: 3_800,
                        href: '#',
                    },
                ]}
                cta={{
                    text: 'Join the Community',
                    href: '#',
                }}
            />

            {/* TODO: Connect newsletter form to email marketing service */}
            <Newsletter
                title="Stay Ahead in School Management"
                description="Get the latest guides, product updates, webinar invitations, and education technology insights delivered to your inbox every two weeks. Trusted by 8,000+ school leaders."
                inputPlaceholder="Enter your school email address"
                buttonText="Subscribe"
                features={[
                    'Bi-weekly updates',
                    'No spam, ever',
                    'Unsubscribe anytime',
                    'Exclusive early access',
                ]}
            />

            {/* TODO: Fetch case studies dynamically from API */}
            <CaseStudiesPreview
                eyebrow="Success Stories"
                title="See How Schools Thrive with EduPortal "
                subtitle="Read real-world case studies from schools that transformed their administration, improved parent engagement, and saved hundreds of hours with EduPortal ."
                studies={[
                    {
                        logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSms3UPCR3Bc-__4Xl5EyeNF_AHmyh5l7R_bw&s',
                        schoolName: 'Delhi Public Academy',
                        metric: '72%',
                        metricLabel: 'reduction in manual admin work',
                        summary:
                            'A 3,500-student school that digitized attendance, fee collection, and report cards in under 8 weeks — saving 40+ staff hours every week.',
                        tags: ['K-12', 'Attendance', 'Fee Management'],
                        href: ROUTES.marketing.caseStudies,
                    },
                    {
                        logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmmDZqeJxFpAUqzeo9mQzdI-73Bt-rFsMGMw&s',
                        schoolName: 'Greenfield International School',
                        metric: '95%',
                        metricLabel: 'on-time fee collection rate',
                        summary:
                            'How a multi-branch international school unified fee management across 4 campuses and reduced payment defaults from 35% to under 5%.',
                        tags: ['Multi-Branch', 'Finance', 'Payments'],
                        href: ROUTES.marketing.caseStudies,
                    },
                    {
                        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Saint-Marys-College-HS.jpg/330px-Saint-Marys-College-HS.jpg',
                        schoolName: 'St. Mary\'s High School',
                        metric: '4.8/5',
                        metricLabel: 'parent satisfaction score',
                        summary:
                            'A 60-year-old institution that modernized parent communication with real-time attendance alerts, instant report cards, and a dedicated parent portal.',
                        tags: ['Parent Engagement', 'Communication', 'Results'],
                        href: ROUTES.marketing.caseStudies,
                    },
                ]}
                viewAllText="View All Case Studies"
            />

            <CTA
                title="Ready to Transform Your School?"
                description="Join 3,200+ schools already using EduPortal to simplify administration, engage parents, and empower educators. Start your free trial today — no credit card required."
                primaryCta={{
                    text: 'Start Free Trial',
                    href: ROUTES.auth.signup,
                }}
                secondaryCta={{
                    text: 'Book a Demo',
                    href: ROUTES.marketing.demo,
                }}
            />
        </>
    );
}
