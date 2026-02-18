'use client';

import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

// ============= MAIN COMPONENT =============
export default function Footer({ sections }: IFooter) {
    return (
        <footer className="bg-muted/50 border-t mt-20">
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 mb-12">
                    <FooterBrand />
                    {sections.map((section) => (
                        <FooterSection key={section.title} section={section} />
                    ))}
                </div>
                <Separator />
                <FooterBottom />
            </div>
        </footer>
    );
}

// ============= CHILD COMPONENTS =============
const FooterBrand = () => (
    <div className="space-y-4">
        <div className="flex items-center gap-2">
            <div className="bg-primary text-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg font-bold text-sm">
                E
            </div>
            <h3 className="font-bold text-lg">EduPortal</h3>
        </div>
        <p className="text-sm text-muted-foreground">
            School Management System - Comprehensive EdTech Unified Portal for modern education.
        </p>
        <div className="flex gap-3">
            {['Twitter', 'Facebook', 'LinkedIn'].map((social) => (
                <Link
                    key={social}
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                    {social}
                </Link>
            ))}
        </div>
    </div>
);

const FooterSection = ({ section }: { section: IFooter['sections'][number] }) => (
    <div className="space-y-4">
        <h4 className="font-semibold text-sm">{section.title}</h4>
        <ul className="space-y-2">
            {section.links.map((link,i) => (
                <li key={link.href+i}>
                    <Link
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                        {link.label}
                    </Link>
                </li>
            ))}
        </ul>
    </div>
);

const FooterBottom = () => (
    <div className="py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <p>&copy; 2026 EduPortal School Management System. All rights reserved.</p>
        <div className="flex gap-6">
            <Link href="/security-privacy" className="hover:text-primary transition-colors">
                Privacy Policy
            </Link>
            <Link href="/security-privacy" className="hover:text-primary transition-colors">
                Terms of Service
            </Link>
        </div>
    </div>
);

// ============= TYPES =============
interface IFooter {
    sections: {
        title: string;
        links: {
            label: string;
            href: string;
        }[];
    }[];
}