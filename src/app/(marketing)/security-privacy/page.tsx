import { type Metadata } from 'next';
import { ShieldCheck, Award, Lock, UserCheck, Eye, FileSearch, AlertTriangle, Headphones, Database, KeyRound, Globe, Fingerprint, FileText, Users, GraduationCap, BookOpen, Settings, ClipboardList, Clock, Shield, Search, Bell, CheckCircle, Wrench, RefreshCcw, Activity, BarChart3, ScrollText, Network, HardDrive, CloudCog, } from 'lucide-react';
import { Hero, Certifications, DataProtection, AccessControl, PrivacyPolicy, Audit, IncidentResponse, FAQ, CTA, } from '@/features/(marketing)/security-privacy';
import { ROUTES } from '@/lib/routes';

// TODO: Add JSON-LD structured data for security & trust signals
// TODO: Add dynamic last-updated date for compliance info
// TODO: Connect metadata to CMS or config for centralized SEO management

export const metadata: Metadata = {
    title: 'Security & Privacy | EduSync — School Management System',
    description:
        'Learn how EduSync protects student data, ensures FERPA & COPPA compliance, and safeguards your institution with enterprise-grade security infrastructure.',
    keywords: [
        'school data security',
        'student privacy',
        'FERPA compliance',
        'COPPA compliance',
        'education data protection',
        'school management security',
        'EdTech privacy',
        'student information system security',
    ],
    openGraph: {
        title: 'Security & Privacy | EduSync — School Management System',
        description:
            'Enterprise-grade security and strict privacy controls to protect every student, teacher, and parent on EduSync.',
        url: ROUTES.marketing.securityPrivacy,
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Security & Privacy | EduSync',
        description:
            'Discover how EduSync safeguards student records, attendance data, and institutional information with best-in-class security.',
    },
};

