type Props = {
  className?: string;
  /** Visual size — `hero` matches the homepage mark; `sm` fits buttons. */
  size?: "sm" | "md" | "hero";
  label?: string;
};

const sizeClassName: Record<NonNullable<Props["size"]>, string> = {
  sm: "h-7 w-12",
  md: "h-10 w-[4.5rem]",
  hero: "mx-auto mt-14 w-full max-w-[420px] animate-float-slow",
};

export function WaveLoader({ className = "", size = "md", label = "Loading" }: Props) {
  return (
    <svg
      viewBox="0 0 384 218"
      role="img"
      aria-label={label}
      className={`${sizeClassName[size]} text-[#DB7094] ${className}`.trim()}
    >
      <path
        className="app-icon-wave"
        d="M3.001 108.78C60.525 -32.26 118.049 -32.26 175.573 108.78C233.097 249.82 290.621 249.82 348.146 108.78"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />
      <circle className="app-icon-dot" cx="348.146" cy="108.78" r="35.26" fill="currentColor" />
    </svg>
  );
}
