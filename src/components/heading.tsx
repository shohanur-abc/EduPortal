import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { Badge } from "./ui/badge";

// ============= MAIN COMPONENT =============

export default function Heading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: HeadingProps) {
  return (
    <div className={cn("mb-12 space-y-3", className)}>
      {eyebrow && <EyebrowText align={align}>{eyebrow}</EyebrowText>}
      <TitleText align={align}>{title}</TitleText>
      {subtitle && <SubtitleText align={align}>{subtitle}</SubtitleText>}
    </div>
  );
}

// ============= CHILD COMPONENTS =============

const EyebrowText = ({ children, align }: OthersProps) => (
  <Badge variant='ghost' className={cn(eyebrowVariants({ align }))}>{children}</Badge>
);

const TitleText = ({ children, align }: OthersProps) => (
  <h2 className={cn(titleVariants({ align }))}>{children}</h2>
);

const SubtitleText = ({ children, align }: OthersProps) => (
  <p className={cn(subtitleVariants({ align }))}>{children}</p>
);

// ============= VARIANTS =============

const eyebrowVariants = cva(
  "text-sm font-semibold  tracking-widest text-primary border-input block",
  {
    variants: {
      align: {
        left: "mr-auto",
        center: "mx-auto",
        right: "ml-auto",
      },
    },
    defaultVariants: { align: "center" },
  }
);

const titleVariants = cva(
  "text-3xl @lg:text-4xl @4xl:text-5xl font-bold tracking-tight text-foreground",
  {
    variants: {
      align: {
        left: "text-left",
        center: "text-center",
        right: "text-right",
      },
    },
    defaultVariants: { align: "center" },
  }
);

const subtitleVariants = cva(
  "mx-auto text-base text-muted-foreground @lg:text-lg",
  {
    variants: {
      align: {
        left: "text-left mx-0",
        center: "text-center",
        right: "text-right ml-auto mr-0",
      },
    },
    defaultVariants: { align: "center" },
  }
);

// ============= TYPES =============
type HeadingProps = VariantProps<typeof titleVariants> & {
  eyebrow?: ReactNode;
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  className?: string;
};

interface OthersProps {
  children: ReactNode;
  align: HeadingProps["align"];
}
