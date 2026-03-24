import {
    HoverCard as Root,
    HoverCardContent as Content,
    HoverCardTrigger as Trigger,
} from "@/components/ui/hover-card"

export function HoverCard({ children, trigger, open, defaultOpen, onOpenChange, openDelay, closeDelay, ...props }: HoverCardProps) {
    return (
        <Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange} openDelay={openDelay} closeDelay={closeDelay}>
            <Trigger asChild>{trigger}</Trigger>
            <Content {...props}>{children}</Content>
        </Root>
    )
}

// ============= TYPES =============
type HoverCardProps = React.ComponentPropsWithRef<typeof Content> & {
    trigger: React.ReactNode
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    openDelay?: number;
    closeDelay?: number;
}