import { ArrowRight } from '@/lib/icon';
import { Button } from "@/components/molecules";
import { Section } from '@/components/section';

// ============= MAIN COMPONENT =============
export default function CTA({ title, description, primaryCta, secondaryCta }: ICTA) {
  return (
    <Section>
      <div className="rounded-2xl bg-muted/60  px-8 py-16 @lg:px-16 @lg:py-20 text-center space-y-6">
        <Title text={title} />
        <Description text={description} />
        <Actions primary={primaryCta} secondary={secondaryCta} />
      </div>
    </Section>
  );
}

// ============= CHILD COMPONENTS =============
const Title = ({ text }: { text: string }) => (
  <h2 className="text-3xl @sm:text-4xl @lg:text-5xl font-bold tracking-tight text-primary-foreground">
    {text}
  </h2>
);

const Description = ({ text }: { text: string }) => (
  <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto leading-relaxed">
    {text}
  </p>
);

const Actions = ({
  primary,
  secondary,
}: {
  primary: ICTAAction;
  secondary?: ICTAAction;
}) => (
  <div className="flex flex-col @sm:flex-row items-center justify-center gap-4 pt-2">
    <Button size="lg" variant="secondary" className="rounded-full px-8" href={primary.href} rightIcon={<ArrowRight className="size-4" />}>
      {primary.text}
    </Button>
    {secondary && (
      <Button size="lg" className="rounded-full shadow-lg px-8 border-primary-foreground/30 text-primary-foreground hover:text-white hover:bg-black/20 transition-all duration-300" href={secondary.href}>{secondary.text}      </Button>
    )}
  </div>
);

// ============= TYPES =============
interface ICTAAction {
  text: string;
  href: string;
}

interface ICTA {
  title: string;
  description: string;
  primaryCta: ICTAAction;
  secondaryCta?: ICTAAction;
}
