"use client";

const stroke = {
  fill: "none",
  stroke: "#001546",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/** Line-art graduation cap, in the illustration style of the design. */
function GradCap({
  rotate = 0,
  className = "",
}: {
  rotate?: number;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 80 70"
      className={className}
      style={{ transform: `rotate(${rotate}deg)` }}
      aria-hidden="true"
    >
      <g {...stroke}>
        {/* mortarboard */}
        <path d="M40 8 L74 22 L40 36 L6 22 Z" fill="#FFB21A" fillOpacity="0.85" />
        {/* head band */}
        <path d="M20 28 L20 48 C20 55 30 60 40 60 C50 60 60 55 60 48 L60 28" />
        {/* tassel */}
        <path d="M70 24 L70 44" />
        <path d="M66 44 C66 50 74 50 74 44 Z" fill="#D23F12" fillOpacity="0.85" />
      </g>
    </svg>
  );
}

/** Line-art open book. */
function Book({
  rotate = 0,
  className = "",
}: {
  rotate?: number;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 80 60"
      className={className}
      style={{ transform: `rotate(${rotate}deg)` }}
      aria-hidden="true"
    >
      <g {...stroke}>
        <path
          d="M40 16 C32 8 18 8 8 12 L8 48 C18 44 32 44 40 52 C48 44 62 44 72 48 L72 12 C62 8 48 8 40 16 Z"
          fill="#FFB21A"
          fillOpacity="0.85"
        />
        <path d="M40 16 L40 52" />
      </g>
    </svg>
  );
}

/** Line-art column / campus pillar. */
function Pillar({
  rotate = 0,
  className = "",
}: {
  rotate?: number;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 50 120"
      className={className}
      style={{ transform: `rotate(${rotate}deg)` }}
      aria-hidden="true"
    >
      <g {...stroke}>
        <path d="M6 16 L44 16 L44 24 L6 24 Z" fill="#D23F12" fillOpacity="0.85" />
        <path d="M13 24 L13 100 M25 24 L25 100 M37 24 L37 100" />
        <path d="M4 100 L46 100 L46 110 L4 110 Z" />
      </g>
    </svg>
  );
}

function CampusCluster({ mirrored = false }: { mirrored?: boolean }) {
  return (
    <div
      className="relative h-[70px] w-[76px] shrink-0 sm:h-[95px] sm:w-[105px] lg:h-[120px] lg:w-[130px]"
      style={mirrored ? { transform: "scaleX(-1)" } : undefined}
    >
      <Pillar rotate={-8} className="absolute bottom-0 left-0 h-[88%] w-[38%]" />
      <GradCap rotate={-10} className="absolute left-[28%] top-0 h-[52%] w-[62%]" />
      <Book rotate={6} className="absolute bottom-0 right-0 h-[42%] w-[58%]" />
    </div>
  );
}

export default function CtaBanner() {
  return (
    <section className="relative bg-[#FFF9EE]">
      {/* Dark band the card overlaps, continuing into the footer */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[#001546]" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-6 pt-6 sm:pt-10 lg:px-12">
        <div className="mx-auto max-w-4xl bg-[#FFE9C2] rounded-3xl border border-[#001546]/10 shadow-xl px-4 py-[clamp(1.5rem,5vh,3rem)] text-center sm:px-12">
          <span className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-[#D23F12] mb-2">
            Admissions Open
          </span>
          <h2 className="font-serif text-[clamp(1.35rem,3.6vw,2.5rem)] font-black leading-tight tracking-tight text-[#001546]">
            Begin your journey at SV University
          </h2>

          <div className="mt-5 flex items-end justify-center gap-3 sm:mt-8 sm:gap-8">
            <CampusCluster />

            <div className="group relative mb-3 shrink-0 cursor-pointer sm:mb-6">
              {/* offset shadow block — drifts further back on hover, like the hero CTA */}
              <span
                className="pointer-events-none absolute inset-0 translate-x-[6px] translate-y-[6px] border-2 border-[#001546] transition-transform duration-200 group-hover:translate-x-[10px] group-hover:translate-y-[10px]"
                aria-hidden="true"
              />
              <a
                href="#admissions"
                className="relative z-10 block bg-[#FFB21A] hover:bg-[#ffc247] px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#001546] transition-all duration-200 active:translate-x-[3px] active:translate-y-[3px] sm:px-8 sm:py-4 sm:text-xs shadow-md"
              >
                Apply Now
              </a>
            </div>

            <CampusCluster mirrored />
          </div>
        </div>
      </div>
    </section>
  );
}
