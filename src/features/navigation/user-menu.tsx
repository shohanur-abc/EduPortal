'use client';

import Link from 'next/link';
import { ROUTES } from '@/lib/routes';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from '@/components/ui/dropdown-menu';
import { AvatarMolecule } from '@/components/molecules';
import { BadgeCheck, CreditCard, LogOut, Sparkles } from '@/lib/icon';
import { logout } from '@/services/auth';

// ============= MAIN COMPONENT =============
export default function UserMenu({ user }: IUserMenu) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg">
          <UserAvatar user={user} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="w-56 rounded-lg" sideOffset={4}>
        <UserInfo user={user} />
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href={ROUTES.dashboard.home} className="cursor-pointer">
              <Sparkles className="size-4" />
              <span>Dashboard</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={ROUTES.dashboard.profile} className="cursor-pointer">
              <BadgeCheck className="size-4" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={ROUTES.dashboard.settings} className="cursor-pointer">
              <CreditCard className="size-4" />
              <span>Settings</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <button
            onClick={async () => {
              try {
                await logout();
              } catch (error) {
                toast.error('Failed to logout');
                console.error(error);
              }
            }}
            className="w-full cursor-pointer flex items-center"
          >
            <LogOut className="size-4" />
            <span>Log out</span>
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// ============= CHILD COMPONENTS =============
const UserAvatar = ({ user }: { user: IUserMenu['user'] }) => (
  <AvatarMolecule src={user.avatar} alt={user.name} fallback={user.name.charAt(0).toUpperCase()} shape="square" className="h-8 w-8 hover:opacity-80 transition-opacity cursor-pointer" />
);

const UserInfo = ({ user }: { user: IUserMenu['user'] }) => (
  <DropdownMenuLabel className="p-0 font-normal">
    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
      <AvatarMolecule src={user.avatar} alt={user.name} fallback={user.name.charAt(0).toUpperCase()} shape="square" className="h-8 w-8" />
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-medium">{user.name}</span>
        <span className="truncate text-xs text-muted-foreground">{user.email}</span>
      </div>
    </div>
  </DropdownMenuLabel>
);

// ============= TYPES =============
interface IUserMenu {
  user: {
    name: string;
    email: string;
    role: string;
    avatar?: string;
  };
}
