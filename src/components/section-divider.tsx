export function SectionDivider({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex items-center justify-center gap-4 py-2 ${className}`}
      aria-hidden="true"
    >
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-gold/70 sm:w-28" />
      <svg
        width="46"
        height="22"
        viewBox="0 0 46 22"
        fill="none"
        className="text-gold"
      >
        {/* Stylized Jagannath-inspired temple/eye motif */}
        <path
          d="M23 1c4 6 9 9 14 10-5 1-10 4-14 10-4-6-9-9-14-10 5-1 10-4 14-10Z"
          stroke="currentColor"
          strokeWidth="1"
          fill="currentColor"
          fillOpacity="0.12"
        />
        <circle cx="23" cy="11" r="2.4" fill="currentColor" />
      </svg>
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-gold/70 sm:w-28" />
    </div>
  );
}
