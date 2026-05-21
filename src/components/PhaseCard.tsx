type Props = {
  phase: string;
  emoji: string;
  tagline: string;
  description: string;
  color: string;
};

export function PhaseCard({ phase, emoji, tagline, description, color }: Props) {
  return (
    <article className="group flex h-full min-w-[260px] flex-col rounded-3xl border border-[rgba(111,70,140,0.08)] bg-cream p-7 shadow-[0_1px_0_rgba(98,62,116,0.06),0_20px_40px_-30px_rgba(98,62,116,0.25)] transition-all duration-[250ms] ease hover:-translate-y-1 hover:border-[rgba(111,70,140,0.12)] hover:shadow-[0_12px_30px_rgba(111,70,140,0.08)]">
      <div className="flex items-center gap-3">
        <span
          aria-hidden
          className="inline-block h-2.5 w-10 rounded-full"
          style={{ backgroundColor: color }}
        />
        <span className="text-2xl" aria-hidden>
          {emoji}
        </span>
      </div>
      <h3 className="mt-5 text-2xl text-brand-purple">{phase}</h3>
      <p className="mt-2 font-display text-lg italic" style={{ color }}>
        {tagline}
      </p>
      <p className="mt-4 text-[15px] leading-relaxed text-brand-purple-light">{description}</p>
    </article>
  );
}
