import type * as React from "react";
import type { LucideIcon } from "lucide-react";

// ============= TYPES =============

export interface AvatarClassNames {
    root?: string;
    image?: string;
    fallback?: string;
    badge?: string;
}

export interface AvatarGroupClassNames {
    root?: string;
    avatar?: string;
    overflow?: string;
}

export type AvatarSize = "sm" | "default" | "lg";
export type AvatarShape = "circle" | "square";

export interface AvatarDef {
    /** Image source URL */
    src?: string;
    /** Alt text for the image */
    alt?: string;
    /** Fallback text (e.g. initials) */
    fallback?: string;
    /** Fallback icon */
    fallbackIcon?: LucideIcon;
    /** Avatar size */
    size?: AvatarSize;
    /** Avatar shape */
    shape?: AvatarShape;
    /** Status badge color */
    status?: "online" | "offline" | "busy" | "away";
    /** Custom badge content */
    badge?: React.ReactNode;
    /** Badge icon (renders inside badge) */
    badgeIcon?: LucideIcon;
    /** Click handler */
    onClick?: () => void;
    /** Additional className */
    className?: string;
    /** ClassNames for internal elements */
    classNames?: AvatarClassNames;
}

export interface AvatarMoleculeProps extends AvatarDef {
    /** Children override */
    children?: React.ReactNode;
}

// --- Avatar Group ---

export interface AvatarGroupProps {
    /** Array of avatar definitions */
    avatars: AvatarDef[];
    /** Maximum visible avatars */
    max?: number;
    /** Avatar size for all avatars */
    size?: AvatarSize;
    /** Avatar shape for all avatars */
    shape?: AvatarShape;
    /** Additional className */
    className?: string;
    /** ClassNames for internal elements */
    classNames?: AvatarGroupClassNames;
}
