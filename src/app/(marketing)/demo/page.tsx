// TODO: Add structured data (JSON-LD) for demo/product page SEO
// TODO: Add A/B testing variants for hero copy and CTA text
// TODO: Integrate with analytics to track demo request conversions
// TODO: Add dynamic calendar integration for live demo scheduling
// TODO: Connect demo form to CRM (HubSpot/Salesforce) webhook

import { type Metadata } from 'next';
import { CalendarCheck, ClipboardList, Clock, CreditCard, FileText, GraduationCap, Headphones, LayoutDashboard, Lock, MessageSquare, Monitor, Phone, PlayCircle, RefreshCw, School, Shield, ShieldCheck, UserCheck, Users, Video, type LucideIcon } from 'lucide-react';
import { DemoCTA, DemoFAQ, DemoForm, DemoFormats, DemoGuarantee, DemoHero, DemoProcess, DemoStats, DemoTestimonial, WhatYoullSee, } from '@/features/(marketing)/demo';
import { ROUTES } from '@/lib/routes';

// TODO: Add Open Graph image specific to demo page (demo-og.png)
// TODO: Add hreflang alternates for multilingual demo pages
export const metadata: Metadata = {
    title: 'Request a Demo | EduSync – School Management System',
    description:
        'See EduSync in action. Schedule a personalized demo of our all-in-one school management platform covering admissions, attendance, fees, exams, and parent communication.',
    keywords: [
        'school management system demo',
        'edtech demo',
        'school ERP demo',
        'education software demo',
        'school administration platform',
        'student information system demo',
        'EduSync demo',
    ],
    openGraph: {
        title: 'Request a Demo | EduSync – School Management System',
        description:
            'See EduSync in action. Schedule a personalized demo of our all-in-one school management platform covering admissions, attendance, fees, exams, and parent communication.',
        url: '/demo',
        type: 'website',
        images: [
            {
                url: '/placeholder.svg',
                width: 1200,
                height: 630,
                alt: 'EduSync School Management System Demo',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Request a Demo | EduSync – School Management System',
        description:
            'See EduSync in action. Schedule a personalized demo and discover how 2,500+ schools streamline their operations.',
        images: ['/placeholder.svg'],
    },
    alternates: {
        canonical: '/demo',
    },
};

export default function DemoPage() {
    return (
        <>
            {/* TODO: Add breadcrumb structured data */}
            <DemoHero
                eyebrow="See EduSync in Action"
                title="Experience the Future of"
                highlight="School Management"
                description="Join 2,500+ schools that have transformed their operations with EduSync. Get a personalized walkthrough tailored to your institution's size, curriculum, and unique challenges."
                trustBadges={[
                    { icon: ShieldCheck as LucideIcon, label: 'SOC 2 Certified' },
                    { icon: Clock as LucideIcon, label: '30-Minute Walkthrough' },
                    { icon: Users as LucideIcon, label: '2,500+ Schools Trust Us' },
                    { icon: Headphones as LucideIcon, label: 'Dedicated Onboarding' },
                ]}
            />

            {/* TODO: Wire up form submission to API route /api/demo-request */}
            {/* TODO: Add reCAPTCHA or Turnstile spam protection */}
            <DemoForm
                eyebrow="Book Your Demo"
                title="Schedule a Personalized Walkthrough"
                subtitle="Fill in your details and our education technology specialists will prepare a demo tailored to your school's needs."
                form={{
                    heading: 'Request Your Free Demo',
                    description:
                        'No commitment required — see how EduSync fits your institution in just 30 minutes.',
                    fields: [
                        {
                            label: 'Full Name',
                            placeholder: 'e.g. Dr. Ananya Sharma',
                            type: 'text',
                        },
                        {
                            label: 'Work Email',
                            placeholder: 'e.g. ananya@greenvalley.edu',
                            type: 'email',
                        },
                        {
                            label: 'Phone Number',
                            placeholder: 'e.g. +91 98765 43210',
                            type: 'tel',
                        },
                        {
                            label: 'School / Institution Name',
                            placeholder: 'e.g. Green Valley International School',
                            type: 'text',
                        },
                        {
                            label: 'Your Designation',
                            placeholder: 'e.g. Principal, IT Admin, Director',
                            type: 'text',
                        },
                    ],
                    selectField: {
                        label: 'Number of Students',
                        placeholder: 'Select student strength',
                        options: [
                            { label: 'Under 200', value: 'under-200' },
                            { label: '200 – 500', value: '200-500' },
                            { label: '500 – 1,000', value: '500-1000' },
                            { label: '1,000 – 3,000', value: '1000-3000' },
                            { label: '3,000 – 5,000', value: '3000-5000' },
                            { label: '5,000+', value: '5000-plus' },
                        ],
                        fullWidth: true,
                    },
                    submitLabel: 'Schedule My Free Demo',
                }}
            />

            {/* TODO: Add animated module icons on hover */}
            <WhatYoullSee
                eyebrow="Platform Overview"
                title="What You'll See in Your Demo"
                subtitle="Our specialists will walk you through the modules most relevant to your school, covering everything from daily operations to strategic reporting."
                items={[
                    {
                        icon: LayoutDashboard as LucideIcon,
                        title: 'Admin Dashboard',
                        description:
                            'A unified command center with real-time KPIs, student metrics, staff summaries, and actionable notifications at a glance.',
                    },
                    {
                        icon: GraduationCap as LucideIcon,
                        title: 'Student Admissions',
                        description:
                            'Online application forms, document verification workflows, merit-based selection, and automated offer letter generation.',
                    },
                    {
                        icon: ClipboardList as LucideIcon,
                        title: 'Attendance Tracking',
                        description:
                            'Biometric, RFID, and app-based attendance with real-time parent SMS alerts, leave management, and trend analytics.',
                    },
                    {
                        icon: CreditCard as LucideIcon,
                        title: 'Fee Management',
                        description:
                            'Customizable fee structures, online payment gateways, automated receipts, installment plans, and overdue reminders.',
                    },
                    {
                        icon: FileText as LucideIcon,
                        title: 'Exam & Results',
                        description:
                            'Exam scheduling, mark entry, grade computation, report card generation, and performance analytics across terms.',
                    },
                    {
                        icon: MessageSquare as LucideIcon,
                        title: 'Parent Communication',
                        description:
                            'In-app messaging, push notifications, SMS broadcasts, parent-teacher meeting scheduling, and feedback forms.',
                    },
                    {
                        icon: Users as LucideIcon,
                        title: 'Staff & HR',
                        description:
                            'Staff profiles, payroll processing, leave tracking, performance reviews, and document management in one place.',
                    },
                    {
                        icon: School as LucideIcon,
                        title: 'Timetable & Scheduling',
                        description:
                            'AI-powered timetable generation with conflict detection, substitute management, and room allocation optimization.',
                    },
                ]}
            />

            {/* TODO: Add pricing links to each format card */}
            <DemoFormats
                eyebrow="Choose Your Experience"
                title="Demo Formats That Fit Your Schedule"
                subtitle="Whether you prefer a quick overview or an in-depth exploration, we have a demo format that works for your team."
                formats={[
                    {
                        icon: PlayCircle as LucideIcon,
                        name: 'Self-Guided Tour',
                        description:
                            'Explore EduSync at your own pace with our interactive product walkthrough. Perfect for initial evaluation before scheduling a live session.',
                        duration: '15 minutes',
                        features: [
                            'Interactive product walkthrough',
                            'Key module highlights',
                            'Available 24/7 on-demand',
                            'No signup required to start',
                        ],
                    },
                    {
                        icon: Video as LucideIcon,
                        name: 'Live Personalized Demo',
                        description:
                            'A one-on-one session with our education technology specialist, tailored to your school\'s specific workflows, challenges, and goals.',
                        badge: 'Most Popular',
                        duration: '30 minutes',
                        features: [
                            'Customized to your school\'s needs',
                            'Live Q&A with a product expert',
                            'Module deep-dive of your choice',
                            'ROI analysis for your institution',
                            'Recording shared post-session',
                        ],
                        highlighted: true,
                    },
                    {
                        icon: Users as LucideIcon,
                        name: 'Group Workshop',
                        description:
                            'Bring your entire leadership team — principals, IT heads, and administrators — for a comprehensive hands-on workshop with live sandbox access.',
                        duration: '60 minutes',
                        features: [
                            'Up to 10 stakeholders per session',
                            'Hands-on sandbox environment',
                            'Implementation roadmap review',
                            'Custom integration discussion',
                            'Dedicated follow-up support',
                        ],
                    },
                ]}
            />

            {/* TODO: Fetch testimonial dynamically from CMS */}
            <DemoTestimonial
                quote="The demo completely changed our perspective on school management software. Within 30 minutes, our team saw exactly how EduSync could replace five separate tools we were juggling. We signed up the same week and haven't looked back since."
                author={{
                    name: 'Dr. Meera Krishnan',
                    role: 'Principal',
                    school: 'Sunrise International Academy, Bangalore',
                    avatar: '/placeholder.svg',
                }}
                context="Sunrise International Academy migrated 3,200 students to EduSync in under 4 weeks with zero data loss."
            />

            <DemoProcess
                eyebrow="How It Works"
                title="From Demo to Deployment in 4 Simple Steps"
                subtitle="Our streamlined onboarding process ensures your school is up and running quickly with minimal disruption to daily operations."
                steps={[
                    {
                        icon: CalendarCheck as LucideIcon,
                        title: 'Schedule Your Demo',
                        description:
                            'Pick a time that works for your team. We\'ll send a confirmation with a pre-demo questionnaire to tailor the session.',
                        duration: '2 min to book',
                    },
                    {
                        icon: Monitor as LucideIcon,
                        title: 'Attend Your Session',
                        description:
                            'Join a live walkthrough customized to your school\'s size, board, and operational priorities with a dedicated specialist.',
                        duration: '30 min session',
                    },
                    {
                        icon: UserCheck as LucideIcon,
                        title: 'Start Your Free Trial',
                        description:
                            'Get 14 days of full platform access with sample data preloaded so your team can explore every module hands-on.',
                        duration: '14-day trial',
                    },
                    {
                        icon: RefreshCw as LucideIcon,
                        title: 'Go Live with Support',
                        description:
                            'Our onboarding team handles data migration, staff training, and configuration — so you launch with confidence.',
                        duration: '2–4 weeks',
                    },
                ]}
            />

            <DemoStats
                eyebrow="Proven Results"
                title="The Impact Schools See After Switching to EduSync"
                subtitle="Real metrics from real schools — see the measurable difference EduSync makes in day-to-day operations and long-term outcomes."
                stats={[
                    {
                        value: '2,500+',
                        label: 'Schools Onboarded',
                        description: 'Across 18 countries and 40+ education boards worldwide',
                    },
                    {
                        value: '65%',
                        label: 'Admin Time Saved',
                        description: 'Average reduction in manual administrative work per week',
                    },
                    {
                        value: '98.7%',
                        label: 'Uptime SLA',
                        description: 'Enterprise-grade reliability with 24/7 monitoring',
                    },
                    {
                        value: '4.9/5',
                        label: 'Customer Rating',
                        description: 'Based on 1,200+ verified reviews from school leaders',
                    },
                ]}
            />

            {/* TODO: Add search/filter for FAQ items */}
            {/* TODO: Link FAQ answers to relevant documentation pages */}
            <DemoFAQ
                eyebrow="Common Questions"
                title="Everything You Need to Know Before Your Demo"
                subtitle="Get answers to the most frequently asked questions about the demo experience, onboarding, and what to expect."
                items={[
                    {
                        question: 'How long does a typical demo session last?',
                        answer: 'Our standard live demo runs for 30 minutes, including a 20-minute tailored walkthrough and 10 minutes for Q&A. Group workshops are 60 minutes. We never rush — if you need more time, we\'re happy to schedule a follow-up.',
                    },
                    {
                        question: 'Do I need to prepare anything before the demo?',
                        answer: 'No preparation is required! However, if you share your school\'s size, board affiliation, and key pain points beforehand via our pre-demo questionnaire, we can customize the session to focus on the modules most relevant to you.',
                    },
                    {
                        question: 'Can I invite other stakeholders from my school?',
                        answer: 'Absolutely. We encourage you to bring decision-makers such as principals, IT administrators, accountants, and department heads. For groups larger than 5, we recommend our Group Workshop format for a more interactive experience.',
                    },
                    {
                        question: 'Is the demo truly free with no obligations?',
                        answer: 'Yes, 100%. The demo is completely free with no credit card required and no contractual obligations. Our goal is to help you evaluate whether EduSync is the right fit for your institution — no pressure, no sales gimmicks.',
                    },
                    {
                        question: 'Will I see my school\'s actual data during the demo?',
                        answer: 'We use realistic sample data during the demo to showcase all features. Once you start your 14-day free trial, you can import your own data or work with our team to set up a sandbox with your school\'s actual structure.',
                    },
                    {
                        question: 'What happens after the demo?',
                        answer: 'After the demo, you\'ll receive a session recording, a personalized proposal, and access to a 14-day free trial. Our onboarding specialist will be assigned to guide you through setup, data migration, and staff training at no extra cost.',
                    },
                    {
                        question: 'How does EduSync handle data security and privacy?',
                        answer: 'EduSync is SOC 2 Type II certified and fully GDPR compliant. All data is encrypted at rest and in transit using AES-256 encryption. We perform regular third-party security audits and offer data residency options for schools in regulated regions.',
                    },
                    {
                        question: 'Can EduSync integrate with tools we already use?',
                        answer: 'Yes. EduSync offers pre-built integrations with popular tools like Google Workspace, Microsoft 365, Tally, Razorpay, Zoom, and WhatsApp Business. We also provide REST APIs and webhooks for custom integrations with your existing systems.',
                    },
                ]}
            />

            <DemoGuarantee
                eyebrow="Our Promise"
                title="Book With Confidence"
                subtitle="We stand behind every demo with guarantees that put your school's needs first."
                guarantees={[
                    {
                        icon: Shield as LucideIcon,
                        title: 'No-Obligation Demo',
                        description:
                            'Experience the full platform without any pressure to purchase. No credit card, no hidden fees, no contracts — just a genuine product walkthrough.',
                    },
                    {
                        icon: Lock as LucideIcon,
                        title: 'Data Privacy Guaranteed',
                        description:
                            'Any information you share is protected by enterprise-grade encryption and strict privacy policies. We never sell or share your data with third parties.',
                    },
                    {
                        icon: Phone as LucideIcon,
                        title: 'Dedicated Support',
                        description:
                            'From your first demo to full deployment, you\'ll have a named education technology specialist as your single point of contact for all questions.',
                    },
                ]}
            />

            {/* TODO: Add urgency element (limited slots this week) */}
            <DemoCTA
                title="Ready to Transform Your School?"
                description="Join 2,500+ schools already using EduSync to save 65% of admin time, improve parent satisfaction, and make data-driven decisions every day."
                primaryCta={{
                    text: 'Schedule Your Free Demo',
                    href: ROUTES.marketing.contact,
                }}
                secondaryCta={{
                    text: 'View Pricing Plans',
                    href: ROUTES.marketing.pricing,
                }}
            />
        </>
    );
}
