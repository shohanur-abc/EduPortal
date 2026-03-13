import { type Metadata } from 'next';
import { School, Users, TrendingUp, Award, GraduationCap, BookOpen, Building2, Globe, Landmark, Church, ClipboardCheck, Clock, DollarSign, FileText, MessageSquare, Settings, Zap, } from 'lucide-react';
import { CaseStudiesHero, FeaturedCase, CaseGrid, Metrics, Testimonial, Industries, Process, Results, DownloadCaseStudy, CaseStudiesCTA, } from '@/features/(marketing)/case-studies';
import { ROUTES } from '@/lib/routes';

// TODO: Replace static metadata with dynamic OG image generation
// TODO: Add structured data (JSON-LD) for case study rich snippets
// TODO: Integrate analytics tracking for case study page views
export const metadata: Metadata = {
	title: 'Case Studies | EduPortal – School Management System',
	description:
		'Discover how schools worldwide transform their operations with EduPortal . Read real success stories showcasing improved attendance tracking, streamlined fee management, and enhanced academic performance.',
	keywords: [
		'school management case studies',
		'edtech success stories',
		'school ERP implementation',
		'attendance management results',
		'fee collection automation',
		'academic performance tracking',
		'school digital transformation',
		'education technology ROI',
	],
	openGraph: {
		title: 'Case Studies | EduPortal – School Management System',
		description:
			'See how 2,400+ schools achieved measurable results with EduPortal . Real stories, real impact.',
		url: '/case-studies',
		type: 'website',
		images: [
			{
				url: '/placeholder.svg',
				width: 1200,
				height: 630,
				alt: 'EduPortal Case Studies – Real School Success Stories',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Case Studies | EduPortal – School Management System',
		description:
			'See how 2,400+ schools achieved measurable results with EduPortal . Real stories, real impact.',
		images: ['/placeholder.svg'],
	},
};

// TODO: Fetch case study data from CMS or database
// TODO: Add pagination / infinite scroll for case grid
// TODO: Add filter controls (by industry, region, school size)
export default function CaseStudiesPage() {
	return (
		<>
			{/* TODO: Add breadcrumb navigation component */}
			<CaseStudiesHero
				eyebrow="SUCCESS STORIES"
				title="Schools Thriving with EduPortal "
				description="From K-12 institutions to university prep academies, discover how schools of every size use EduPortal to automate administration, boost parent engagement, and drive academic excellence."
				stats={[
					{
						icon: School,
						value: '2,400+',
						label: 'Schools Onboarded',
					},
					{
						icon: Users,
						value: '1.8M',
						label: 'Students Managed',
					},
					{
						icon: TrendingUp,
						value: '94%',
						label: 'Retention Rate',
					},
					{
						icon: Award,
						value: '35%',
						label: 'Avg. Efficiency Gain',
					},
				]}
			/>

			<FeaturedCase
				eyebrow="FEATURED CASE STUDY"
				title="Greenfield International Academy"
				subtitle="How a 3,200-student international school eliminated paper-based processes and saved 120+ admin hours per month."
				caseStudy={{
					image: 'https://i.ibb.co.com/4ZXyfVy9/image.png',
					schoolName: 'Greenfield International Academy',
					category: 'International School',
					challenge:
						"Greenfield International Academy managed attendance, report cards, and fee invoices across 3,200 students using spreadsheets and paper forms. Teachers spent an average of 45 minutes per day on manual data entry, and parents had no visibility into their child's daily progress.",
					solution:
						'EduPortal automated attendance via biometric integration, digitized report cards with real-time grade syncing, and launched a parent portal with instant fee payment and push notifications for academic updates.',
					results: [
						{ value: '87%', label: 'Less Admin Time' },
						{ value: '99.2%', label: 'Fee Collection Rate' },
						{ value: '3x', label: 'Parent Engagement' },
						{ value: '120hrs', label: 'Saved Monthly' },
					],
					href: `${ROUTES.marketing.caseStudies}/greenfield-international-academy`,
				}}
			/>

			{/* TODO: Add animated count-up for metric values */}
			<Metrics
				eyebrow="BY THE NUMBERS"
				title="Measurable Impact Across Every School"
				subtitle="Aggregate outcomes reported by EduPortal partner schools in their first 12 months of implementation."
				metrics={[
					{
						icon: Clock,
						value: '35%',
						label: 'Time Saved',
						description:
							'Average reduction in administrative workload reported by school office staff and teachers.',
					},
					{
						icon: DollarSign,
						value: '98.4%',
						label: 'Fee Collection',
						description:
							'On-time fee collection rate with automated reminders, online payments, and instalment tracking.',
					},
					{
						icon: Users,
						value: '4.2x',
						label: 'Parent Engagement',
						description:
							'Increase in parent-teacher interactions through the real-time portal, messaging, and notifications.',
					},
					{
						icon: TrendingUp,
						value: '22%',
						label: 'Grade Improvement',
						description:
							'Average improvement in student performance metrics after schools adopted data-driven insights.',
					},
				]}
			/>

			{/* TODO: Implement lazy loading for case grid images */}
			{/* TODO: Add skeleton loading state for case cards */}
			<CaseGrid
				eyebrow="MORE SUCCESS STORIES"
				title="Real Schools, Real Results"
				subtitle="Explore how diverse institutions — from rural primary schools to urban CBSE boards — achieved operational excellence with EduPortal ."
				cases={[
					{
						image: 'https://i.ibb.co.com/RkNBWCRZ/image.png',
						logo: 'https://i.ibb.co.com/zT2qG0F6/image.png',
						schoolName: "St. Xavier's High School",
						title:
							'Digitizing Attendance for 1,800 Students Across 3 Campuses',
						metrics: [
							{ value: '96%', label: 'Attendance Accuracy' },
							{ value: '40%', label: 'Less Paperwork' },
						],
						category: 'CBSE School',
						href: `${ROUTES.marketing.caseStudies}/st-xaviers-high-school`,
					},
					{
						image: 'https://i.ibb.co.com/1JXJ9ZD2/image.png',
						logo: 'https://i.ibb.co.com/wNSkWt1N/image.png',
						schoolName: 'Maple Leaf Montessori',
						title:
							'How a Montessori Chain Unified 12 Branches Under One Platform',
						metrics: [
							{ value: '60%', label: 'Faster Reports' },
							{ value: '5hrs', label: 'Saved Weekly' },
						],
						category: 'Montessori',
						href: `${ROUTES.marketing.caseStudies}/maple-leaf-montessori`,
					},
					{
						image: 'https://i.ibb.co.com/0V9MCNYP/image.png',
						logo: 'https://i.ibb.co.com/mFFgcC1M/image.png',
						schoolName: 'Al-Noor Islamic Academy',
						title:
							'Automating Fee Collection and Reducing Outstanding Dues by 72%',
						metrics: [
							{ value: '72%', label: 'Fewer Overdue Fees' },
							{ value: '₹8.2L', label: 'Recovered Monthly' },
						],
						category: 'Islamic Academy',
						href: `${ROUTES.marketing.caseStudies}/al-noor-islamic-academy`,
					},
					{
						image: 'https://i.ibb.co.com/Qvjgvj0r/image.png',
						logo: 'https://i.ibb.co.com/KxpTxrWM/image.png',
						schoolName: 'Riverside Public School',
						title:
							'Parent Communication Transformed: From Circulars to Real-Time Updates',
						metrics: [
							{ value: '3.5x', label: 'Parent Engagement' },
							{ value: '92%', label: 'App Adoption' },
						],
						category: 'Public School',
						href: `${ROUTES.marketing.caseStudies}/riverside-public-school`,
					},
					{
						image: 'https://i.ibb.co.com/KpmX9vjr/image.png',
						logo: 'https://i.ibb.co.com/LDhYgsFz/image.png',
						schoolName: 'Bright Future Academy',
						title:
							'How Data-Driven Insights Helped Improve Board Exam Results by 28%',
						metrics: [
							{ value: '28%', label: 'Result Improvement' },
							{ value: '15%', label: 'Dropout Reduction' },
						],
						category: 'Secondary School',
						href: `${ROUTES.marketing.caseStudies}/bright-future-academy`,
					},
					{
						image: 'https://i.ibb.co.com/6R2dQmqq/image.png',
						logo: 'https://i.ibb.co.com/wFVBsKhw/image.png',
						schoolName: 'Little Stars Pre-School',
						title:
							'Streamlining Admissions and Waitlists for a Growing Pre-School Network',
						metrics: [
							{ value: '50%', label: 'Faster Admissions' },
							{ value: '200+', label: 'Waitlist Managed' },
						],
						category: 'Pre-School',
						href: `${ROUTES.marketing.caseStudies}/little-stars-pre-school`,
					},
				]}
			/>

			<Testimonial
				quote="Before EduPortal , I spent every Monday chasing fee receipts and attendance sheets. Now everything is on my dashboard before I finish my morning tea. The platform didn't just save us time — it changed how we think about running a school."
				author={{
					name: 'Dr. Priya Sharma',
					role: 'Principal',
					school: 'Greenfield International Academy',
					avatar: '/placeholder.svg',
				}}
			/>

			{/* TODO: Add interactive before/after slider animation */}
			<Results
				eyebrow="BEFORE & AFTER"
				title="The EduPortal Transformation"
				subtitle="See the tangible improvements schools experience after implementing EduPortal across their operations."
				comparisons={[
					{
						icon: ClipboardCheck,
						label: 'Attendance Tracking',
						before: {
							value: '45 min',
							description: 'Manual roll call per class daily',
						},
						after: {
							value: '30 sec',
							description: 'Biometric auto-capture per class',
						},
					},
					{
						icon: DollarSign,
						label: 'Fee Collection',
						before: {
							value: '68%',
							description: 'On-time payment rate with manual follow-ups',
						},
						after: {
							value: '98.4%',
							description: 'Automated reminders & online payments',
						},
					},
					{
						icon: FileText,
						label: 'Report Card Generation',
						before: {
							value: '2 weeks',
							description: 'Manual compilation by teachers',
						},
						after: {
							value: '1 click',
							description: 'Auto-generated with grade analytics',
						},
					},
					{
						icon: MessageSquare,
						label: 'Parent Communication',
						before: {
							value: '3 days',
							description: 'Paper circulars and notice boards',
						},
						after: {
							value: 'Instant',
							description: 'Push notifications & in-app messaging',
						},
					},
				]}
			/>

			{/* TODO: Populate industry data from analytics API */}
			<Industries
				eyebrow="INSTITUTIONS WE SERVE"
				title="Trusted Across Education Segments"
				subtitle="EduPortal powers schools across every type of educational institution, from pre-schools to senior secondary and beyond."
				industries={[
					{
						icon: GraduationCap,
						name: 'K-12 Schools',
						description:
							'Complete lifecycle management from nursery admissions to board exam results, covering attendance, grades, fees, and parent engagement.',
						schoolCount: 1120,
					},
					{
						icon: BookOpen,
						name: 'Montessori & Pre-Schools',
						description:
							'Age-appropriate activity tracking, photo-based daily updates for parents, and streamlined admissions with waitlist management.',
						schoolCount: 340,
					},
					{
						icon: Building2,
						name: 'CBSE / ICSE / State Boards',
						description:
							'Board-aligned grade schemas, exam scheduling, admit card generation, and result analytics mapped to curriculum standards.',
						schoolCount: 520,
					},
					{
						icon: Globe,
						name: 'International Schools',
						description:
							'Multi-currency fee handling, IB/Cambridge curriculum support, multilingual portals, and cross-campus unified dashboards.',
						schoolCount: 180,
					},
					{
						icon: Landmark,
						name: 'Government & Aided Schools',
						description:
							'Affordable deployment with mid-day meal tracking, RTE compliance, scholarship management, and district-level reporting.',
						schoolCount: 160,
					},
					{
						icon: Church,
						name: 'Faith-Based Institutions',
						description:
							'Customisable calendar integration for religious events, community communication tools, and donation tracking alongside fee management.',
						schoolCount: 80,
					},
				]}
			/>

			{/* TODO: Add animated step connector line on scroll */}
			<Process
				eyebrow="HOW IT WORKS"
				title="From Onboarding to Impact in 4 Steps"
				subtitle="Our proven implementation process ensures every school goes live smoothly, with dedicated support at every stage."
				steps={[
					{
						icon: ClipboardCheck,
						title: 'Discovery & Audit',
						description:
							'We assess your current workflows — attendance registers, fee ledgers, communication channels — and map them to EduPortal modules.',
						duration: 'Week 1',
					},
					{
						icon: Settings,
						title: 'Configuration & Migration',
						description:
							"Your school's data — student records, class sections, fee structures — is migrated and the platform is configured to your policies.",
						duration: 'Week 2–3',
					},
					{
						icon: Users,
						title: 'Training & Rollout',
						description:
							'Hands-on training sessions for administrators, teachers, and parents with role-specific guides and video walkthroughs.',
						duration: 'Week 4',
					},
					{
						icon: Zap,
						title: 'Go Live & Optimise',
						description:
							'Your school goes live with full support. Our customer success team monitors adoption and fine-tunes workflows for maximum efficiency.',
						duration: 'Week 5+',
					},
				]}
			/>

			{/* TODO: Gate PDF downloads behind lead capture form */}
			{/* TODO: Track download events in analytics */}
			<DownloadCaseStudy
				title="Download Our Case Studies"
				description="Get the complete, detailed case studies as PDF reports — packed with implementation timelines, ROI breakdowns, and actionable insights you can share with your board."
				downloads={[
					{
						title: 'Greenfield International Academy – Full Case Study',
						fileSize: '2.4 MB',
						href: '/downloads/case-study-greenfield.pdf',
					},
					{
						title: "St. Xavier's Multi-Campus Attendance Transformation",
						fileSize: '1.8 MB',
						href: '/downloads/case-study-st-xaviers.pdf',
					},
					{
						title: 'EduPortal ROI Report – Aggregate Data from 500+ Schools',
						fileSize: '3.1 MB',
						href: '/downloads/EduPortal -roi-report.pdf',
					},
				]}
			/>

			{/* TODO: Add confetti or micro-interaction on CTA hover */}
			<CaseStudiesCTA
				title="Ready to Write Your Own Success Story?"
				description="Join 2,400+ schools already using EduPortal to save time, increase revenue, and deliver better outcomes for students and parents."
				perks={[
					'Free 30-day trial',
					'No credit card required',
					'Dedicated onboarding specialist',
					'Data migration included',
					'Cancel anytime',
				]}
				primaryCta={{
					text: 'Start Free Trial',
					href: ROUTES.auth.signup,
				}}
				secondaryCta={{
					text: 'Book a Live Demo',
					href: ROUTES.marketing.demo,
				}}
			/>
		</>
	);
}
