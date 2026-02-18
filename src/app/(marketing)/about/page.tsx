import { AboutHero, Mission, Values, Timeline, Team, Story, Stats, Partners, AboutCTA, Culture } from '@/features/(marketing)/about';
import { Heart, Target, Users, Lightbulb, Shield, Globe, Award, Rocket, Handshake, BookOpen } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About EduManager — Our Mission to Transform School Management',
    description: 'Learn about EduManager\'s mission to empower schools with modern management tools. Discover our story, values, team, and the vision driving 2,000+ schools worldwide.',
};

// TODO: Replace placeholder images with real team photos and office images
// TODO: Connect stats to real-time data from API
// TODO: Add dynamic team member loading from CMS
// TODO: Integrate partner logos from CDN

export default function Page() {
    return (
        <>
            <AboutHero
                badge="About EduManager"
                title={{
                    text: 'Empowering Schools to',
                    highlight: 'Shape the Future',
                }}
                description="We believe every school deserves world-class management tools. Since 2016, EduManager has been on a mission to simplify school operations so educators can focus on what matters most — teaching and inspiring the next generation."
                cta={{ text: 'Join Our Mission', href: '/contact' }}
            />

            <Mission
                eyebrow="Our Mission"
                title="Making Education Management Effortless"
                subtitle="We exist to remove the administrative burden from educators, enabling them to dedicate their energy to student success."
                content={[
                    'At EduManager, we believe that technology should serve education — not complicate it. Our mission is to build intuitive, powerful tools that streamline every aspect of school management, from attendance tracking and grade reporting to fee collection and parent communication.',
                    'We partner with schools of all sizes — from single-campus private institutions to multi-district public school networks — providing them with the same caliber of technology used by the world\'s leading organizations, tailored specifically for the unique challenges of K-12 education.',
                    'Every feature we build, every update we ship, and every support call we answer is driven by a single question: does this help educators spend more time with their students?',
                ]}
                image={{
                    src: 'https://cdn.dribbble.com/userupload/46750025/file/170b1a89bd3b9666a908d788958f5468.png?resize=2048x1536&vertical=center',
                    alt: 'EduManager team collaborating on education technology solutions',
                }}
            />

            <Values
                eyebrow="Our Values"
                title="The Principles That Guide Us"
                subtitle="These core values shape every decision we make, every product we build, and every relationship we nurture."
                values={[
                    {
                        icon: Heart,
                        title: 'Student-First Design',
                        description: 'Every feature we build starts with a simple question: how does this improve the student experience? We design for impact, ensuring our tools ultimately benefit learners.',
                    },
                    {
                        icon: Target,
                        title: 'Relentless Focus',
                        description: 'We stay laser-focused on solving real problems for schools. No feature bloat, no unnecessary complexity — just purposeful tools that deliver measurable results.',
                    },
                    {
                        icon: Users,
                        title: 'Community Driven',
                        description: 'Our roadmap is shaped by the educators who use EduManager every day. We listen, learn, and build together with our community of 2,000+ schools.',
                    },
                    {
                        icon: Shield,
                        title: 'Trust & Security',
                        description: 'Schools trust us with their most sensitive data. We honor that trust with FERPA compliance, SOC2 certification, end-to-end encryption, and transparent privacy practices.',
                    },
                    {
                        icon: Lightbulb,
                        title: 'Continuous Innovation',
                        description: 'Education evolves, and so do we. We invest heavily in R&D, leveraging AI and emerging technologies to keep our platform ahead of the curve.',
                    },
                    {
                        icon: Globe,
                        title: 'Inclusive Access',
                        description: 'Great education management shouldn\'t be limited by budget or geography. We offer flexible pricing and multi-language support to serve schools worldwide.',
                    },
                ]}
            />

            <Story
                eyebrow="Our Story"
                title="From a Classroom Problem to a Global Platform"
                subtitle="How a frustrated school administrator's spreadsheet nightmare became the solution for thousands of schools."
                paragraphs={[
                    'EduManager was born in 2016 when our founder, Arjun Mehta, was working as a school administrator in Mumbai. Every day, he watched talented teachers drown in paperwork — manually tracking attendance in registers, calculating grades on spreadsheets, and chasing parents for fee payments. He knew there had to be a better way.',
                    'Starting with a simple attendance tracking tool built for his own school, Arjun assembled a small team of engineers and educators who shared his vision. Within six months, neighboring schools were asking to use the system. The demand was clear: schools everywhere were struggling with the same problems.',
                    'By 2018, EduManager had expanded from attendance to a full-suite platform covering grades, fees, communication, and analytics. Today, we serve over 2,000 schools across 50+ countries, manage more than 10 million student records, and employ a diverse team of 200+ professionals who are passionate about education technology.',
                    'But we\'re just getting started. With the launch of AI-powered insights and predictive analytics, we\'re entering our next chapter — one where technology doesn\'t just manage schools, but actively helps them improve student outcomes.',
                ]}
                image={{
                    src: 'https://www.growthengineering.co.uk/wp-content/uploads/2024/10/Evo-of-Learning-Tech-ills_Hero.png',
                    alt: 'EduManager founding story — from a small classroom to a global education platform',
                }}
            />

            <Stats
                eyebrow="Our Impact"
                title="Numbers That Tell Our Story"
                subtitle="Real metrics from real schools — here's the impact EduManager is making in education worldwide."
                stats={[
                    { value: '2,000+', label: 'Schools', description: 'Active schools using EduManager daily' },
                    { value: '500K+', label: 'Students', description: 'Student records managed on our platform' },
                    { value: '50+', label: 'Countries', description: 'Global reach across six continents' },
                    { value: '10M+', label: 'Records', description: 'Attendance and grade entries processed monthly' },
                    { value: '99.9%', label: 'Uptime', description: 'Platform reliability with SLA guarantee' },
                    { value: '4.9/5', label: 'Rating', description: 'Average customer satisfaction score' },
                    { value: '200+', label: 'Team Members', description: 'Engineers, educators, and support specialists' },
                    { value: '15M+', label: 'Hours Saved', description: 'Administrative hours saved annually' },
                ]}
            />

            <Timeline
                eyebrow="Our Journey"
                title="Key Milestones Along the Way"
                subtitle="A decade of growth, innovation, and unwavering commitment to transforming school management."
                milestones={[
                    {
                        year: '2016',
                        title: 'The Spark',
                        description: 'EduManager founded in Mumbai by Arjun Mehta. Launched as a simple attendance tracking tool for a single school with 400 students.',
                    },
                    {
                        year: '2017',
                        title: 'First 50 Schools',
                        description: 'Expanded to 50 schools across three Indian states. Added gradebook and report card generation modules based on teacher feedback.',
                    },
                    {
                        year: '2018',
                        title: 'Full Platform Launch',
                        description: 'Released the complete school management suite with fee management, parent portal, and communication hub. Raised $2M seed funding.',
                    },
                    {
                        year: '2019',
                        title: 'Going Global',
                        description: 'Expanded to Southeast Asia, the Middle East, and Africa. Launched multi-language support covering 12 languages and regional compliance.',
                    },
                    {
                        year: '2020',
                        title: 'Pandemic Response',
                        description: 'Rapidly built remote learning integrations and virtual classroom tools. Offered free access to underserved schools, onboarding 500+ institutions in 3 months.',
                    },
                    {
                        year: '2021',
                        title: 'Series A & Mobile Apps',
                        description: 'Raised $15M Series A led by EdVentures Capital. Launched native iOS and Android apps for teachers, parents, and administrators.',
                    },
                    {
                        year: '2022',
                        title: '1,000 Schools Milestone',
                        description: 'Crossed the 1,000-school mark. Introduced advanced analytics dashboard and custom reporting engine for district-level administrators.',
                    },
                    {
                        year: '2023',
                        title: 'Enterprise & API Platform',
                        description: 'Launched EduManager Enterprise for large school districts with multi-campus management. Released public API for third-party integrations.',
                    },
                    {
                        year: '2024',
                        title: 'AI-Powered Insights',
                        description: 'Introduced AI-driven report cards, predictive attendance alerts, and automated fee reminders. Reached 2,000+ schools across 50+ countries.',
                    },
                    {
                        year: '2025',
                        title: 'The Next Chapter',
                        description: 'Launched EduManager 3.0 with predictive student performance analytics, smart scheduling, and an open plugin marketplace for third-party developers.',
                    },
                ]}
            />

            <Team
                eyebrow="Our Team"
                title="The People Behind EduManager"
                subtitle="A passionate team of educators, engineers, and designers united by a shared mission to transform school management."
                members={[
                    {
                        name: 'Arjun Mehta',
                        role: 'Founder & CEO',
                        avatar: '/placeholder.svg',
                        bio: 'Former school administrator turned EdTech entrepreneur. 12+ years in education management. Passionate about removing administrative burden from teachers.',
                        socials: [
                            { platform: 'linkedin', href: '#' },
                            { platform: 'twitter', href: '#' },
                        ],
                    },
                    {
                        name: 'Dr. Priya Sharma',
                        role: 'Chief Education Officer',
                        avatar: '/placeholder.svg',
                        bio: 'Ph.D. in Education Technology from Stanford. Former principal with 20 years of K-12 experience. Ensures every feature aligns with real classroom needs.',
                        socials: [
                            { platform: 'linkedin', href: '#' },
                        ],
                    },
                    {
                        name: 'David Kim',
                        role: 'Chief Technology Officer',
                        avatar: '/placeholder.svg',
                        bio: 'Previously engineering lead at Google Cloud Education. Expert in scalable SaaS architecture and data security. Leads our 80-person engineering team.',
                        socials: [
                            { platform: 'linkedin', href: '#' },
                            { platform: 'github', href: '#' },
                        ],
                    },
                    {
                        name: 'Sarah Mitchell',
                        role: 'VP of Product',
                        avatar: '/placeholder.svg',
                        bio: 'Former product director at Clever. Specializes in user-centered design for education platforms. Bridges the gap between educator needs and technology.',
                        socials: [
                            { platform: 'linkedin', href: '#' },
                            { platform: 'twitter', href: '#' },
                        ],
                    },
                    {
                        name: 'Carlos Rivera',
                        role: 'VP of Customer Success',
                        avatar: '/placeholder.svg',
                        bio: '15 years in EdTech customer operations. Built our 24/7 support team from the ground up. Maintains our industry-leading 98% customer satisfaction rate.',
                        socials: [
                            { platform: 'linkedin', href: '#' },
                        ],
                    },
                    {
                        name: 'Aisha Okonkwo',
                        role: 'Head of Design',
                        avatar: '/placeholder.svg',
                        bio: 'Award-winning UX designer with a focus on accessibility in education. Previously designed learning tools at Khan Academy. Champions inclusive design.',
                        socials: [
                            { platform: 'linkedin', href: '#' },
                            { platform: 'dribbble', href: '#' },
                        ],
                    },
                    {
                        name: 'James Chen',
                        role: 'Head of Engineering',
                        avatar: '/placeholder.svg',
                        bio: 'Full-stack architect specializing in real-time systems. Led the development of our mobile apps and offline-sync capabilities for schools with limited connectivity.',
                        socials: [
                            { platform: 'linkedin', href: '#' },
                            { platform: 'github', href: '#' },
                        ],
                    },
                    {
                        name: 'Fatima Al-Hassan',
                        role: 'Head of Partnerships',
                        avatar: '/placeholder.svg',
                        bio: 'Former education policy advisor at UNESCO. Manages strategic partnerships with school districts, government agencies, and EdTech organizations across 50+ countries.',
                        socials: [
                            { platform: 'linkedin', href: '#' },
                        ],
                    },
                ]}
            />

            <Culture
                eyebrow="Our Culture"
                title="What It's Like to Work at EduManager"
                subtitle="We're building more than software — we're building a team and culture that reflects the values we bring to education."
                pillars={[
                    {
                        icon: Rocket,
                        title: 'Move with Purpose',
                        description: 'We ship fast, but never recklessly. Every sprint is guided by educator feedback and measurable impact on student outcomes.',
                    },
                    {
                        icon: BookOpen,
                        title: 'Never Stop Learning',
                        description: 'Learning stipends, conference attendance, and dedicated innovation days ensure our team stays at the cutting edge of EdTech.',
                    },
                    {
                        icon: Handshake,
                        title: 'Radical Collaboration',
                        description: 'Engineers sit with educators. Designers visit classrooms. We break silos because the best solutions come from diverse perspectives.',
                    },
                    {
                        icon: Award,
                        title: 'Celebrate Impact',
                        description: 'We measure success not just in revenue, but in teachers empowered, hours saved, and students whose education improved because of our work.',
                    },
                ]}
            />

            <Partners
                eyebrow="Our Partners"
                title="Trusted by Industry Leaders"
                subtitle="We collaborate with leading organizations in education, technology, and policy to deliver the best possible experience for schools."
                partners={[
                    { name: 'Google for Education', logo: '/google.png', href: '#' },
                    { name: 'Microsoft Education', logo: '/microsoft.png', href: '#' },
                    { name: 'AWS EdStart', logo: '/Amazon_Web_Services-Logo.wine.png', href: '#' },
                    { name: 'UNESCO', logo: '/unesco.png', href: '#' },
                    { name: 'Khan Academy', logo: '/Khan academy.png', href: '#' },
                    { name: 'Clever', logo: '/Clever.svg', href: '#' },
                    { name: 'ClassLink', logo: '/classlink.png', href: '#' },
                    { name: 'Schoology', logo: '/Schoology-Logo-SVG_003.svg', href: '#' },
                ]}
            />

            <AboutCTA
                title="Ready to Join the EduManager Family?"
                description="Whether you're a school looking for better management tools or a passionate individual who wants to make a difference in education — we'd love to hear from you."
                primaryCta={{ text: 'Start Free Trial', href: '/demo' }}
                secondaryCta={{ text: 'View Open Positions', href: '/contact' }}
            />
        </>
    );
}
