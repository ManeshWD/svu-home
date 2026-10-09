import Image from "next/image";

/* NAAC A+ seal for the navy headers. The seal's lettering is cut out
   (transparent), so a white disc sits behind the round seal to fill it.
   The seal is centred at ~(103, 98) with radius ~92 in the 207×192 artwork;
   the disc covers the lettering ring but stays inside the serrated edge. */
export default function NaacBadge({ className = "" }: { className?: string }) {
  return (
    // The shadow sits on the wrapper, not the image: a drop-shadow on the
    // image itself would bleed into the cut-out letters above the disc
    <span className={`relative inline-flex shrink-0 drop-shadow-[0_4px_12px_rgba(0,0,0,0.35)] ${className}`}>
      <span
        className="absolute left-1/2 top-[49%] aspect-square w-[79%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
        aria-hidden="true"
      />
      <Image
        src="/accreditation/naac-a-plus.webp"
        unoptimized
        alt="NAAC accredited with grade A+"
        width={207}
        height={192}
        className="relative h-full w-auto object-contain"
      />
    </span>
  );
}
