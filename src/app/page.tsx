import { Hero, Features, HowItWorks, Testimonials, PricingPreview, TrustedBy, Benefits, FAQPreview, CTA, WhyChooseUs } from '@/features/(marketing)/home';
import { Users, GraduationCap, ClipboardCheck, BarChart3, CreditCard, Bell, Calendar, Shield, BookOpen, FileText, MessageSquare, Settings, Smartphone, Zap, Clock, HeartHandshake } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'EduPortal — Modern School Management System',
    description: 'Streamline your school operations with our all-in-one school management platform. Attendance, grades, fees, communication — everything in one place.',
};

// TODO: Replace placeholder images with real assets
// TODO: Connect stats to real-time data from API
// TODO: Add A/B testing variants for hero CTA

export default function Page() {
    return (
        <>
            <Hero
                announcement={{
                    text: 'Introducing AI-powered report cards',
                    href: '/blog',
                    badge: 'New',
                }}
                title={{
                    text: 'The Modern Platform for',
                    highlight: 'School Management',
                }}
                description="Streamline attendance, grades, fees, and parent communication — all in one powerful, easy-to-use platform trusted by 2,000+ schools."
                cta={{
                    primary: { text: 'Start Free Trial', href: '/demo' },
                    secondary: { text: 'Watch Demo', href: '/demo' },
                }}
                stats={[
                    { value: '2,000+', label: 'Schools' },
                    { value: '500K+', label: 'Students' },
                    { value: '99.9%', label: 'Uptime' },
                    { value: '4.9/5', label: 'Rating' },
                ]}
            />

            <TrustedBy
                eyebrow="Trusted By"
                title="Powering Schools Worldwide"
                subtitle="From small private schools to large school districts, leading institutions trust EduManager."
                logos={[
                    { name: 'Springfield Academy', logo: 'https://images.unsplash.com/photo-1481114070102-72f9d11057dc?q=80&w=1240&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', href: '#' },
                    { name: 'Oakridge International', logo: 'https://plus.unsplash.com/premium_vector-1724653697938-cc4868490f8f?q=80&w=1160&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', href: '#' },
                    { name: 'Delhi Public School', logo: 'https://plus.unsplash.com/premium_vector-1697729742720-9306a6f8f154?q=80&w=1160&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', href: '#' },
                    { name: 'St. Xavier\'s', logo: 'https://plus.unsplash.com/premium_vector-1711987811926-f3b7c9c43909?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', href: '#' },
                    { name: 'Cambridge Schools', logo: 'https://images.unsplash.com/photo-1642945857774-15b323312d00?q=80&w=832&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', href: '#' },
                ]}
                metrics={[
                    { value: '50+', label: 'Countries', description: 'Global presence' },
                    { value: '10M+', label: 'Records Managed', description: 'Monthly data processed' },
                    { value: '98%', label: 'Satisfaction', description: 'Customer happiness' },
                    { value: '24/7', label: 'Support', description: 'Always available' },
                ]}
            />

            <Features
                eyebrow="Features"
                title="Everything You Need to Run Your School"
                subtitle="A comprehensive suite of tools designed for modern education management."
                features={[
                    { icon: ClipboardCheck, title: 'Smart Attendance', description: 'Automated attendance tracking with biometric, QR code, and manual options. Real-time notifications to parents.' },
                    { icon: GraduationCap, title: 'Gradebook & Results', description: 'Comprehensive grade management with customizable grading scales, report cards, and progress tracking.' },
                    { icon: CreditCard, title: 'Fee Management', description: 'Streamlined fee collection with online payments, automated reminders, and detailed financial reports.' },
                    { icon: MessageSquare, title: 'Communication Hub', description: 'Instant messaging between teachers, parents, and administrators with announcements and notifications.' },
                    { icon: Calendar, title: 'Scheduling', description: 'Intelligent timetable creation, exam scheduling, and event calendar management for the entire school.' },
                    { icon: BarChart3, title: 'Analytics & Reports', description: 'Data-driven insights with customizable dashboards, performance analytics, and exportable reports.' },
                ]}
            />

            <HowItWorks
                eyebrow="How It Works"
                title="Get Started in Minutes"
                subtitle="Setting up EduPortal is quick and easy. Our team guides you through every step."
                steps={[
                    {
                        number: '01',
                        title: 'Sign Up & Configure',
                        description: 'Create your school account and configure settings to match your institution\'s structure and requirements.',
                        features: ['Custom school profile setup', 'Grade & section configuration', 'Academic year planning', 'Staff role assignment'],
                        image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1422&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                    },
                    {
                        number: '02',
                        title: 'Import Your Data',
                        description: 'Seamlessly migrate your existing data. We support imports from spreadsheets and other school management systems.',
                        features: ['Bulk student data import', 'Staff records migration', 'Historical grade transfer', 'Fee structure setup'],
                        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
                    },
                    {
                        number: '03',
                        title: 'Go Live & Grow',
                        description: 'Launch your platform with confidence. Our support team ensures a smooth transition for your entire school community.',
                        features: ['Staff training sessions', 'Parent onboarding support', '24/7 technical assistance', 'Regular feature updates'],
                        image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop',
                    },
                ]}
            />

            <Benefits
                eyebrow="Benefits"
                title="Built for Everyone at Your School"
                subtitle="Whether you're an administrator, teacher, parent, or student — EduPortal makes your life easier."
                roles={[
                    {
                        icon: Shield,
                        role: 'Administrators',
                        tagline: 'Complete school oversight',
                        benefits: ['Real-time dashboards', 'Automated compliance', 'Staff management', 'Financial overview'],
                        href: '/features',
                    },
                    {
                        icon: BookOpen,
                        role: 'Teachers',
                        tagline: 'Focus on teaching',
                        benefits: ['Quick attendance marking', 'Easy grade entry', 'Assignment management', 'Parent communication'],
                        href: '/features',
                    },
                    {
                        icon: HeartHandshake,
                        role: 'Parents',
                        tagline: 'Stay connected',
                        benefits: ['Real-time updates', 'Fee payment portal', 'Progress tracking', 'Direct messaging'],
                        href: '/features',
                    },
                    {
                        icon: GraduationCap,
                        role: 'Students',
                        tagline: 'Learn better',
                        benefits: ['Assignment access', 'Grade viewing', 'Schedule management', 'Resource library'],
                        href: '/features',
                    },
                ]}
            />

            <WhyChooseUs
                eyebrow="Why EduManager"
                title="Why Schools Choose EduManager"
                subtitle="We're not just another software — we're your partner in building a better school."
                reasons={[
                    { icon: Zap, title: 'Lightning Fast', description: 'Built on modern cloud infrastructure for blazing-fast performance, even with millions of records.' },
                    { icon: Shield, title: 'Bank-Grade Security', description: 'FERPA compliant with end-to-end encryption, SOC2 certified, and regular security audits.' },
                    { icon: Smartphone, title: 'Mobile First', description: 'Full-featured mobile apps for iOS and Android. Manage your school from anywhere.' },
                    { icon: Clock, title: 'Save 10+ Hours/Week', description: 'Automate repetitive tasks and free up valuable time for what matters most — education.' },
                    { icon: HeartHandshake, title: 'Dedicated Support', description: 'Assigned customer success manager with 24/7 support and 99.9% uptime guarantee.' },
                    { icon: Settings, title: 'Fully Customizable', description: 'Adapt every module to your school\'s unique needs with flexible configuration options.' },
                ]}
            />

            <Testimonials
                eyebrow="Testimonials"
                title="Loved by Schools Worldwide"
                subtitle="Hear from educators and administrators who transformed their schools with EduManager."
                featured={{
                    quote: 'EduPortal transformed how we run our school. Attendance tracking that used to take hours now happens in seconds. Parents are more engaged than ever.',
                    author: 'Dr. Sarah Mitchell',
                    role: 'Principal',
                    school: 'Springfield International Academy',
                    avatar: 'https://images.unsplash.com/photo-1722926323079-0836a07d2340?q=80&w=1160&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                    rating: 5,
                }}
                testimonials={[
                    { quote: 'The fee management module saved us countless hours of manual work. Parents love the online payment option.', author: 'James Rodriguez', role: 'Administrator', school: 'Oakridge School', avatar: 'https://images.unsplash.com/photo-1577975882846-431adc8c2009?q=80&w=1160&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', rating: 5 },
                    { quote: 'As a teacher, the gradebook feature is intuitive and makes report card generation a breeze.', author: 'Emily Chen', role: 'Teacher', school: 'Cambridge Academy', avatar: 'https://images.unsplash.com/photo-1718754323904-6866d4e9b5d1?q=80&w=1160&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', rating: 5 },
                    { quote: 'I can track my child\'s attendance and grades in real-time. The parent portal is fantastic.', author: 'Michael Brown', role: 'Parent', school: 'Delhi Public School', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop', rating: 4 },
                ]}
            />

            <PricingPreview
                eyebrow="Pricing"
                title="Simple, Transparent Pricing"
                subtitle="No hidden fees. Choose the plan that fits your school's needs."
                plans={[
                    {
                        name: 'Starter',
                        description: 'For small schools getting started',
                        price: '$3',
                        period: 'student/month',
                        features: ['Up to 500 students', 'Core modules', 'Email support', 'Basic analytics', 'Mobile app access'],
                        cta: { text: 'Start Free Trial', href: '/pricing' },
                    },
                    {
                        name: 'Professional',
                        description: 'For growing institutions',
                        price: '$5',
                        period: 'student/month',
                        popular: true,
                        features: ['Up to 2,000 students', 'All modules', 'Priority support', 'Advanced analytics', 'API access', 'Custom branding'],
                        cta: { text: 'Start Free Trial', href: '/pricing' },
                    },
                    {
                        name: 'Enterprise',
                        description: 'For large districts & networks',
                        price: 'Custom',
                        features: ['Unlimited students', 'All modules + custom', 'Dedicated support', 'SLA guarantee', 'On-premise option', 'Custom integrations'],
                        cta: { text: 'Contact Sales', href: '/contact' },
                    },
                ]}
            />

            <FAQPreview
                eyebrow="FAQ"
                title="Frequently Asked Questions"
                subtitle="Find quick answers to common questions about EduManager."
                faqs={[
                    { question: 'How long does it take to set up EduManager?', answer: 'Most schools are up and running within 1-2 weeks. Our onboarding team handles data migration, configuration, and staff training to ensure a smooth launch.' },
                    { question: 'Can I migrate data from my current system?', answer: 'Yes! We support data imports from all major school management systems including PowerSchool, Infinite Campus, and spreadsheets. Our team handles the entire migration process.' },
                    { question: 'Is EduPortal FERPA compliant?', answer: 'Absolutely. EduPortal is fully FERPA compliant with end-to-end encryption, SOC2 certification, and regular third-party security audits to protect student data.' },
                    { question: 'Do you offer a free trial?', answer: 'Yes, we offer a 30-day free trial with full access to all features. No credit card required. Our team will help you get set up and explore the platform.' },
                    { question: 'What kind of support do you provide?', answer: 'We provide 24/7 support via email, live chat, and phone. Professional and Enterprise plans include a dedicated customer success manager.' },
                ]}
                ctaText="View All FAQs"
                ctaHref="/faq"
            />

            <CTA
                title="Ready to Transform Your School?"
                description="Join 2,000+ schools that have modernized their operations with EduManager. Start your free trial today."
                primaryCta={{ text: 'Start Free Trial', href: '/demo' }}
                secondaryCta={{ text: 'Schedule a Demo', href: '/demo' }}
            />
        </>
    );
}