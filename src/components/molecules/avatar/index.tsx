"use client";

import * as React from "react";
import { User } from "lucide-react";

import {
    Avatar as BaseAvatar,
    AvatarImage,
    AvatarFallback,
    AvatarBadge,
    AvatarGroup as BaseAvatarGroup,
    AvatarGroupCount,
} from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { avatarStatusVariants, avatarShapeVariants } from "./variants";
import type { AvatarMoleculeProps, AvatarGroupProps, AvatarDef } from "./types";

export type { AvatarClassNames, AvatarGroupClassNames, AvatarDef, AvatarMoleculeProps, AvatarGroupProps, AvatarSize, AvatarShape } from "./types";
export { avatarStatusVariants, avatarShapeVariants } from "./variants";

// ============= SINGLE AVATAR =============

export function AvatarMolecule({
    src,
    alt,
    fallback,
    fallbackIcon: FallbackIcon,
    size = "default",
    shape = "circle",
    status,
    badge,
    badgeIcon: BadgeIcon,
    onClick,
    className,
    classNames: cns,
    children,
}: AvatarMoleculeProps) {
    const isInteractive = !!onClick;

    const FbIcon = FallbackIcon ?? User;

    return (
        <BaseAvatar
            size={size}
            className={cn(
                avatarShapeVariants({ shape }),
                isInteractive && "cursor-pointer",
                cns?.root,
                className
            )}
            onClick={onClick}
        >
            {children ?? (
                <>
                    {src && (
                        <AvatarImage
                            src={src}
                            alt={alt ?? fallback ?? "Avatar"}
                            className={cn(avatarShapeVariants({ shape }), cns?.image)}
                        />
                    )}
                    <AvatarFallback
                        className={cn(avatarShapeVariants({ shape }), cns?.fallback)}
                    >
                        {fallback ?? <FbIcon className="size-4" />}
                    </AvatarFallback>
                    {status && (
                        <span
                            data-slot="avatar-status"
                            className={cn(avatarStatusVariants({ status, size }))}
                        />
                    )}
                    {(badge || BadgeIcon) && (
                        <AvatarBadge className={cn(cns?.badge)}>
                            {BadgeIcon && <BadgeIcon />}
                            {badge}
                        </AvatarBadge>
                    )}
                </>
            )}
        </BaseAvatar>
    );
}

// ============= AVATAR GROUP =============

function renderAvatar(avatar: AvatarDef, index: number, groupSize?: AvatarMoleculeProps["size"], groupShape?: AvatarMoleculeProps["shape"], avatarClassName?: string) {
    return (
        <AvatarMolecule
            key={avatar.alt ?? avatar.fallback ?? index}
            size={groupSize ?? avatar.size}
            shape={groupShape ?? avatar.shape}
            {...avatar}
            className={cn(avatarClassName, avatar.className)}
        />
    );
}

export function AvatarGroupMolecule({
    avatars,
    max,
    size = "default",
    shape = "circle",
    className,
    classNames: cns,
}: AvatarGroupProps) {
    const visible = max ? avatars.slice(0, max) : avatars;
    const overflow = max ? avatars.length - max : 0;

    return (
        <BaseAvatarGroup className={cn(cns?.root, className)}>
            {visible.map((avatar, i) =>
                renderAvatar(avatar, i, size, shape, cns?.avatar)
            )}
            {overflow > 0 && (
                <AvatarGroupCount className={cn(cns?.overflow)}>
                    +{overflow}
                </AvatarGroupCount>
            )}
        </BaseAvatarGroup>
    );
}
