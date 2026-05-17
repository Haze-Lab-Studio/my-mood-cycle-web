export function DownloadButtons({ centered = false }: { centered?: boolean }) {
  return (
    <div className={`flex flex-col gap-3 sm:flex-row ${centered ? "sm:justify-center" : ""}`}>
      <a
        href="#"
        className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-rose px-6 py-3.5 text-sm font-medium text-white shadow-sm transition hover:bg-brand-rose/90"
      >
        Download on iOS
      </a>
      <a
        href="#"
        className="inline-flex items-center justify-center gap-2 rounded-full border border-brand-purple/30 bg-transparent px-6 py-3.5 text-sm font-medium text-brand-purple transition hover:bg-brand-purple/5"
      >
        Download on Android
      </a>
    </div>
  );
}
