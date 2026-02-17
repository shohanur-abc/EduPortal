import { type Metadata } from 'next';
import {
  Building2,
  GraduationCap,
  Landmark,
  School,
  Users,
  ShieldCheck,
  Clock,
  HeadphonesIcon,
  RefreshCcw,
  CreditCard,
  MessageSquare,
  Bus,
  UtensilsCrossed,
  Library,
  Waypoints,
  type LucideIcon,
} from 'lucide-react';
import {
  Hero,
  Plans,
  ComparisonTable,
  Calculator,
  Guarantees,
  Testimonial,
  FAQ,
  Enterprise,
  AddOns,
  CTA,
} from '@/features/(marketing)/pricing';
import { ROUTES } from '@/lib/routes';

// TODO: Add JSON-LD structured data for pricing page (SoftwareApplication schema)
// TODO: Add A/B testing for pricing tiers and CTA copy
// TODO: Integrate live currency conversion based on visitor geolocation
// TODO: Add annual vs monthly toggle state management

export const metadata: Metadata = {
  title: 'Pricing — Affordable Plans for Every School | EduSync',
  description:
    'Transparent, per-student pricing for schools of all sizes. From small academies to large districts — choose the EduSync plan that fits your needs. Free trial included.',
  keywords: [
    'school management system pricing',
    'edtech pricing plans',
    'school software cost',
    'student management system price',
    'school ERP pricing',
    'education software plans',
    'affordable school management',
  ],
  openGraph: {
    title: 'Pricing — Affordable Plans for Every School | EduSync',
    description:
      'Transparent, per-student pricing for schools of all sizes. Start free, scale as you grow.',
    url: '/pricing',
    type: 'website',
    images: [
      {
        url: '/placeholder.svg',
        width: 1200,
        height: 630,
        alt: 'EduSync Pricing Plans',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pricing — Affordable Plans for Every School | EduSync',
    description:
      'Transparent, per-student pricing for schools of all sizes. Start free, scale as you grow.',
    images: ['/placeholder.svg'],
  },
  alternates: {
    canonical: '/pricing',
  },
};

// TODO: Move to a shared constants file if reused across pages
export default function PricingPage() {
  return (
    <>
      {/* TODO: Add pricing page view analytics event */}
      <Hero
        eyebrow="Simple, Transparent Pricing"
        title="Plans that grow with"
        highlight="your school"
        description="No hidden fees, no long-term contracts. Pay per student, per month — and only for the features you need. Every plan includes a 14-day free trial."
        billingHint="💡 Save up to 20% with annual billing — all prices shown are monthly"
      />

      <Plans
        eyebrow="Choose Your Plan"
        title="A plan for every school size"
        subtitle="Whether you're a single-campus academy or a multi-branch institution, we have the right fit for you."
        plans={[
          {
            icon: GraduationCap as LucideIcon,
            name: 'Starter',
            description:
              'Perfect for small schools and coaching centres just getting started with digital management.',
            price: '$2',
            period: 'student/mo',
            features: [
              'Up to 300 students',
              'Attendance tracking',
              'Basic fee collection',
              'Student & teacher profiles',
              'Notice board',
              'Email support',
              'Mobile app access',
              'Basic report cards',
            ],
            cta: { text: 'Start Free Trial', href: ROUTES.auth.signup },
          },
          {
            icon: School as LucideIcon,
            name: 'Professional',
            description:
              'Ideal for mid-size schools that need advanced analytics, communication, and operations tools.',
            price: '$4',
            period: 'student/mo',
            popular: true,
            features: [
              'Up to 2,000 students',
              'Everything in Starter',
              'Advanced analytics & dashboards',
              'Online fee payments',
              'Exam & result management',
              'Parent communication portal',
              'Timetable scheduling',
              'Priority email & chat support',
              'Custom report cards',
              'Role-based access control',
            ],
            cta: { text: 'Start Free Trial', href: ROUTES.auth.signup },
          },
          {
            icon: Landmark as LucideIcon,
            name: 'Institution',
            description:
              'Built for large schools and multi-campus institutions with complex operational needs.',
            price: '$6',
            period: 'student/mo',
            features: [
              'Unlimited students',
              'Everything in Professional',
              'Multi-campus management',
              'HR & payroll module',
              'Inventory & asset tracking',
              'Advanced fee structures & discounts',
              'Board & compliance reports',
              'Dedicated account manager',
              'API access & integrations',
              'Custom onboarding & training',
            ],
            cta: { text: 'Contact Sales', href: ROUTES.marketing.contact },
          },
        ]}
      />

      {/* TODO: Add interactive toggle for monthly/annual pricing */}
      <ComparisonTable
        eyebrow="Feature Comparison"
        title="See what's included in each plan"
        subtitle="A detailed breakdown so you can choose the plan that matches your school's requirements."
        plans={['Starter', 'Professional', 'Institution']}
        categories={[
          {
            name: 'Student Management',
            features: [
              {
                name: 'Student profiles & enrollment',
                availability: [true, true, true],
              },
              { name: 'Attendance tracking', availability: [true, true, true] },
              {
                name: 'Behavior & discipline records',
                availability: [false, true, true],
              },
              {
                name: 'Student promotion & transfer',
                availability: [false, true, true],
              },
              { name: 'Alumni management', availability: [false, false, true] },
            ],
          },
          {
            name: 'Academics & Exams',
            features: [
              { name: 'Basic report cards', availability: [true, true, true] },
              {
                name: 'Custom grading systems',
                availability: [false, true, true],
              },
              {
                name: 'Exam scheduling & hall tickets',
                availability: [false, true, true],
              },
              {
                name: 'Result analytics & trends',
                availability: [false, true, true],
              },
              {
                name: 'Board exam integration',
                availability: [false, false, true],
              },
            ],
          },
          {
            name: 'Fee Management',
            features: [
              {
                name: 'Basic fee collection',
                availability: [true, true, true],
              },
              {
                name: 'Online payment gateway',
                availability: [false, true, true],
              },
              {
                name: 'Custom fee structures',
                availability: [false, true, true],
              },
              {
                name: 'Scholarship & discount management',
                availability: [false, false, true],
              },
              {
                name: 'Automated late-fee reminders',
                availability: [false, true, true],
              },
            ],
          },
          {
            name: 'Communication',
            features: [
              { name: 'Notice board', availability: [true, true, true] },
              {
                name: 'SMS & email notifications',
                availability: ['50/mo', 'Unlimited', 'Unlimited'],
              },
              { name: 'Parent mobile app', availability: [false, true, true] },
              { name: 'In-app messaging', availability: [false, true, true] },
              {
                name: 'Emergency broadcast',
                availability: [false, false, true],
              },
            ],
          },
          {
            name: 'Administration & Operations',
            features: [
              {
                name: 'Timetable management',
                availability: [false, true, true],
              },
              {
                name: 'Staff & HR management',
                availability: [false, false, true],
              },
              {
                name: 'Inventory & asset tracking',
                availability: [false, false, true],
              },
              {
                name: 'Multi-campus support',
                availability: [false, false, true],
              },
              {
                name: 'Custom roles & permissions',
                availability: [false, true, true],
              },
            ],
          },
          {
            name: 'Reporting & Analytics',
            features: [
              { name: 'Basic reports', availability: [true, true, true] },
              {
                name: 'Advanced dashboards',
                availability: [false, true, true],
              },
              {
                name: 'Custom report builder',
                availability: [false, false, true],
              },
              {
                name: 'Data export (CSV, PDF)',
                availability: [true, true, true],
              },
              {
                name: 'Board & compliance reports',
                availability: [false, false, true],
              },
            ],
          },
          {
            name: 'Support & Security',
            features: [
              { name: 'Email support', availability: [true, true, true] },
              { name: 'Chat support', availability: [false, true, true] },
              {
                name: 'Dedicated account manager',
                availability: [false, false, true],
              },
              {
                name: 'SSO & LDAP integration',
                availability: [false, false, true],
              },
              { name: 'SLA guarantee', availability: ['—', '99.5%', '99.9%'] },
            ],
          },
        ]}
      />

      <Calculator
        eyebrow="Cost Estimator"
        title="Estimate your monthly cost"
        subtitle="Enter your total student count to see a personalized price estimate across our plans."
        inputLabel="How many students does your school have?"
        inputPlaceholder="e.g. 500"
        tiers={[
          {
            icon: GraduationCap as LucideIcon,
            range: '1 – 300 students',
            pricePerStudent: '$2.00 / student / month',
          },
          {
            icon: School as LucideIcon,
            range: '301 – 2,000 students',
            pricePerStudent: '$4.00 / student / month',
          },
          {
            icon: Landmark as LucideIcon,
            range: '2,001 – 5,000 students',
            pricePerStudent: '$6.00 / student / month',
          },
          {
            icon: Building2 as LucideIcon,
            range: '5,001+ students',
            pricePerStudent: 'Custom pricing — contact us',
          },
        ]}
        note="All plans include a 14-day free trial. Volume discounts available for 5,000+ students."
      />

      <Guarantees
        eyebrow="Our Promise"
        title="Risk-free guarantees"
        subtitle="We're confident EduSync will transform your school operations. That's why we back every plan with these commitments."
        guarantees={[
          {
            icon: RefreshCcw as LucideIcon,
            title: '30-Day Money Back',
            description:
              'Not satisfied within the first 30 days? Get a full refund — no questions asked, no hoops to jump through.',
          },
          {
            icon: ShieldCheck as LucideIcon,
            title: '99.9% Uptime SLA',
            description:
              "Your school can't afford downtime. We guarantee 99.9% platform availability, backed by a service-level agreement.",
          },
          {
            icon: Clock as LucideIcon,
            title: 'Free Migration',
            description:
              'Switching from another system? Our team will migrate all your student, fee, and academic data at no extra cost.',
          },
          {
            icon: HeadphonesIcon as LucideIcon,
            title: 'Dedicated Onboarding',
            description:
              'Every paid plan includes guided onboarding sessions, staff training, and documentation to get you up and running fast.',
          },
          {
            icon: CreditCard as LucideIcon,
            title: 'No Hidden Fees',
            description:
              'The price you see is the price you pay. No setup charges, no surprise invoices, no per-feature upsells.',
          },
          {
            icon: Users as LucideIcon,
            title: 'Unlimited Admin Users',
            description:
              'Add as many teachers, administrators, and staff accounts as you need — at no additional per-seat cost.',
          },
        ]}
      />

      {/* TODO: Rotate testimonials or fetch dynamically from CMS */}
      <Testimonial
        quote="We evaluated five school management platforms before choosing EduSync. The transparent pricing and the fact that everything was included — no nickel-and-diming for basic features — made the decision easy. Within three months, our fee collection rate went from 72% to 95%."
        author={{
          name: 'Priya Mehta',
          role: 'Principal',
          school: 'Greenfield International Academy',
          avatar: '/placeholder.svg',
        }}
        metric={{
          value: '95%',
          label: 'fee collection rate after 3 months',
        }}
      />

      <AddOns
        eyebrow="Optional Add-Ons"
        title="Extend your platform"
        subtitle="Enhance EduSync with additional modules tailored to your school's unique needs. Add or remove anytime."
        addOns={[
          {
            icon: Bus as LucideIcon,
            name: 'Transport Management',
            description:
              'Real-time GPS bus tracking, route optimization, driver management, and parent pickup notifications.',
            price: '$0.50 / student / mo',
            tag: 'Popular',
          },
          {
            icon: UtensilsCrossed as LucideIcon,
            name: 'Cafeteria & Meal Plans',
            description:
              'Digital meal ordering, dietary tracking, prepaid meal wallets, and nutrition reporting for parents.',
            price: '$0.30 / student / mo',
          },
          {
            icon: Library as LucideIcon,
            name: 'Library Management',
            description:
              'Barcode-based book tracking, issue/return automation, overdue reminders, and digital catalog.',
            price: '$0.25 / student / mo',
          },
          {
            icon: MessageSquare as LucideIcon,
            name: 'SMS & WhatsApp Pack',
            description:
              'Bulk SMS and WhatsApp messaging for fee reminders, attendance alerts, and parent announcements.',
            price: '$15 / 1,000 messages',
            tag: 'New',
          },
          {
            icon: Waypoints as LucideIcon,
            name: 'API & Integrations',
            description:
              'RESTful API access, webhook support, and pre-built connectors for Tally, QuickBooks, and Google Workspace.',
            price: '$50 / mo flat',
          },
          {
            icon: ShieldCheck as LucideIcon,
            name: 'Advanced Security',
            description:
              'SSO with SAML/OIDC, IP whitelisting, audit logs, data encryption at rest, and GDPR compliance toolkit.',
            price: '$75 / mo flat',
          },
        ]}
      />

      <Enterprise
        icon={Building2 as LucideIcon}
        title="Running a school district or education group?"
        description="EduSync Enterprise is built for large-scale deployments with dedicated infrastructure, custom SLAs, and white-glove support for districts managing 5,000+ students across multiple campuses."
        features={[
          'Unlimited students & campuses',
          'Dedicated cloud infrastructure',
          'Custom SLA up to 99.99%',
          'White-label branding',
          'On-premise deployment option',
          'Priority 24/7 phone support',
          'Custom integrations & API',
          'Data residency compliance',
          'Quarterly business reviews',
        ]}
        cta={{
          text: 'Talk to Enterprise Sales',
          href: ROUTES.marketing.contact,
        }}
      />

      <FAQ
        eyebrow="Frequently Asked Questions"
        title="Got questions? We've got answers"
        subtitle="Everything you need to know about EduSync pricing, billing, and plans."
        items={[
          {
            question: 'Can I try EduSync before committing to a paid plan?',
            answer:
              'Absolutely! Every plan comes with a 14-day free trial — no credit card required. You get full access to all features in your chosen plan so you can evaluate it with real data before making a decision.',
          },
          {
            question: 'How does per-student pricing work?',
            answer:
              'You pay a fixed monthly rate per actively enrolled student. Inactive or alumni students are not counted. If your student count changes mid-cycle, your next invoice adjusts automatically — you only pay for what you use.',
          },
          {
            question: 'Can I switch plans or upgrade later?',
            answer:
              "Yes, you can upgrade or downgrade at any time from your admin dashboard. When upgrading, you'll get immediate access to the new features and we'll prorate the cost. Downgrading takes effect at your next billing cycle.",
          },
          {
            question: 'What payment methods do you accept?',
            answer:
              'We accept all major credit and debit cards (Visa, Mastercard, Amex), bank transfers, UPI, and net banking. For Institution and Enterprise plans, we also support purchase orders and wire transfers.',
          },
          {
            question: 'Is there a discount for annual billing?',
            answer:
              'Yes! Schools that opt for annual billing save 20% compared to monthly pricing. Annual plans are billed upfront and include all the same features and support as monthly plans.',
          },
          {
            question: 'What happens to our data if we cancel?',
            answer:
              'Your data remains accessible for 90 days after cancellation. You can export everything — student records, fee history, reports — in CSV or PDF format. After 90 days, data is securely deleted per our privacy policy.',
          },
          {
            question:
              'Do you offer discounts for non-profit or government schools?',
            answer:
              "Yes, we offer special pricing for registered non-profit institutions and government schools. Contact our sales team with your institution details, and we'll work out a plan that fits your budget.",
          },
          {
            question: "Is my school's data secure?",
            answer:
              'Security is our top priority. All data is encrypted at rest and in transit with AES-256 and TLS 1.3. We are SOC 2 Type II certified, GDPR compliant, and offer data residency options for schools that require it.',
          },
        ]}
      />

      <CTA
        title="Ready to modernize your school?"
        description="Join 3,000+ schools already using EduSync to streamline admissions, automate fee collection, and improve academic outcomes. Start your free trial today."
        primaryCta={{
          text: 'Start 14-Day Free Trial',
          href: ROUTES.auth.signup,
        }}
        secondaryCta={{ text: 'Schedule a Demo', href: ROUTES.marketing.demo }}
      />
    </>
  );
}
