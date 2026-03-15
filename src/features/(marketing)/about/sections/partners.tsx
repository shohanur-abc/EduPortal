import Image from 'next/image';
import Link from 'next/link';
import { Section } from '@/components/section';

// ============= MAIN COMPONENT =============
export default function Partners({ eyebrow, title, subtitle, partners }: IPartners) {
    return (
        <Section className='flex flex-wrap justify-center items-center gap-10 @lg:gap-16' containerClass="bg-muted/50" eyebrow={eyebrow} title={title} subtitle={subtitle}>
            {partners.map(({ name, logo, href }, i) => (
                <Link key={i} href={href} className=" opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                    <Image src={logo} alt={name} width={140} height={50} className="h-10 @sm:h-12 w-auto" />
                </Link>
            ))}
        </Section>
    );
}

// ============= TYPES =============
interface IPartners {
    eyebrow: string;
    title: string;
    subtitle: string;
    partners: {
        name: string;
        logo: string;
        href: string;
    }[];
}
