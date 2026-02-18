import { type Metadata } from 'next';

import { BookOpen, GraduationCap, BarChart3, Users, Calendar, Shield, Lightbulb, FileText, Video, Headphones, type LucideIcon, } from 'lucide-react';
import { BlogHero, FeaturedPost, PostGrid, Categories, Newsletter, Trending, Authors, Topics, Resources, BlogCTA, } from '@/features/(marketing)/blog';
import ROUTES from '@/lib/routes';

// TODO: Replace static metadata with dynamic OG image generation
// TODO: Add JSON-LD structured data for blog listing (CollectionPage schema)
export const metadata: Metadata = {
    title: 'Blog | EduSync — School Management Insights & EdTech Resources',
    description:
        'Explore expert articles on school administration, digital classrooms, student engagement, fee management, attendance automation, and the latest EdTech trends for K-12 institutions.',
    keywords: [
        'school management blog',
        'edtech articles',
        'K-12 education technology',
        'student information system tips',
        'school administration best practices',
        'digital classroom resources',
        'attendance automation insights',
        'fee management guides',
    ],
    openGraph: {
        title: 'Blog | EduSync — School Management Insights & EdTech Resources',
        description:
            'Explore expert articles on school administration, digital classrooms, student engagement, fee management, attendance automation, and the latest EdTech trends for K-12 institutions.',
        url: '/blog',
        type: 'website',
        images: [{ url: '/placeholder.svg', width: 1200, height: 630, alt: 'EduSync Blog' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Blog | EduSync — School Management Insights & EdTech Resources',
        description:
            'Explore expert articles on school administration, digital classrooms, student engagement, and the latest EdTech trends.',
        images: ['/placeholder.svg'],
    },
    alternates: {
        canonical: '/blog',
    },
};

// TODO: Fetch blog posts from CMS/database via server actions
// TODO: Implement search functionality with query params
// TODO: Add pagination support
export default function Page() {
    return (
        <>
            {/* TODO: Wire up search bar to filter posts via query params */}
            <BlogHero
                eyebrow="EDUSYNC BLOG"
                title="Insights for Modern School Management"
                description="Actionable guides, case studies, and thought leadership to help administrators, teachers, and parents navigate the evolving landscape of K-12 education technology."
                searchPlaceholder="Search articles, guides, and resources..."
                popularSearches={[
                    'Attendance Automation',
                    'Fee Collection',
                    'Parent Communication',
                    'Report Cards',
                    'Digital Classroom',
                    'Student Safety',
                ]}
            />

            {/* TODO: Rotate featured post dynamically based on publish date or editorial picks */}
            <FeaturedPost
                eyebrow="EDITOR'S PICK"
                post={{
                    title: 'How AI-Powered Attendance Systems Are Reducing Truancy by 40% in K-12 Schools',
                    excerpt:
                        'Discover how schools across the country are leveraging facial recognition and RFID-based attendance tracking to identify at-risk students early, automate parent notifications, and dramatically improve daily attendance rates — all while saving administrators hours of manual work each week.',
                    image: 'https://decibel360cloud.com/ae/wp-content/uploads/2025/02/ezgif.com-gif-maker-6.webp',
                    href: `${ROUTES.marketing.blog}/ai-attendance-reducing-truancy`,
                    category: 'Attendance & Safety',
                    date: 'Feb 10, 2026',
                    readTime: '8 min read',
                    author: {
                        name: 'Dr. Priya Sharma',
                        avatar: '/placeholder.svg',
                    },
                }}
            />

            {/* TODO: Replace static categories with dynamic counts from database */}
            <Categories
                eyebrow="BROWSE BY TOPIC"
                title="Explore Our Categories"
                subtitle="Find articles tailored to your role and interests — from administration and finance to classroom innovation and parent engagement."
                activeCategory="All"
                categories={[
                    { icon: BookOpen as LucideIcon, label: 'All', count: 128 },
                    { icon: GraduationCap as LucideIcon, label: 'Classroom Tech', count: 34 },
                    { icon: BarChart3 as LucideIcon, label: 'Analytics & Reports', count: 22 },
                    { icon: Users as LucideIcon, label: 'Parent Engagement', count: 19 },
                    { icon: Calendar as LucideIcon, label: 'Attendance', count: 17 },
                    { icon: Shield as LucideIcon, label: 'Security & Privacy', count: 15 },
                    { icon: Lightbulb as LucideIcon, label: 'Best Practices', count: 21 },
                ]}
            />

            {/* TODO: Paginate or lazy-load posts; fetch from API */}
            <PostGrid
                eyebrow="LATEST ARTICLES"
                title="Fresh Off the Press"
                subtitle="Stay up to date with the newest insights on school management, EdTech innovations, and education policy updates."
                showMoreHref={`${ROUTES.marketing.blog}?page=2`}
                posts={[
                    {
                        title: '5 Strategies to Streamline Fee Collection and Reduce Defaults by 60%',
                        excerpt:
                            'Learn how top-performing schools are using automated invoicing, digital payment gateways, and smart reminders to eliminate fee collection headaches.',
                        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMjbDetvzmQoHDLKS0qZuFbOO4hphBLa1y5Q&s',
                        href: `${ROUTES.marketing.blog}/streamline-fee-collection`,
                        category: 'Fee Management',
                        date: 'Feb 8, 2026',
                        readTime: '6 min read',
                        author: { name: 'Arjun Mehta', avatar: '/placeholder.svg' },
                    },
                    {
                        title: 'Building a Data-Driven Culture: How Principals Use Dashboards to Boost Student Outcomes',
                        excerpt:
                            'Real-world examples of school leaders who turned raw data into actionable insights — improving exam results, attendance, and teacher performance.',
                        image: 'https://appinventiv.com/wp-content/uploads/2022/06/benefits-to-having-a-data-driven-culture-scaled.webp',
                        href: `${ROUTES.marketing.blog}/data-driven-school-culture`,
                        category: 'Analytics & Reports',
                        date: 'Feb 5, 2026',
                        readTime: '7 min read',
                        author: { name: 'Neha Gupta', avatar: '/placeholder.svg' },
                    },
                    {
                        title: 'The Complete Guide to Digital Report Cards: From Setup to Parent Delivery',
                        excerpt:
                            'Step-by-step walkthrough for transitioning from paper-based report cards to a fully digital grading and distribution system.',
                        image: 'https://coronadotimes.com/wp-content/uploads/2024/04/A-report-card-Excellence-green.jpg',
                        href: `${ROUTES.marketing.blog}/digital-report-cards-guide`,
                        category: 'Classroom Tech',
                        date: 'Feb 2, 2026',
                        readTime: '10 min read',
                        author: { name: 'Ravi Krishnan', avatar: '/placeholder.svg' },
                    },
                    {
                        title: 'Why 500+ Schools Switched to Automated Timetable Generation This Year',
                        excerpt:
                            'Manual timetabling costs schools an average of 120 hours per term. Here\'s how intelligent scheduling algorithms are giving that time back.',
                        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSimBhMmZWyoCS8J6lh2x0rqZP73RmnPLiPpQ&s',
                        href: `${ROUTES.marketing.blog}/automated-timetable-generation`,
                        category: 'Best Practices',
                        date: 'Jan 29, 2026',
                        readTime: '5 min read',
                        author: { name: 'Sana Patel', avatar: '/placeholder.svg' },
                    },
                    {
                        title: 'FERPA, COPPA & Beyond: A School Admin\'s Guide to Student Data Privacy in 2026',
                        excerpt:
                            'Navigate the complex regulatory landscape of student data protection with this practical compliance checklist and vendor evaluation framework.',
                        image: 'https://framerusercontent.com/images/6IN8y0vjF6g1QOqCmlATuRxHQ.jpg?width=4096&height=2304',
                        href: `${ROUTES.marketing.blog}/student-data-privacy-guide`,
                        category: 'Security & Privacy',
                        date: 'Jan 25, 2026',
                        readTime: '9 min read',
                        author: { name: 'Dr. Priya Sharma', avatar: '/placeholder.svg' },
                    },
                    {
                        title: 'How to Launch a Successful Parent Communication Portal in Under 2 Weeks',
                        excerpt:
                            'A practical implementation roadmap for schools looking to centralize parent-teacher communication, from announcement boards to real-time chat.',
                        image: 'https://www.billabonghighschool.com/blogs/wp-content/uploads/2024/02/blog-14-7-Reasons-Why-Parent-Teacher-Meetings-Are-Important.jpg',
                        href: `${ROUTES.marketing.blog}/parent-communication-portal`,
                        category: 'Parent Engagement',
                        date: 'Jan 21, 2026',
                        readTime: '6 min read',
                        author: { name: 'Meera Iyer', avatar: '/placeholder.svg' },
                    },
                ]}
            />

            {/* TODO: Compute trending posts from view/share analytics */}
            <Trending
                eyebrow="TRENDING NOW"
                title="Most Read This Week"
                subtitle="See what school administrators, teachers, and parents are reading right now."
                posts={[
                    {
                        title: 'How AI-Powered Attendance Systems Are Reducing Truancy by 40%',
                        href: `${ROUTES.marketing.blog}/ai-attendance-reducing-truancy`,
                        category: 'Attendance & Safety',
                        date: 'Feb 10, 2026',
                        readTime: '8 min read',
                        author: { name: 'Dr. Priya Sharma', avatar: '/placeholder.svg' },
                    },
                    {
                        title: '5 Strategies to Streamline Fee Collection and Reduce Defaults by 60%',
                        href: `${ROUTES.marketing.blog}/streamline-fee-collection`,
                        category: 'Fee Management',
                        date: 'Feb 8, 2026',
                        readTime: '6 min read',
                        author: { name: 'Arjun Mehta', avatar: '/placeholder.svg' },
                    },
                    {
                        title: 'The Complete Guide to Digital Report Cards',
                        href: `${ROUTES.marketing.blog}/digital-report-cards-guide`,
                        category: 'Classroom Tech',
                        date: 'Feb 2, 2026',
                        readTime: '10 min read',
                        author: { name: 'Ravi Krishnan', avatar: '/placeholder.svg' },
                    },
                    {
                        title: 'Building a Data-Driven Culture in Your School',
                        href: `${ROUTES.marketing.blog}/data-driven-school-culture`,
                        category: 'Analytics & Reports',
                        date: 'Feb 5, 2026',
                        readTime: '7 min read',
                        author: { name: 'Neha Gupta', avatar: '/placeholder.svg' },
                    },
                    {
                        title: 'Student Data Privacy: The 2026 Compliance Checklist',
                        href: `${ROUTES.marketing.blog}/student-data-privacy-guide`,
                        category: 'Security & Privacy',
                        date: 'Jan 25, 2026',
                        readTime: '9 min read',
                        author: { name: 'Dr. Priya Sharma', avatar: '/placeholder.svg' },
                    },
                ]}
            />

            {/* TODO: Fetch author profiles and article counts from user service */}
            <Authors
                eyebrow="MEET THE WRITERS"
                title="Our Expert Contributors"
                subtitle="Educators, administrators, and EdTech specialists sharing decades of combined experience in school management and technology."
                authors={[
                    {
                        name: 'Dr. Priya Sharma',
                        avatar: '/placeholder.svg',
                        role: 'Chief Education Officer',
                        expertise: ['Data Privacy', 'Attendance', 'Policy'],
                        postCount: 24,
                        href: `${ROUTES.marketing.blog}/authors/priya-sharma`,
                    },
                    {
                        name: 'Arjun Mehta',
                        avatar: '/placeholder.svg',
                        role: 'Finance & Operations Lead',
                        expertise: ['Fee Management', 'Budgeting', 'Automation'],
                        postCount: 18,
                        href: `${ROUTES.marketing.blog}/authors/arjun-mehta`,
                    },
                    {
                        name: 'Neha Gupta',
                        avatar: '/placeholder.svg',
                        role: 'Analytics Consultant',
                        expertise: ['Dashboards', 'Reporting', 'Student Outcomes'],
                        postCount: 15,
                        href: `${ROUTES.marketing.blog}/authors/neha-gupta`,
                    },
                    {
                        name: 'Ravi Krishnan',
                        avatar: '/placeholder.svg',
                        role: 'Classroom Tech Specialist',
                        expertise: ['Digital Grading', 'LMS', 'Integrations'],
                        postCount: 21,
                        href: `${ROUTES.marketing.blog}/authors/ravi-krishnan`,
                    },
                    {
                        name: 'Sana Patel',
                        avatar: '/placeholder.svg',
                        role: 'Operations Manager',
                        expertise: ['Timetabling', 'Staff Management', 'Workflows'],
                        postCount: 12,
                        href: `${ROUTES.marketing.blog}/authors/sana-patel`,
                    },
                    {
                        name: 'Meera Iyer',
                        avatar: '/placeholder.svg',
                        role: 'Parent Engagement Lead',
                        expertise: ['Communication', 'Community', 'Onboarding'],
                        postCount: 16,
                        href: `${ROUTES.marketing.blog}/authors/meera-iyer`,
                    },
                    {
                        name: 'Kabir Ansari',
                        avatar: '/placeholder.svg',
                        role: 'Security & Compliance Advisor',
                        expertise: ['FERPA', 'COPPA', 'Infrastructure'],
                        postCount: 10,
                        href: `${ROUTES.marketing.blog}/authors/kabir-ansari`,
                    },
                    {
                        name: 'Anjali Deshmukh',
                        avatar: '/placeholder.svg',
                        role: 'Curriculum Designer',
                        expertise: ['Assessment', 'Pedagogy', 'EdTech'],
                        postCount: 14,
                        href: `${ROUTES.marketing.blog}/authors/anjali-deshmukh`,
                    },
                ]}
            />

            {/* TODO: Generate topic cloud dynamically from post tags */}
            <Topics
                eyebrow="EXPLORE TOPICS"
                title="Browse by Topic"
                subtitle="Dive into specific areas of school management and education technology that matter most to you."
                topics={[
                    { label: 'Attendance Automation', count: 17, href: `${ROUTES.marketing.blog}/topics/attendance-automation`, size: 'lg' },
                    { label: 'Fee Collection', count: 14, href: `${ROUTES.marketing.blog}/topics/fee-collection`, size: 'lg' },
                    { label: 'Report Cards', count: 12, href: `${ROUTES.marketing.blog}/topics/report-cards`, size: 'md' },
                    { label: 'Parent Portal', count: 11, href: `${ROUTES.marketing.blog}/topics/parent-portal`, size: 'md' },
                    { label: 'Timetable Management', count: 9, href: `${ROUTES.marketing.blog}/topics/timetable-management`, size: 'md' },
                    { label: 'Student Safety', count: 8, href: `${ROUTES.marketing.blog}/topics/student-safety`, size: 'md' },
                    { label: 'Exam Management', count: 10, href: `${ROUTES.marketing.blog}/topics/exam-management`, size: 'md' },
                    { label: 'Staff Onboarding', count: 6, href: `${ROUTES.marketing.blog}/topics/staff-onboarding`, size: 'sm' },
                    { label: 'Data Analytics', count: 13, href: `${ROUTES.marketing.blog}/topics/data-analytics`, size: 'lg' },
                    { label: 'FERPA Compliance', count: 5, href: `${ROUTES.marketing.blog}/topics/ferpa-compliance`, size: 'sm' },
                    { label: 'Digital Classrooms', count: 15, href: `${ROUTES.marketing.blog}/topics/digital-classrooms`, size: 'lg' },
                    { label: 'SMS & Notifications', count: 7, href: `${ROUTES.marketing.blog}/topics/sms-notifications`, size: 'sm' },
                    { label: 'School ERP', count: 11, href: `${ROUTES.marketing.blog}/topics/school-erp`, size: 'md' },
                    { label: 'Admissions', count: 8, href: `${ROUTES.marketing.blog}/topics/admissions`, size: 'md' },
                    { label: 'Transport Management', count: 4, href: `${ROUTES.marketing.blog}/topics/transport-management`, size: 'sm' },
                    { label: 'Library Management', count: 5, href: `${ROUTES.marketing.blog}/topics/library-management`, size: 'sm' },
                    { label: 'Teacher Training', count: 7, href: `${ROUTES.marketing.blog}/topics/teacher-training`, size: 'sm' },
                    { label: 'Budget Planning', count: 6, href: `${ROUTES.marketing.blog}/topics/budget-planning`, size: 'sm' },
                ]}
            />

            {/* TODO: Add downloadable resource tracking and analytics */}
            <Resources
                eyebrow="FREE RESOURCES"
                title="Downloadable Guides & Toolkits"
                subtitle="Practical templates, checklists, and whitepapers to help you implement best practices in your school today."
                resources={[
                    {
                        icon: FileText as LucideIcon,
                        title: 'School Digital Transformation Playbook',
                        description:
                            'A 40-page guide covering every step of digitizing your school operations — from choosing the right SIS to training staff and measuring ROI.',
                        type: 'eBook',
                        href: `${ROUTES.marketing.resources}#digital-transformation`,
                        downloadable: true,
                    },
                    {
                        icon: Shield as LucideIcon,
                        title: 'Student Data Privacy Compliance Checklist',
                        description:
                            'A ready-to-use checklist for FERPA, COPPA, and GDPR compliance with vendor evaluation criteria and incident response templates.',
                        type: 'Checklist',
                        href: `${ROUTES.marketing.resources}#privacy-checklist`,
                        downloadable: true,
                    },
                    {
                        icon: Video as LucideIcon,
                        title: 'Webinar: Automating Attendance in 2026',
                        description:
                            'Watch our recorded session with 3 school principals who share their journey from manual registers to fully automated attendance systems.',
                        type: 'Webinar',
                        href: `${ROUTES.marketing.resources}#attendance-webinar`,
                        downloadable: false,
                    },
                    {
                        icon: BarChart3 as LucideIcon,
                        title: 'Annual EdTech Adoption Report 2026',
                        description:
                            'Data from 2,000+ schools on technology adoption trends, budget allocation, and the impact of digital tools on student performance.',
                        type: 'Report',
                        href: `${ROUTES.marketing.resources}#edtech-report`,
                        downloadable: true,
                    },
                    {
                        icon: Headphones as LucideIcon,
                        title: 'Podcast: Voices from the Staffroom',
                        description:
                            'Weekly episodes featuring teachers, principals, and EdTech founders discussing real challenges and creative solutions in modern education.',
                        type: 'Podcast',
                        href: `${ROUTES.marketing.resources}#podcast`,
                        downloadable: false,
                    },
                    {
                        icon: FileText as LucideIcon,
                        title: 'Fee Structure Templates for K-12 Schools',
                        description:
                            'Customizable Excel and PDF templates for setting up fee categories, installment plans, sibling discounts, and scholarship adjustments.',
                        type: 'Template',
                        href: `${ROUTES.marketing.resources}#fee-templates`,
                        downloadable: true,
                    },
                ]}
            />

            {/* TODO: Integrate newsletter signup with email service provider (Resend/Mailchimp) */}
            <Newsletter
                title="Never Miss an Insight"
                description="Join 12,000+ school administrators, teachers, and education leaders who receive our weekly digest of the best school management strategies, EdTech news, and practical tips."
                inputPlaceholder="Enter your school email address"
                buttonText="Subscribe to Newsletter"
                benefits={[
                    'Weekly curated articles on school management & EdTech',
                    'Exclusive downloadable templates and checklists',
                    'Early access to webinars and product updates',
                    'Case studies from top-performing schools',
                ]}
                disclaimer="We respect your privacy. Unsubscribe at any time. No spam, ever — just actionable insights for educators."
            />

            {/* TODO: Track CTA click conversions for blog page */}
            <BlogCTA
                title="Ready to Transform Your School?"
                description="See how EduSync helps 2,000+ schools automate attendance, streamline fee collection, and empower teachers with real-time analytics — all from one unified platform."
                perks={[
                    'Free 30-day trial',
                    'No credit card required',
                    'Dedicated onboarding support',
                    'Migrate data in under 48 hours',
                ]}
                primaryCta={{ text: 'Start Free Trial', href: ROUTES.auth.signup }}
                secondaryCta={{ text: 'Book a Live Demo', href: ROUTES.marketing.demo }}
            />
        </>
    );
}
