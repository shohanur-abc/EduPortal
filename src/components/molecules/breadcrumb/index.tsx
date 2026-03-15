"use client";

import * as React from "react";
import Link from "next/link";

import {
    Breadcrumb as BreadcrumbRoot,
    BreadcrumbList,
    BreadcrumbItem as BreadcrumbItemPrimitive,
    BreadcrumbLink,
    BreadcrumbPage,
    BreadcrumbSeparator,
    BreadcrumbEllipsis,
} from "@/components/ui/breadcrumb";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import type { BreadcrumbProps, BreadcrumbItemType } from "./types";

export type { BreadcrumbClassNames, BreadcrumbItemType, BreadcrumbProps } from "./types";
export { breadcrumbLinkVariants } from "./variants";

// ============= ITEM RENDERER =============

function BreadcrumbItemRenderer({
    item,
    isLast,
    classNames: cns,
}: {
    item: BreadcrumbItemType;
    isLast: boolean;
    classNames?: BreadcrumbProps["classNames"];
}) {
    const Icon = item.icon;

    if (isLast || !item.href) {
        return (
            <BreadcrumbItemPrimitive className={cn(cns?.item, item.className)}>
                <BreadcrumbPage className={cn(cns?.page)}>
                    {Icon && <Icon className="mr-1 inline size-3.5" />}
                    {item.label}
                </BreadcrumbPage>
            </BreadcrumbItemPrimitive>
        );
    }

    return (
        <BreadcrumbItemPrimitive className={cn(cns?.item, item.className)}>
            <BreadcrumbLink asChild className={cn(item.disabled && "pointer-events-none opacity-50", cns?.link)}>
                <Link href={item.href}>
                    {Icon && <Icon className="mr-1 inline size-3.5" />}
                    {item.label}
                </Link>
            </BreadcrumbLink>
        </BreadcrumbItemPrimitive>
    );
}

// ============= MAIN COMPONENT =============

export function BreadcrumbMolecule({
    items,
    separator,
    maxItems,
    itemsBeforeCollapse = 1,
    itemsAfterCollapse = 1,
    onEllipsisClick,
    ellipsisItems,
    className,
    classNames: cns,
}: BreadcrumbProps) {
    const shouldCollapse = maxItems !== undefined && items.length > maxItems;

    let visibleItems: BreadcrumbItemType[];
    let collapsedItems: BreadcrumbItemType[] = [];

    if (shouldCollapse) {
        const startItems = items.slice(0, itemsBeforeCollapse);
        const endItems = items.slice(items.length - itemsAfterCollapse);
        collapsedItems = ellipsisItems ?? items.slice(itemsBeforeCollapse, items.length - itemsAfterCollapse);
        visibleItems = [...startItems, ...endItems];
    } else {
        visibleItems = items;
    }

    const renderSeparator = (key: string) => (
        <BreadcrumbSeparator key={key} className={cn(cns?.separator)}>
            {separator}
        </BreadcrumbSeparator>
    );

    return (
        <BreadcrumbRoot className={cn(cns?.root, className)}>
            <BreadcrumbList className={cn(cns?.list)}>
                {shouldCollapse ? (
                    <>
                        {/* Start items */}
                        {visibleItems.slice(0, itemsBeforeCollapse).map((item, i) => (
                            <React.Fragment key={`start-${i}`}>
                                <BreadcrumbItemRenderer
                                    item={item}
                                    isLast={false}
                                    classNames={cns}
                                />
                                {renderSeparator(`sep-start-${i}`)}
                            </React.Fragment>
                        ))}
                        {/* Ellipsis */}
                        <BreadcrumbItemPrimitive>
                            {collapsedItems.length > 0 ? (
                                <DropdownMenu>
                                    <DropdownMenuTrigger
                                        className="flex items-center gap-1"
                                        onClick={onEllipsisClick}
                                    >
                                        <BreadcrumbEllipsis className={cn(cns?.ellipsis)} />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="start">
                                        {collapsedItems.map((ci, idx) => (
                                            <DropdownMenuItem key={idx} asChild={!!ci.href}>
                                                {ci.href ? (
                                                    <Link href={ci.href}>
                                                        {ci.icon && <ci.icon className="mr-2 size-4" />}
                                                        {ci.label}
                                                    </Link>
                                                ) : (
                                                    <span>
                                                        {ci.icon && <ci.icon className="mr-2 size-4" />}
                                                        {ci.label}
                                                    </span>
                                                )}
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            ) : (
                                <BreadcrumbEllipsis className={cn(cns?.ellipsis)} onClick={onEllipsisClick} />
                            )}
                        </BreadcrumbItemPrimitive>
                        {renderSeparator("sep-ellipsis")}
                        {/* End items */}
                        {visibleItems.slice(itemsBeforeCollapse).map((item, i) => {
                            const isLast = i === visibleItems.length - itemsBeforeCollapse - 1;
                            return (
                                <React.Fragment key={`end-${i}`}>
                                    <BreadcrumbItemRenderer
                                        item={item}
                                        isLast={isLast}
                                        classNames={cns}
                                    />
                                    {!isLast && renderSeparator(`sep-end-${i}`)}
                                </React.Fragment>
                            );
                        })}
                    </>
                ) : (
                    visibleItems.map((item, i) => {
                        const isLast = i === visibleItems.length - 1;
                        return (
                            <React.Fragment key={i}>
                                <BreadcrumbItemRenderer
                                    item={item}
                                    isLast={isLast}
                                    classNames={cns}
                                />
                                {!isLast && renderSeparator(`sep-${i}`)}
                            </React.Fragment>
                        );
                    })
                )}
            </BreadcrumbList>
        </BreadcrumbRoot>
    );
}
