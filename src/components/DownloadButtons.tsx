import type { ReactNode } from "react";

import { KitSubscribeForm } from "@/components/KitSubscribeForm";

type Props = {
  centered?: boolean;
  emailLabel?: string;
  emailPlaceholder?: string;
  submitLabel?: string;
  helperText?: ReactNode;
  helperTextClassName?: string;
};

const defaultHelperTextClassName =
  "mx-auto mt-4 max-w-xl text-lg leading-relaxed text-brand-purple-light";

export function DownloadButtons({
  centered = false,
  emailLabel,
  emailPlaceholder,
  submitLabel,
  helperText,
  helperTextClassName = defaultHelperTextClassName,
}: Props) {
  return (
    <div className={`w-full ${centered ? "mx-auto flex flex-col items-center" : ""}`}>
      <KitSubscribeForm
        emailLabel={emailLabel}
        emailPlaceholder={emailPlaceholder}
        submitLabel={submitLabel}
      />
      {helperText ? <p className={helperTextClassName}>{helperText}</p> : null}
    </div>
  );
}