export default function SecurityPrivacyPage() {
    return (
        <>
            {/* TODO: Add breadcrumb navigation */}

            <Hero
                badge="Security & Privacy"
                title="Your School Data is"
                highlight="Our Top Priority"
                description="EduSync is built from the ground up with enterprise-grade security and strict privacy controls. We protect every student record, attendance log, grade report, and fee transaction with the highest industry standards."
                icon={ShieldCheck}
                cta={{
                    primary: {
                        text: 'Request Security Audit',
                        href: ROUTES.marketing.contact,
                    },
                    secondary: {
                        text: 'View Compliance Docs',
                        href: ROUTES.marketing.resources,
                    },
                }}
            />

            <Certifications
                eyebrow="Compliance & Certifications"
                title="Trusted by Institutions Worldwide"
                subtitle="EduSync meets and exceeds global education data protection standards, ensuring your institution stays compliant with every regulation."
                certifications={[
                    {
                        icon: Award,
                        name: 'FERPA Compliant',
                        status: 'Certified',
                        description:
                            'Fully compliant with the Family Educational Rights and Privacy Act, protecting student education records and parental access rights.',
                    },
                    {
                        icon: ShieldCheck,
                        name: 'COPPA Compliant',
                        status: 'Certified',
                        description:
                            'Strict adherence to the Children\'s Online Privacy Protection Act for students under 13, with verified parental consent workflows.',
                    },
                    {
                        icon: Globe,
                        name: 'GDPR Ready',
                        status: 'Compliant',
                        description:
                            'Full General Data Protection Regulation compliance for schools operating within or serving students from the European Union.',
                    },
                    {
                        icon: FileText,
                        name: 'SOC 2 Type II',
                        status: 'Audited',
                        description:
                            'Independent third-party audit confirming our security controls for data availability, confidentiality, and processing integrity.',
                    },
                ]}
            />

            <DataProtection
                eyebrow="Data Protection"
                title="Multi-Layered Data Security"
                subtitle="Every piece of student information — from grades and attendance to health records and fee receipts — is protected with industry-leading encryption and access protocols."
                measures={[
                    {
                        icon: Lock,
                        title: 'AES-256 Encryption at Rest',
                        description:
                            'All student records, academic transcripts, and financial data are encrypted with AES-256 at rest in our secured databases.',
                        features: [
                            'Student personal information & demographics',
                            'Academic grades, transcripts, and report cards',
                            'Fee payment records and financial statements',
                            'Health and medical records',
                        ],
                    },
                    {
                        icon: KeyRound,
                        title: 'TLS 1.3 In-Transit Encryption',
                        description:
                            'Every data transmission between browsers, mobile apps, and our servers is secured with the latest TLS 1.3 protocol.',
                        features: [
                            'Parent-teacher communication channels',
                            'Attendance submissions from classrooms',
                            'Grade entry and report generation',
                            'Fee payment gateway transactions',
                        ],
                    },
                    {
                        icon: Database,
                        title: 'Automated Encrypted Backups',
                        description:
                            'Continuous encrypted backups with point-in-time recovery ensure no student data is ever permanently lost.',
                        features: [
                            'Hourly incremental backups of all school data',
                            'Daily full snapshots with 90-day retention',
                            'Geo-redundant backup storage across regions',
                            'Tested disaster recovery with 4-hour RTO',
                        ],
                    },
                    {
                        icon: Fingerprint,
                        title: 'Data Anonymization',
                        description:
                            'Student data used for analytics and reporting is automatically anonymized, preventing identification of individual students.',
                        features: [
                            'Anonymized performance trend analytics',
                            'De-identified attendance pattern reports',
                            'Aggregate fee collection insights',
                            'Privacy-safe benchmarking dashboards',
                        ],
                    },
                    {
                        icon: Eye,
                        title: 'Data Minimization',
                        description:
                            'We collect only the data strictly necessary for school operations, reducing risk exposure and respecting student privacy.',
                        features: [
                            'Purpose-limited data collection forms',
                            'Automatic data retention policy enforcement',
                            'Annual data review and purge workflows',
                            'Opt-in consent for non-essential data fields',
                        ],
                    },
                    {
                        icon: RefreshCcw,
                        title: 'Right to Erasure',
                        description:
                            'Parents and guardians can request complete deletion of their child\'s data in compliance with GDPR and local regulations.',
                        features: [
                            'Self-service data deletion request portal',
                            'Complete erasure within 30 days',
                            'Automated cascade deletion across all modules',
                            'Deletion confirmation and audit certificate',
                        ],
                    },
                ]}
            />

            

            <AccessControl
                eyebrow="Role-Based Access"
                title="Granular Permission Controls"
                subtitle="Every user in EduSync — from super-admins to parents — has precisely scoped access. No one sees more data than they need."
                roles={[
                    {
                        icon: Settings,
                        role: 'Super Administrator',
                        description: 'Full system access with audit visibility across all school branches.',
                        permissions: [
                            'System Configuration',
                            'User Management',
                            'Branch Management',
                            'Audit Logs',
                            'Billing & Subscriptions',
                            'Data Export',
                        ],
                    },
                    {
                        icon: GraduationCap,
                        role: 'Principal',
                        description: 'School-wide oversight of academics, staff, and institutional operations.',
                        permissions: [
                            'View All Students',
                            'Staff Management',
                            'Academic Reports',
                            'Fee Oversight',
                            'Notice Publishing',
                            'Attendance Reports',
                        ],
                    },
                    {
                        icon: BookOpen,
                        role: 'Teacher',
                        description: 'Access limited to assigned classes, subjects, and direct students.',
                        permissions: [
                            'Mark Attendance',
                            'Enter Grades',
                            'View Class Roster',
                            'Upload Resources',
                            'Send Notices',
                            'View Own Schedule',
                        ],
                    },
                    {
                        icon: ClipboardList,
                        role: 'Admin Staff',
                        description: 'Operational access for fee management, admissions, and daily workflows.',
                        permissions: [
                            'Fee Collection',
                            'Student Enrollment',
                            'Generate Receipts',
                            'Manage Calendar',
                            'View Reports',
                            'Handle Inquiries',
                        ],
                    },
                    {
                        icon: Users,
                        role: 'Parent / Guardian',
                        description: 'View-only access scoped exclusively to their enrolled children.',
                        permissions: [
                            'View Attendance',
                            'View Report Cards',
                            'Pay Fees Online',
                            'Read Notices',
                            'Contact Teachers',
                            'Download Receipts',
                        ],
                    },
                    {
                        icon: UserCheck,
                        role: 'Student',
                        description: 'Self-service access to personal academic information and resources.',
                        permissions: [
                            'View Grades',
                            'View Attendance',
                            'Access Resources',
                            'View Schedule',
                            'View Notices',
                            'Update Profile',
                        ],
                    },
                ]}
            />

            <PrivacyPolicy
                eyebrow="Privacy Commitment"
                title="Transparent Privacy Practices"
                subtitle="We believe schools and parents deserve complete clarity about how student data is handled. Our privacy practices are designed for trust."
                highlights={[
                    {
                        icon: Eye,
                        title: 'No Data Selling — Ever',
                        description:
                            'We will never sell, rent, or share student data with advertisers, data brokers, or any third party for commercial purposes. Your data belongs to your school.',
                    },
                    {
                        icon: Lock,
                        title: 'School Owns the Data',
                        description:
                            'Your institution retains full ownership of all data entered into EduSync. Upon contract termination, we provide complete data export and certified deletion.',
                    },
                    {
                        icon: FileSearch,
                        title: 'Full Transparency Reports',
                        description:
                            'Every quarter, we publish transparency reports detailing data access requests, security incidents (if any), and system uptime metrics.',
                    },
                    {
                        icon: Fingerprint,
                        title: 'Minimal Third-Party Sharing',
                        description:
                            'We only share data with vetted sub-processors essential for operations (e.g., payment gateways) under strict Data Processing Agreements.',
                    },
                ]}
                details={[
                    {
                        title: 'What Data We Collect',
                        content:
                            'We collect student enrollment information (name, date of birth, grade level, guardian details), academic records (grades, attendance, assessments), and operational data (fee transactions, communication logs). We do not collect biometric data, social media profiles, or browsing history.',
                    },
                    {
                        title: 'How We Use Your Data',
                        content:
                            'Student data is used exclusively for educational administration: managing enrollment, recording attendance, generating report cards, processing fee payments, and facilitating parent-teacher communication. We never use student data for targeted advertising or profiling.',
                    },
                    {
                        title: 'Data Retention & Deletion',
                        content:
                            'Active student records are retained for the duration of enrollment plus 5 years for regulatory compliance. Graduated or withdrawn student data can be archived or deleted upon school request. Complete data purge is executed within 30 days of a verified deletion request.',
                    },
                    {
                        title: 'Parental Rights & Consent',
                        content:
                            'Parents and guardians can access, review, correct, or request deletion of their child\'s data at any time through the parent portal. For students under 13, we obtain verifiable parental consent before collecting any personal information, in full COPPA compliance.',
                    },
                    {
                        title: 'Sub-Processors & Third Parties',
                        content:
                            'We work with a limited set of vetted sub-processors: cloud hosting (AWS), payment processing (Stripe), email delivery (SendGrid), and SMS notifications (Twilio). Each operates under a strict Data Processing Agreement with equivalent security obligations.',
                    },
                    {
                        title: 'International Data Transfers',
                        content:
                            'For schools outside the US, data is stored in the nearest regional data center. Cross-border transfers are governed by Standard Contractual Clauses (SCCs) and comply with local data protection laws including GDPR, PDPA, and India\'s DPDP Act.',
                    },
                ]}
            />

            <Audit
                eyebrow="Audit & Monitoring"
                title="Complete Audit Trail"
                subtitle="Every action in EduSync is logged, timestamped, and attributable. From grade changes to login attempts, nothing goes unnoticed."
                features={[
                    {
                        icon: Activity,
                        title: 'User Activity Logging',
                        description:
                            'Comprehensive logging of every user action across all modules with immutable, tamper-proof audit records.',
                        tag: 'Real-Time',
                        capabilities: [
                            'Login/logout timestamps with IP and device info',
                            'Grade entry and modification history with diffs',
                            'Attendance record changes with before/after snapshots',
                            'Fee transaction and receipt generation logs',
                        ],
                    },
                    {
                        icon: Search,
                        title: 'Advanced Audit Search',
                        description:
                            'Powerful search and filter tools for administrators to investigate specific actions, users, or time periods.',
                        tag: 'Admin Tool',
                        capabilities: [
                            'Filter by user, role, module, or date range',
                            'Full-text search across audit log entries',
                            'Export audit reports in PDF and CSV formats',
                            'Saved search queries for recurring investigations',
                        ],
                    },
                    {
                        icon: Bell,
                        title: 'Anomaly Alerts',
                        description:
                            'Automated alerts for suspicious activities like bulk data exports, unusual login patterns, or unauthorized access attempts.',
                        tag: 'AI-Powered',
                        capabilities: [
                            'Bulk download or export detection alerts',
                            'Failed login attempt threshold notifications',
                            'Off-hours access pattern warnings',
                            'Permission escalation attempt alerts',
                        ],
                    },
                    {
                        icon: BarChart3,
                        title: 'Compliance Reporting',
                        description:
                            'Pre-built compliance reports for auditors, school boards, and regulatory bodies with one-click generation.',
                        capabilities: [
                            'FERPA compliance audit summary reports',
                            'Data access and sharing activity reports',
                            'User permission and role change history',
                            'Data retention policy adherence reports',
                        ],
                    },
                    {
                        icon: Clock,
                        title: 'Log Retention & Integrity',
                        description:
                            'Audit logs are retained for 7 years with cryptographic integrity verification to prevent tampering.',
                        capabilities: [
                            'SHA-256 hash chaining for log integrity',
                            '7-year immutable retention in cold storage',
                            'Automated log rotation and archival',
                            'Third-party log verification on demand',
                        ],
                    },
                    {
                        icon: ScrollText,
                        title: 'Regulatory Audit Support',
                        description:
                            'Dedicated support for external audits with pre-packaged evidence bundles and direct auditor collaboration tools.',
                        capabilities: [
                            'Pre-packaged audit evidence bundles',
                            'Secure auditor access portal with time-limited credentials',
                            'Automated control evidence collection',
                            'Audit readiness health score dashboard',
                        ],
                    },
                ]}
            />

            <IncidentResponse
                eyebrow="Incident Response"
                title="Rapid Incident Response Plan"
                subtitle="In the unlikely event of a security incident, our dedicated response team follows a tested, transparent protocol to protect your institution."
                steps={[
                    {
                        icon: AlertTriangle,
                        title: 'Detection & Identification',
                        description:
                            'Our 24/7 Security Operations Center uses AI-powered monitoring to detect threats in real time across all school instances.',
                        timeline: 'Within 15 minutes',
                        details: [
                            'Automated threat detection via SIEM platform',
                            'AI anomaly detection across all user sessions',
                            'Real-time alerting to on-call security engineers',
                            'Automated initial threat classification and triage',
                        ],
                    },
                    {
                        icon: Shield,
                        title: 'Containment & Isolation',
                        description:
                            'Affected systems or accounts are immediately isolated to prevent lateral movement while maintaining service for unaffected schools.',
                        timeline: 'Within 1 hour',
                        details: [
                            'Automated account suspension for compromised users',
                            'Network segmentation of affected school instances',
                            'Preservation of forensic evidence for investigation',
                            'Activation of incident response war room',
                        ],
                    },
                    {
                        icon: Search,
                        title: 'Investigation & Analysis',
                        description:
                            'Our security team conducts a thorough forensic investigation to determine root cause, scope, and impact on student data.',
                        timeline: 'Within 24 hours',
                        details: [
                            'Full forensic analysis of affected systems and logs',
                            'Student data impact assessment and scoping',
                            'Root cause identification and attack vector mapping',
                            'Engagement of third-party forensic experts if needed',
                        ],
                    },
                    {
                        icon: Bell,
                        title: 'Notification & Communication',
                        description:
                            'Affected schools, parents, and regulatory bodies are notified within mandated timeframes with clear, actionable information.',
                        timeline: 'Within 72 hours',
                        details: [
                            'Direct notification to affected school administrators',
                            'Parent/guardian communication with plain-language summary',
                            'Regulatory body notification (FERPA, GDPR as applicable)',
                            'Public status page updates if service is impacted',
                        ],
                    },
                    {
                        icon: Wrench,
                        title: 'Remediation & Recovery',
                        description:
                            'Systems are patched, hardened, and fully restored. Affected accounts receive forced credential resets and enhanced monitoring.',
                        timeline: 'Within 48–96 hours',
                        details: [
                            'Vulnerability patching and system hardening',
                            'Forced password resets for affected accounts',
                            'Enhanced monitoring for 90 days post-incident',
                            'Service restoration and validation testing',
                        ],
                    },
                    {
                        icon: CheckCircle,
                        title: 'Post-Incident Review',
                        description:
                            'A comprehensive post-mortem is conducted, lessons are documented, and preventive measures are implemented to prevent recurrence.',
                        timeline: 'Within 2 weeks',
                        details: [
                            'Blameless post-mortem with full timeline reconstruction',
                            'Security control gap analysis and remediation plan',
                            'Updated runbooks and incident response procedures',
                            'Transparency report shared with affected institutions',
                        ],
                    },
                ]}
            />

            <FAQ
                eyebrow="Security FAQ"
                title="Frequently Asked Questions"
                subtitle="Answers to the most common security and privacy questions from school administrators, IT teams, and parents."
                items={[
                    {
                        question: 'Where is student data physically stored?',
                        answer: 'Student data is stored in SOC 2 Type II and ISO 27001 certified data centers operated by AWS. US schools use us-east-1 (Virginia) and us-west-2 (Oregon) regions. International schools are routed to the nearest compliant regional data center. All data at rest is encrypted with AES-256.',
                    },
                    {
                        question: 'Is EduSync FERPA compliant?',
                        answer: 'Yes, EduSync is fully FERPA compliant. We act as a "school official" under FERPA, meaning we handle education records solely on behalf of the school and under the school\'s direct control. We sign FERPA-compliant Data Processing Agreements with every institution.',
                    },
                    {
                        question: 'Can parents request deletion of their child\'s data?',
                        answer: 'Absolutely. Parents and guardians can submit a data deletion request through the parent portal or by contacting their school administrator. Once verified, we execute complete data erasure across all systems within 30 days and provide a certified deletion confirmation.',
                    },
                    {
                        question: 'How does EduSync handle data breaches?',
                        answer: 'We follow a structured 6-step incident response plan: Detection (within 15 min), Containment (within 1 hr), Investigation (within 24 hrs), Notification (within 72 hrs), Remediation (48-96 hrs), and Post-Incident Review (within 2 weeks). Affected schools and parents are notified within legally mandated timeframes.',
                    },
                    {
                        question: 'Does EduSync sell or share student data with third parties?',
                        answer: 'Never. We do not sell, rent, or share student data with advertisers, data brokers, or any commercial third party. The only third parties with limited data access are essential sub-processors (AWS for hosting, Stripe for payments, SendGrid for email) under strict Data Processing Agreements.',
                    },
                    {
                        question: 'What happens to our data if we cancel our EduSync subscription?',
                        answer: 'Upon contract termination, we provide a 90-day window for complete data export in standard formats (CSV, JSON, PDF). After the export window, all data is permanently deleted from our systems within 30 days, including backups. We provide a certified deletion letter for your records.',
                    },
                    {
                        question: 'How is access controlled for different user roles?',
                        answer: 'EduSync implements granular Role-Based Access Control (RBAC). Each user role — Super Admin, Principal, Teacher, Admin Staff, Parent, Student — has precisely scoped permissions. Teachers only see their assigned classes, parents only see their children, and all access is logged in the audit trail.',
                    },
                    {
                        question: 'Does EduSync support Multi-Factor Authentication (MFA)?',
                        answer: 'Yes, EduSync supports MFA via authenticator apps (TOTP), SMS codes, and email verification. MFA can be enforced institution-wide by administrators for all staff accounts. We strongly recommend enabling MFA for all users with administrative privileges.',
                    },
                ]}
            />

            {/* TODO: Add trust badges / partner logos section */}
            {/* TODO: Add downloadable security whitepaper link */}

            <CTA
                icon={Headphones}
                title="Ready to Protect Your School's Data?"
                description="Schedule a security walkthrough with our team. We'll show you exactly how EduSync safeguards your institution's most sensitive information."
                primaryCta={{
                    text: 'Book a Security Demo',
                    href: ROUTES.marketing.demo,
                }}
                secondaryCta={{
                    text: 'Download Security Whitepaper',
                    href: ROUTES.marketing.resources,
                }}
            />
        </>
    );
}
