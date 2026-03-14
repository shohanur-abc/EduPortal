"use client";
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { useIsMobile } from '@/hooks/use-mobile';

export const DialogDrawer = ({ trigger, title, description, children, className, classNames: cns, closeOnOutsideClick = true, ...props }: ResponsiveDialogProps & React.ComponentPropsWithoutRef<typeof Dialog | typeof Drawer>) => {
    const isMobile = useIsMobile();

    const handleInteractOutside = (e: Event) => {
        if (!closeOnOutsideClick) {
            e.preventDefault();
        }
    };

    if (isMobile) {
        return (
            <Drawer {...props} >
                <DrawerTrigger asChild>{trigger}</DrawerTrigger>
                <DrawerContent className={cns?.container} >
                    {(title || description) &&
                        (<DrawerHeader className={cns?.header}>
                            {title && <DrawerTitle className={cns?.title}>{title}</DrawerTitle>}
                            {description && <DrawerDescription className={cns?.description}>{description}</DrawerDescription>}
                        </DrawerHeader>)}
                    <div className={cn("p-4", className)}>{children}</div>
                </DrawerContent>
            </Drawer>
        );

    }

    return (
        <Dialog {...props}>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent className={cns?.container} onInteractOutside={handleInteractOutside}>
                {(title || description) &&
                    (<DialogHeader className={cns?.header}>
                        {title && <DialogTitle className={cns?.title}>{title}</DialogTitle>}
                        {description && <DialogDescription className={cns?.description}>{description}</DialogDescription>}
                    </DialogHeader>)}
                <div className={className}>{children}</div>
            </DialogContent>
        </Dialog>
    );
};

interface ResponsiveDialogProps {
    trigger: React.ReactNode;
    title?: string;
    description?: string;
    children: React.ReactNode;
    className?: string;
    closeOnOutsideClick?: boolean;
    classNames?: {
        container?: string;
        header?: string;
        title?: string;
        description?: string;
    };
}
