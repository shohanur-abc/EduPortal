'use client';

import DesktopNav from '@/features/navigation/desktop-nav';
import MobileNav from '@/features/navigation/mobile-nav';
import Footer from '@/features/navigation/footer';
import { useIsMobile } from '@/hooks/use-mobile';
import { usePathname } from 'next/navigation';
import { ROUTES } from '@/lib/routes';

export default function LayoutClient({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isMobile = useIsMobile();

    if (pathname.startsWith('/dashboard')) return <>{children}</>;

    const Nav = isMobile ? MobileNav : DesktopNav;
    return (
        <div>
            <Nav routes={NAVIGATION_MENU} isAuthenticated={false} />
            <main className="min-h-[40vh]">{children}</main>
            <Footer sections={FOOTER_SECTIONS} />
        </div>
    );
}

export const NAVIGATION_MENU = [
    {
        label: "Products",
        href: ROUTES.marketing.features,
        submenu: [
            {
                label: "Features",
                href: ROUTES.marketing.features,
                description: "Comprehensive school management features",
            },
            {
                label: "Pricing",
                href: ROUTES.marketing.pricing,
                description: "Transparent pricing for all school sizes",
            },
            {
                label: "Demo",
                href: ROUTES.marketing.demo,
                description: "Interactive product demo",
            },
        ],
    },
    {
        label: "Solutions",
        href: ROUTES.marketing.caseStudies,
        submenu: [
            {
                label: "Case Studies",
                href: ROUTES.marketing.caseStudies,
                description: "Success stories from schools",
            },
            {
                label: "Comparison",
                href: ROUTES.marketing.comparison,
                description: "Compare with other platforms",
            },
            {
                label: "Integrations",
                href: ROUTES.marketing.integrations,
                description: "Connect with other tools",
            },
        ],
    },
    {
        label: "Resources",
        href: ROUTES.marketing.resources,
        submenu: [
            {
                label: "Blog",
                href: ROUTES.marketing.blog,
                description: "Latest updates and insights",
            },
            {
                label: "Documentation",
                href: ROUTES.marketing.resources,
                description: "Implementation guides",
            },
            {
                label: "FAQ",
                href: ROUTES.marketing.faq,
                description: "Frequently asked questions",
            },
        ],
    },
    {
        label: "Company",
        href: ROUTES.marketing.about,
        submenu: [
            {
                label: "About",
                href: ROUTES.marketing.about,
                description: "About EG12-08",
            },
            {
                label: "Contact",
                href: ROUTES.marketing.contact,
                description: "Get in touch with us",
            },
            {
                label: "Security & Privacy",
                href: ROUTES.marketing.securityPrivacy,
                description: "Our commitment to your data",
            },
        ],
    },
];



export const FOOTER_SECTIONS = [
    {
        title: "Product",
        links: [
            { label: "Features", href: ROUTES.marketing.features },
            { label: "Pricing", href: ROUTES.marketing.pricing },
            { label: "Demo", href: ROUTES.marketing.demo },
            { label: "Security", href: ROUTES.marketing.securityPrivacy },
        ],
    },
    {
        title: "Company",
        links: [
            { label: "About", href: ROUTES.marketing.about },
            { label: "Blog", href: ROUTES.marketing.blog },
            { label: "Contact", href: ROUTES.marketing.contact },
            { label: "Careers", href: "#" },
        ],
    },
    {
        title: "Resources",
        links: [
            { label: "Documentation", href: ROUTES.marketing.resources },
            { label: "API Reference", href: "#" },
            { label: "FAQ", href: ROUTES.marketing.faq },
            { label: "Community", href: "#" },
        ],
    },
];
