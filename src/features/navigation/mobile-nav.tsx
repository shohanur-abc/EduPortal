'use client';

import Link from 'next/link';
import { ROUTES } from '@/lib/routes';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import UserMenu from './user-menu';

// ============= MAIN COMPONENT =============
export default function MobileNav({ routes, user }: IMobileNav) {
  return (
    <nav className="md:hidden fixed top-0 left-0 right-0 z-40 bg-background border-b">
      <div className="flex items-center justify-between px-4 py-2">
        <BrandLogo />
        <MobileMenuSheet routes={routes} user={user} />
      </div>
    </nav>
  );
}

// ============= CHILD COMPONENTS =============
const BrandLogo = () => (
  <Link href={ROUTES.marketing.home} className="flex items-center gap-2 font-bold text-lg text-primary hover:opacity-80 transition-opacity">
    <div className="bg-primary text-primary-foreground flex aspect-square size-6 items-center justify-center rounded font-bold text-xs">
      E
    </div>
    <span>EduPortal </span>
  </Link>
);

const MobileMenuSheet = ({ routes, user }: IMobileNav) => (
  <Sheet>
    <SheetTrigger asChild>
      <Button variant="ghost" size="icon" className="md:hidden">
        <Menu className="size-5" />
      </Button>
    </SheetTrigger>
    <SheetContent side="right" className="w-62 p-0">
      <div className="flex flex-col h-full">
        <div className="flex items-center gap-2 px-4 py-3 border-b">
          <div className="bg-primary text-primary-foreground flex aspect-square size-6 items-center justify-center rounded font-bold text-xs">
            E
          </div>
          <span className="font-semibold">EduPortal </span>
        </div>
        <div className="flex-1 overflow-auto p-4 space-y-4">
          {routes.map((route) => (
            <div key={route.label} className="space-y-2">
              <Link
                href={route.href}
                className="block font-medium text-sm hover:text-primary transition-colors"
              >
                {route.label}
              </Link>
              {route.submenu && (
                <div className="pl-4 space-y-2 border-l">
                  {route.submenu.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="border-t p-4 space-y-3">
          {user ? (
            <UserMenu user={user} />
          ) : (
            <>
              <Button variant="outline" size="sm" className="w-full" asChild>
                <Link href="/auth/login">Login</Link>
              </Button>
              <Button size="sm" className="w-full" asChild>
                <Link href="/auth/signup">Sign Up</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </SheetContent>
  </Sheet>
);

// ============= TYPES =============
interface IMobileNav {
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
  user?: {
    name: string;
    email: string;
    role: string;
    avatar?: string;
  };
}