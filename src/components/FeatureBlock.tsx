import type { ReactNode } from "react";

type Props = {
  icon: ReactNode;
  title: string;
  description: ReactNode;
};

export function FeatureBlock({ icon, title, description }: Props) {
  return (
    <div className="group flex flex-col items-center gap-4 rounded-[28px] bg-[#fffdfd] p-8 text-center shadow-[0_1px_0_rgba(98,62,116,0.06),0_20px_40px_-30px_rgba(98,62,116,0.25)] ring-1 ring-border/60 transition hover:-translate-y-1 hover:shadow-[0_1px_0_rgba(98,62,116,0.06),0_30px_50px_-30px_rgba(98,62,116,0.35)]">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-rose-light/40 text-brand-rose">
        {icon}
      </div>
      <h3 className="text-xl text-brand-purple">{title}</h3>
      <p className="text-[15px] leading-relaxed text-brand-purple-light">{description}</p>
    </div>
  );
}
