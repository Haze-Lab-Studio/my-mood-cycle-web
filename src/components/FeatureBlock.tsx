import type { ReactNode } from "react";

type Props = {
  icon: ReactNode;
  title: string;
  description: string;
};

export function FeatureBlock({ icon, title, description }: Props) {
  return (
    <div className="flex flex-col items-start gap-4">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-rose-light/40 text-brand-rose">
        {icon}
      </div>
      <h3 className="text-xl text-brand-purple">{title}</h3>
      <p className="text-[15px] leading-relaxed text-brand-purple-light">{description}</p>
    </div>
  );
}
