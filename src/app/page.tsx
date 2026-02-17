import { Hero, Features, HowItWorks, Testimonials, PricingPreview, TrustedBy, Benefits, FAQPreview, CTA, WhyChooseUs } from '@/features/(marketing)/home';
import { Users, GraduationCap, ClipboardCheck, BarChart3, CreditCard, Bell, Calendar, Shield, BookOpen, FileText, MessageSquare, Settings, Smartphone, Zap, Clock, HeartHandshake } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'EduManager — Modern School Management System',
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
                    { name: 'Springfield Academy', logo: '/placeholder.svg', href: '#' },
                    { name: 'Oakridge International', logo: '/placeholder.svg', href: '#' },
                    { name: 'Delhi Public School', logo: '/placeholder.svg', href: '#' },
                    { name: 'St. Xavier\'s', logo: '/placeholder.svg', href: '#' },
                    { name: 'Cambridge Schools', logo: '/placeholder.svg', href: '#' },
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
                subtitle="Setting up EduManager is quick and easy. Our team guides you through every step."
                steps={[
                    {
                        number: '01',
                        title: 'Sign Up & Configure',
                        description: 'Create your school account and configure settings to match your institution\'s structure and requirements.',
                        features: ['Custom school profile setup', 'Grade & section configuration', 'Academic year planning', 'Staff role assignment'],
                        image: '/placeholder.svg',
                    },
                    {
                        number: '02',
                        title: 'Import Your Data',
                        description: 'Seamlessly migrate your existing data. We support imports from spreadsheets and other school management systems.',
                        features: ['Bulk student data import', 'Staff records migration', 'Historical grade transfer', 'Fee structure setup'],
                        image: '/placeholder.svg',
                    },
                    {
                        number: '03',
                        title: 'Go Live & Grow',
                        description: 'Launch your platform with confidence. Our support team ensures a smooth transition for your entire school community.',
                        features: ['Staff training sessions', 'Parent onboarding support', '24/7 technical assistance', 'Regular feature updates'],
                        image: '/placeholder.svg',
                    },
                ]}
            />

            <Benefits
                eyebrow="Benefits"
                title="Built for Everyone at Your School"
                subtitle="Whether you're an administrator, teacher, parent, or student — EduManager makes your life easier."
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
                    quote: 'EduManager transformed how we run our school. Attendance tracking that used to take hours now happens in seconds. Parents are more engaged than ever.',
                    author: 'Dr. Sarah Mitchell',
                    role: 'Principal',
                    school: 'Springfield International Academy',
                    avatar: '/placeholder.svg',
                    rating: 5,
                }}
                testimonials={[
                    { quote: 'The fee management module saved us countless hours of manual work. Parents love the online payment option.', author: 'James Rodriguez', role: 'Administrator', school: 'Oakridge School', avatar: '/placeholder.svg', rating: 5 },
                    { quote: 'As a teacher, the gradebook feature is intuitive and makes report card generation a breeze.', author: 'Emily Chen', role: 'Teacher', school: 'Cambridge Academy', avatar: '/placeholder.svg', rating: 5 },
                    { quote: 'I can track my child\'s attendance and grades in real-time. The parent portal is fantastic.', author: 'Michael Brown', role: 'Parent', school: 'Delhi Public School', avatar: '/placeholder.svg', rating: 4 },
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
                    { question: 'Is EduManager FERPA compliant?', answer: 'Absolutely. EduManager is fully FERPA compliant with end-to-end encryption, SOC2 certification, and regular third-party security audits to protect student data.' },
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