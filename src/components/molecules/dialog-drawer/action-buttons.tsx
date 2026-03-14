"use client";

import * as React from "react";
import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { DialogDrawerAction, DialogDrawerClassNames } from "./types";

// ============= HELPER: ACTION BUTTONS =============

interface ActionButtonsProps {
    actions: DialogDrawerAction[];
    classNames?: DialogDrawerClassNames;
    loading?: boolean;
    isDrawer?: boolean;
    Close: React.ElementType;
}

export function ActionButtons({
    actions,
    classNames: cns,
    loading,
    isDrawer,
    Close,
}: ActionButtonsProps) {
    return (
        <>
            {actions.map((action, i) => {
                const Icon = action.icon;
                const isLast = i === actions.length - 1;
                const isLoading = loading && isLast ? true : action.loading;

                const btn = (
                    <Button
                        key={i}
                        type={action.type ?? "button"}
                        variant={action.variant ?? (isLast ? "default" : "outline")}
                        size={action.size}
                        disabled={action.disabled || isLoading}
                        onClick={action.onClick}
                        className={cn(isDrawer && "w-full", cns?.action, action.className)}
                    >
                        {isLoading ? (
                            <Loader2 className="mr-2 size-4 animate-spin" />
                        ) : (
                            Icon && <Icon className="mr-2 size-4" />
                        )}
                        {action.label}
                    </Button>
                );

                if (action.closeOnClick) {
                    return <Close key={i} asChild>{btn}</Close>;
                }

                return <React.Fragment key={i}>{btn}</React.Fragment>;
            })}
        </>
    );
}
