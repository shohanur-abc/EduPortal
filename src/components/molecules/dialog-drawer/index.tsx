"use client";

import * as React from "react";
import { Loader2 } from "@/lib/icon";

import { cn } from "@/lib/utils";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger, } from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import { ActionButtons } from "./action-buttons";
import { textAlign, alignItems, justifyContent, iconSize } from "./constants";
import type { DialogDrawerProps } from "./types";

export type { DialogDrawerAction, DialogDrawerClassNames, DialogDrawerProps } from "./types";

// ============= MAIN COMPONENT =============

export const DialogDrawer = ({
    trigger,
    title,
    description,
    align = "left",
    children,
    footer,
    actions,
    icon: Icon,
    open,
    onOpenChange,
    defaultOpen,
    className,
    classNames: cns,
    closeOnOutsideClick = true,
    loading = false,
    scrollable = false,
    showCloseButton = true,
    drawerDirection = "bottom",
    forceMode,
    modal,
}: DialogDrawerProps) => {
    const isMobileDetected = useIsMobile();
    const isMobile =
        forceMode === "drawer" ? true
            : forceMode === "dialog" ? false
                : isMobileDetected;

    // ── Pick primitives based on mode ────────────────────────────────────
    const Root = isMobile ? Drawer : Dialog;
    const Trigger = isMobile ? DrawerTrigger : DialogTrigger;
    const Content = isMobile ? DrawerContent : DialogContent;
    const Header = isMobile ? DrawerHeader : DialogHeader;
    const Title = isMobile ? DrawerTitle : DialogTitle;
    const Desc = isMobile ? DrawerDescription : DialogDescription;
    const Footer = isMobile ? DrawerFooter : DialogFooter;
    const Close = isMobile ? DrawerClose : DialogClose;

    const hasHeader = !!(title || description || Icon);
    const hasFooter = !!(footer || actions?.length);

    const rootProps = isMobile
        ? { open, onOpenChange, defaultOpen, modal, direction: drawerDirection }
        : { open, onOpenChange, defaultOpen, modal };

    const contentProps = isMobile
        ? { className: cn(cns?.container) }
        : {
            showCloseButton,
            className: cns?.container,
            onInteractOutside: (e: Event) => { if (!closeOnOutsideClick) e.preventDefault(); },
        };

    return (
        <Root {...rootProps}>
            {trigger && <Trigger asChild>{trigger}</Trigger>}
            <Content {...contentProps}>
                {loading && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center rounded-xl bg-background/60 backdrop-blur-xs">
                        <Loader2 className="size-6 animate-spin text-muted-foreground" />
                    </div>
                )}
                {hasHeader && (
                    <Header className={cn(cns?.header)}>
                        <div className={cn("flex gap-3 items-center", alignItems[align])}>
                            {Icon && (
                                <div className={cn("flex items-center justify-center rounded-full bg-muted", iconSize[align], cns?.icon)}>
                                    <Icon className="text-foreground" />
                                </div>
                            )}
                            {title && <Title className={cn(textAlign[align], cns?.title)}>{title}</Title>}
                        </div>
                        {description && <Desc className={cn(textAlign[align], cns?.description)}>{description}</Desc>}
                    </Header>
                )}
                <div className={cn(
                    isMobile ? "px-4" : "",
                    scrollable && (isMobile ? "max-h-[50vh]" : "max-h-[60vh] pr-1 scrollbar-thin"),
                    scrollable && "overflow-y-auto",
                    cns?.body,
                    textAlign[align],
                    className,
                )}>
                    {children}
                </div>
                {hasFooter && (
                    <Footer className={cn(justifyContent[align], "bg-transparent border-transparent m-0 p-0", cns?.footer)}>
                        {footer ?? (
                            <ActionButtons actions={actions!} classNames={cns} loading={loading} isDrawer={isMobile} Close={Close} />
                        )}
                    </Footer>
                )}
            </Content>
        </Root>
    );
};
