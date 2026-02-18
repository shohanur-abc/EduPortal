'use client';

import Link from 'next/link';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// ============= MAIN COMPONENT =============
export default function DesktopNav({ routes, isAuthenticated, userRole }: IDesktopNav) {
    return (
        <section className={cn("border-b bg-background top-0 z-40", process.env.NODE_ENV === 'development' || "sticky")}>
            <nav className='max-w-7xl mx-auto flex items-center justify-between gap-8 px-6 py-2 '>
                <div className="flex items-center gap-12">
                    <BrandLogo />
                    <NavMenu routes={routes} />
                </div>
                <NavActions isAuthenticated={isAuthenticated} userRole={userRole} />
            </nav>
        </section>
    );
}

// ============= CHILD COMPONENTS =============
const BrandLogo = () => (
    <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary hover:opacity-80 transition-opacity">
        <div className="bg-primary text-primary-foreground flex aspect-square size-7 items-center justify-center rounded-lg font-bold text-sm">
            E
        </div>
        <span className="hidden sm:inline">EduPortal</span>
    </Link>
);

const NavMenu = ({ routes }: { routes: IDesktopNav['routes'] }) => (
    <NavigationMenu>
        <NavigationMenuList>
            {routes.map((route) => (
                <NavigationMenuItem key={route.label}>
                    {route.submenu ? (
                        <>
                            <NavigationMenuTrigger className={navigationMenuTriggerStyle()}>
                                {route.label}
                            </NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="grid gap-3 p-4 md:w-96 lg:w-120">
                                    {route.submenu.map((item) => (
                                        <li key={item.href}>
                                            <NavigationMenuLink asChild>
                                                <Link
                                                    href={item.href}
                                                    className={cn(
                                                        'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground'
                                                    )}
                                                >
                                                    <div className="text-sm font-medium leading-none">{item.label}</div>
                                                    {item.description && (
                                                        <p className="text-sm leading-snug text-muted-foreground">{item.description}</p>
                                                    )}
                                                </Link>
                                            </NavigationMenuLink>
                                        </li>
                                    ))}
                                </ul>
                            </NavigationMenuContent>
                        </>
                    ) : (
                        <Link href={route.href} className={navigationMenuTriggerStyle()}>
                            {route.label}
                        </Link>
                    )}
                </NavigationMenuItem>
            ))}
        </NavigationMenuList>
    </NavigationMenu>
);

const NavActions = ({ isAuthenticated, userRole }: { isAuthenticated: boolean; userRole?: string }) => (
    <div className="flex items-center gap-2">
        {isAuthenticated ? (
            <>
                <span className="text-sm text-muted-foreground capitalize">{userRole}</span>
                <Button variant="outline" size="sm" asChild>
                    <Link href="/dashboard">Dashboard</Link>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                    <Link href="/api/auth/logout">Logout</Link>
                </Button>
            </>
        ) : (
            <>
                <Button variant="ghost" size="sm" asChild>
                    <Link href="/auth/login">Login</Link>
                </Button>
                <Button size="sm" asChild>
                    <Link href="/auth/signup">Sign Up</Link>
                </Button>
            </>
        )}
    </div>
);

// ============= TYPES =============
interface IDesktopNav {
    routes: {
        label: string;
        href: string;
        description?: string;
        submenu?: {
            label: string;
            href: string;
            description?: string;
        }[];
    }[];
    isAuthenticated: boolean;
    userRole?: string;
}