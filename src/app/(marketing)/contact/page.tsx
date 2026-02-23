import { type Metadata } from 'next';
import { Mail, Phone, MapPin, MessageSquare, Headphones, BookOpen, Video, Building2, Globe, GraduationCap, CreditCard, Settings, ShieldCheck, Users, Facebook, Twitter, Linkedin, Youtube, } from 'lucide-react';
import { ContactHero, ContactForm, ContactInfo, Offices, Departments, ContactFAQ, SupportOptions, SocialMedia, ResponseTime, ContactCTA, } from '@/features/(marketing)/contact';
import { ROUTES } from '@/lib/routes';

// TODO: Replace static metadata with dynamic OG image generation
// TODO: Add structured data (JSON-LD) for ContactPage schema
// TODO: Integrate analytics tracking for contact form submissions
// TODO: Add hreflang tags for multi-language support
export const metadata: Metadata = {
    title: 'Contact Us | EduSync – School Management System',
    description:
        'Get in touch with the EduSync team. Whether you need a demo, technical support, or have questions about our school management platform, we are here to help schools, administrators, and parents.',
    keywords: [
        'contact EduSync',
        'school management support',
        'edtech customer service',
        'school ERP help',
        'EduSync demo request',
        'school software support',
        'education technology contact',
        'school administration help',
    ],
    openGraph: {
        title: 'Contact Us | EduSync – School Management System',
        description:
            'Reach our dedicated team for demos, onboarding support, or technical assistance. We help 2,400+ schools succeed every day.',
        url: '/contact',
        type: 'website',
        images: [
            {
                url: '/placeholder.svg',
                width: 1200,
                height: 630,
                alt: 'Contact EduSync – School Management System Support',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Contact Us | EduSync – School Management System',
        description:
            'Reach our dedicated team for demos, onboarding support, or technical assistance. We help 2,400+ schools succeed every day.',
        images: ['/placeholder.svg'],
    },
};

// TODO: Integrate contact form with backend API / CRM (HubSpot, Salesforce)
// TODO: Add Google reCAPTCHA to contact form
// TODO: Implement real-time form validation with server actions
// TODO: Add Google Maps embed for office locations
// TODO: Track contact form conversions via analytics
export default function ContactPage() {
    return (
        <>
            {/* TODO: Add breadcrumb navigation component */}
            <ContactHero
                eyebrow="GET IN TOUCH"
                title="We're Here to Help Your School Succeed"
                subtitle="Whether you're exploring EduSync for the first time, need onboarding assistance, or require technical support — our dedicated education specialists are ready to help you transform school operations."
                badges={[
                    { label: '24/7 Support', variant: 'default' },
                    { label: 'Avg. 2hr Response', variant: 'secondary' },
                    { label: '98% Satisfaction', variant: 'outline' },
                ]}
            />

            {/* TODO: Wire up contact info links with tracking events */}
            <ContactInfo
                eyebrow="REACH US DIRECTLY"
                title="Multiple Ways to Connect"
                subtitle="Choose the communication channel that works best for you. Our support team is available across phone, email, and live chat to assist with any questions."
                channels={[
                    {
                        icon: Phone,
                        label: 'Phone Support',
                        value: '+1 (800) 338-7264',
                        description: 'Mon–Fri, 7:00 AM – 8:00 PM EST',
                        href: 'tel:+18003387264',
                    },
                    {
                        icon: Mail,
                        label: 'Email Us',
                        value: 'support@edusync.io',
                        description: 'We respond within 2 business hours',
                        href: 'mailto:support@edusync.io',
                    },
                    {
                        icon: MessageSquare,
                        label: 'Live Chat',
                        value: 'Start a Conversation',
                        description: 'Instant help during business hours',
                        href: '#live-chat',
                    },
                    {
                        icon: MapPin,
                        label: 'Headquarters',
                        value: '350 Education Blvd, Austin, TX 78701',
                        description: 'Walk-ins by appointment only',
                    },
                    {
                        icon: Video,
                        label: 'Schedule a Demo',
                        value: 'Book a 30-min Call',
                        description: 'See EduSync in action with your data',
                        href: ROUTES.marketing.demo,
                    },
                    {
                        icon: BookOpen,
                        label: 'Knowledge Base',
                        value: 'Browse Help Articles',
                        description: '500+ guides, tutorials & FAQs',
                        href: ROUTES.marketing.resources,
                    },
                ]}
            />

            {/* TODO: Connect form submission to server action / API route */}
            {/* TODO: Add file upload field for supporting documents */}
            <ContactForm
                eyebrow="SEND US A MESSAGE"
                title="Fill Out the Contact Form"
                subtitle="Share your query below and a member of our education team will get back to you within 2 business hours. For urgent issues, please call our support line directly."
                card={{
                    heading: 'Contact Form',
                    description: 'All fields marked with * are required. We will never share your information with third parties.',
                    fields: [
                        {
                            label: 'First Name',
                            name: 'firstName',
                            type: 'text',
                            placeholder: 'e.g. Sarah',
                            required: true,
                            colSpan: 1,
                        },
                        {
                            label: 'Last Name',
                            name: 'lastName',
                            type: 'text',
                            placeholder: 'e.g. Johnson',
                            required: true,
                            colSpan: 1,
                        },
                        {
                            label: 'Work Email',
                            name: 'email',
                            type: 'email',
                            placeholder: 'e.g. sarah@greenfieldacademy.edu',
                            required: true,
                            colSpan: 1,
                        },
                        {
                            label: 'Phone Number',
                            name: 'phone',
                            type: 'tel',
                            placeholder: 'e.g. +1 (555) 123-4567',
                            colSpan: 1,
                        },
                        {
                            label: 'Subject',
                            name: 'subject',
                            type: 'select',
                            placeholder: 'Select a topic...',
                            required: true,
                            colSpan: 2,
                        },
                        {
                            label: 'Message',
                            name: 'message',
                            type: 'textarea',
                            placeholder: 'Tell us about your school, the challenges you face, and how we can help...',
                            required: true,
                            colSpan: 2,
                        },
                    ],
                    subjectOptions: [
                        { label: 'Request a Demo', value: 'demo' },
                        { label: 'Pricing & Plans', value: 'pricing' },
                        { label: 'Technical Support', value: 'technical-support' },
                        { label: 'Onboarding & Training', value: 'onboarding' },
                        { label: 'Attendance Module', value: 'attendance' },
                        { label: 'Fee Management', value: 'fee-management' },
                        { label: 'Report Cards & Results', value: 'results' },
                        { label: 'Parent Portal', value: 'parent-portal' },
                        { label: 'Data Migration', value: 'data-migration' },
                        { label: 'Partnership / Integration', value: 'partnership' },
                        { label: 'Billing & Invoicing', value: 'billing' },
                        { label: 'Other', value: 'other' },
                    ],
                    submitLabel: 'Send Message',
                }}
            />

            {/* TODO: Add real-time availability indicators for departments */}
            <Departments
                eyebrow="SPECIALIZED TEAMS"
                title="Reach the Right Department"
                subtitle="Our team is organized into specialized departments so you always connect with the expert who can resolve your query fastest."
                departments={[
                    {
                        icon: Headphones,
                        name: 'General Support',
                        description: 'Account access, navigation help, and general platform inquiries for all users.',
                        email: 'support@edusync.io',
                        availability: 'Mon–Fri, 7 AM – 8 PM EST',
                        ctaLabel: 'Contact Support',
                    },
                    {
                        icon: GraduationCap,
                        name: 'Sales & Demos',
                        description: 'Pricing details, plan comparisons, and live product demonstrations for decision-makers.',
                        email: 'sales@edusync.io',
                        availability: 'Mon–Fri, 8 AM – 6 PM EST',
                        ctaLabel: 'Request Demo',
                    },
                    {
                        icon: Settings,
                        name: 'Technical Support',
                        description: 'Bug reports, integration troubleshooting, API access, and performance-related issues.',
                        email: 'tech@edusync.io',
                        availability: '24/7 for Priority & Enterprise plans',
                        ctaLabel: 'Report Issue',
                    },
                    {
                        icon: CreditCard,
                        name: 'Billing & Accounts',
                        description: 'Invoice inquiries, payment processing, subscription changes, and refund requests.',
                        email: 'billing@edusync.io',
                        availability: 'Mon–Fri, 9 AM – 5 PM EST',
                        ctaLabel: 'Billing Help',
                    },
                    {
                        icon: Users,
                        name: 'Onboarding & Training',
                        description: 'Staff training sessions, data migration assistance, and guided school setup.',
                        email: 'onboarding@edusync.io',
                        availability: 'Mon–Fri, 8 AM – 6 PM EST',
                        ctaLabel: 'Schedule Training',
                    },
                    {
                        icon: ShieldCheck,
                        name: 'Security & Compliance',
                        description: 'FERPA compliance, data privacy, security audits, and institutional data protection.',
                        email: 'security@edusync.io',
                        availability: 'Mon–Fri, 9 AM – 5 PM EST',
                        ctaLabel: 'Security Inquiry',
                    },
                    {
                        icon: Globe,
                        name: 'Partnerships',
                        description: 'Reseller programs, white-label solutions, EdTech integrations, and co-marketing.',
                        email: 'partners@edusync.io',
                        availability: 'Mon–Fri, 9 AM – 5 PM EST',
                        ctaLabel: 'Partner With Us',
                    },
                    {
                        icon: BookOpen,
                        name: 'Curriculum & Content',
                        description: 'Report card templates, grading scheme setup, academic calendar configuration.',
                        email: 'curriculum@edusync.io',
                        availability: 'Mon–Fri, 9 AM – 4 PM EST',
                        ctaLabel: 'Get Assistance',
                    },
                ]}
            />

            {/* TODO: Add real-time agent availability status */}
            <SupportOptions
                eyebrow="SUPPORT CHANNELS"
                title="Choose How You Get Help"
                subtitle="From self-service resources to hands-on guided support, pick the channel that fits your urgency and preference."
                options={[
                    {
                        icon: MessageSquare,
                        name: 'Live Chat',
                        description: 'Chat with a support agent in real-time directly from your dashboard or our website.',
                        availability: 'Mon–Fri, 7 AM – 8 PM EST',
                        badge: 'Fastest',
                        ctaLabel: 'Start Chat',
                    },
                    {
                        icon: Phone,
                        name: 'Phone Support',
                        description: 'Speak with an education specialist for complex issues or urgent school operations.',
                        availability: 'Mon–Fri, 7 AM – 8 PM EST',
                        ctaLabel: 'Call Now',
                    },
                    {
                        icon: Mail,
                        name: 'Email Support',
                        description: 'Send detailed queries with screenshots or attachments for thorough investigation.',
                        availability: '24/7 – Response within 2 hours',
                        badge: 'Detailed',
                        ctaLabel: 'Send Email',
                    },
                    {
                        icon: Video,
                        name: 'Screen Share Session',
                        description: 'Book a guided video call where our team walks through solutions on your screen.',
                        availability: 'By appointment – Mon–Fri',
                        badge: 'Premium',
                        ctaLabel: 'Book Session',
                    },
                ]}
            />

            {/* TODO: Fetch response time metrics from monitoring API */}
            <ResponseTime
                eyebrow="RESPONSE METRICS"
                title="How Fast We Respond"
                subtitle="We track and optimize our response times across every channel to ensure your school never waits. Here are our current averages."
                channels={[
                    {
                        icon: 'MessageSquare',
                        channel: 'Live Chat',
                        averageTime: 'Under 2 minutes',
                        satisfactionPercent: 98,
                        note: 'Instant connection during business hours with education-trained agents.',
                    },
                    {
                        icon: 'Phone',
                        channel: 'Phone Support',
                        averageTime: 'Under 5 minutes',
                        satisfactionPercent: 96,
                        note: 'Direct line to specialists — no automated phone trees.',
                    },
                    {
                        icon: 'Mail',
                        channel: 'Email Support',
                        averageTime: 'Within 2 hours',
                        satisfactionPercent: 94,
                        note: 'Detailed responses with step-by-step guides and screenshots.',
                    },
                    {
                        icon: 'Video',
                        channel: 'Video / Screen Share',
                        averageTime: 'Scheduled within 24 hours',
                        satisfactionPercent: 99,
                        note: 'Premium and Enterprise plans get same-day scheduling.',
                    },
                ]}
            />

            {/* TODO: Add Google Maps embeds for each office */}
            <Offices
                eyebrow="OUR LOCATIONS"
                title="Visit Our Offices"
                subtitle="EduSync serves schools across the globe from our regional offices. Drop by for a face-to-face conversation or schedule an on-site demo."
                offices={[
                    {
                        icon: Building2,
                        city: 'Austin',
                        country: 'United States',
                        address: '350 Education Blvd, Suite 400, Austin, TX 78701',
                        phone: '+1 (800) 338-7264',
                        email: 'austin@edusync.io',
                        isHQ: true,
                        mapPlaceholder: 'Austin, TX – Headquarters',
                    },
                    {
                        icon: Building2,
                        city: 'London',
                        country: 'United Kingdom',
                        address: '22 Scholars Lane, Canary Wharf, London E14 5AB',
                        phone: '+44 20 7946 0832',
                        email: 'london@edusync.io',
                        mapPlaceholder: 'London, UK – EMEA Office',
                    },
                    {
                        icon: Building2,
                        city: 'Dhaka',
                        country: 'Bangladesh',
                        address: 'Level 12, Rangs Babylonia, Tejgaon, Dhaka 1208',
                        phone: '+880 2-8876543',
                        email: 'dhaka@edusync.io',
                        mapPlaceholder: 'Dhaka, BD – South Asia Office',
                    },
                    {
                        icon: Building2,
                        city: 'Dubai',
                        country: 'United Arab Emirates',
                        address: 'Office 1801, Jumeirah Bay X3, JLT, Dubai',
                        phone: '+971 4 567 8901',
                        email: 'dubai@edusync.io',
                        mapPlaceholder: 'Dubai, UAE – MENA Office',
                    },
                    {
                        icon: Building2,
                        city: 'Singapore',
                        country: 'Singapore',
                        address: '8 Marina View, #32-05, Asia Square Tower 1, 018960',
                        phone: '+65 6812 3456',
                        email: 'singapore@edusync.io',
                        mapPlaceholder: 'Singapore – APAC Office',
                    },
                    {
                        icon: Building2,
                        city: 'Lagos',
                        country: 'Nigeria',
                        address: '15 Idowu Taylor Street, Victoria Island, Lagos',
                        phone: '+234 1 453 7890',
                        email: 'lagos@edusync.io',
                        mapPlaceholder: 'Lagos, NG – Africa Office',
                    },
                ]}
            />

            {/* TODO: Replace static FAQ data with CMS-managed content */}
            {/* TODO: Add search/filter for FAQ items */}
            <ContactFAQ
                eyebrow="FREQUENTLY ASKED QUESTIONS"
                title="Common Contact Questions"
                subtitle="Find quick answers about reaching our team, response expectations, and the best way to get support for your school."
                items={[
                    {
                        question: 'What are your customer support hours?',
                        answer: 'Our general support team is available Monday through Friday, 7:00 AM to 8:00 PM EST. Enterprise and Priority plan customers receive 24/7 support with dedicated account managers and priority ticket escalation.',
                    },
                    {
                        question: 'How quickly will I get a response to my email?',
                        answer: 'We aim to respond to all email inquiries within 2 business hours. For urgent issues related to active school operations — such as attendance system downtime or fee portal errors — we offer an expedited response within 30 minutes for Priority and Enterprise plans.',
                    },
                    {
                        question: 'Can I schedule a live demo before purchasing?',
                        answer: 'Absolutely! We offer free 30-minute demo sessions where our education specialists walk you through the entire EduSync platform using sample school data. You can book a session directly from our Demo page or by contacting sales@edusync.io.',
                    },
                    {
                        question: 'Do you offer on-site training for school staff?',
                        answer: 'Yes, our Onboarding & Training team provides both virtual and on-site training sessions. On-site training is available for schools with 500+ students and is included in our Enterprise plan. Smaller schools can opt for our comprehensive virtual training workshops.',
                    },
                    {
                        question: 'How do I report a technical issue or bug?',
                        answer: 'You can report technical issues via email at tech@edusync.io, through our live chat, or directly from the Help widget in your EduSync dashboard. Please include screenshots, the affected module (e.g., Attendance, Fees), and steps to reproduce the issue for the fastest resolution.',
                    },
                    {
                        question: 'Is there a self-service knowledge base?',
                        answer: 'Yes, our Knowledge Base contains over 500 articles, video tutorials, and step-by-step guides covering every module — from initial setup to advanced reporting. Access it anytime from the Resources section of our website or the Help menu in your dashboard.',
                    },
                    {
                        question: 'Who should I contact for billing or subscription changes?',
                        answer: 'For all billing inquiries — including plan upgrades, invoice disputes, payment method updates, and refund requests — please contact billing@edusync.io or call our Billing & Accounts department during business hours (Mon–Fri, 9 AM – 5 PM EST).',
                    },
                    {
                        question: 'Do you have a partner or reseller program?',
                        answer: 'Yes, we partner with EdTech resellers, system integrators, and education consultants worldwide. Our partner program includes white-label options, revenue sharing, co-marketing support, and dedicated partner training. Reach out to partners@edusync.io to learn more.',
                    },
                ]}
            />

            {/* TODO: Integrate live social media feeds / follower counts */}
            <SocialMedia
                eyebrow="FOLLOW US"
                title="Stay Connected on Social Media"
                subtitle="Follow EduSync for product updates, education insights, webinar announcements, and tips to get the most out of your school management platform."
                platforms={[
                    {
                        icon: Facebook,
                        name: 'Facebook',
                        href: 'https://facebook.com/edusync',
                        handle: '@EduSync',
                    },
                    {
                        icon: Twitter,
                        name: 'X (Twitter)',
                        href: 'https://twitter.com/edusync',
                        handle: '@EduSync',
                    },
                    {
                        icon: Linkedin,
                        name: 'LinkedIn',
                        href: 'https://linkedin.com/company/edusync',
                        handle: 'EduSync',
                    },
                    {
                        icon: Youtube,
                        name: 'YouTube',
                        href: 'https://youtube.com/@edusync',
                        handle: '@EduSync',
                    },
                ]}
            />

            {/* TODO: Add event tracking for CTA button clicks */}
            <ContactCTA
                eyebrow="READY TO TRANSFORM YOUR SCHOOL?"
                title="Start Your EduSync Journey Today"
                subtitle="Join 2,400+ schools that have streamlined attendance, automated fee collection, and empowered parents with real-time academic insights. Book a free demo or talk to our team."
                primaryCTA={{
                    label: 'Book a Free Demo',
                    href: ROUTES.marketing.demo,
                }}
                secondaryCTA={{
                    label: 'View Pricing Plans',
                    href: ROUTES.marketing.pricing,
                }}
            />
        </>
    );
}
