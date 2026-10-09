import React from "react";
import Image from "next/image";

export function SvuLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      <Image
        src="/SV-logo.webp" unoptimized
        alt="Sri Venkateswara University emblem"
        width={64}
        height={64}
        priority
        className="h-14 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
      />
      <span className="max-w-[9rem] text-base font-black uppercase leading-tight tracking-tight text-gray-950 sm:max-w-none sm:text-lg font-[family-name:var(--font-heading)]">
        Sri Venkateswara University
      </span>
    </div>
  );
}

export function HandshakeLogo({ className = "h-8" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 font-bold tracking-tight select-none ${className}`}>
      {/* Handshake iconic red glyph: Two interconnected pill shapes with dots */}
      <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-[#eb1933] text-white shadow-sm transition-transform duration-200 hover:scale-105">
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <circle cx="8" cy="8" r="2.5" />
          <circle cx="16" cy="16" r="2.5" />
          <path d="M7 16a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-1Z" />
          <path d="M17 8a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V7a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v1Z" />
        </svg>
      </div>
      <span className="text-2xl font-black tracking-tight text-gray-950 font-[family-name:var(--font-heading)]">
        Handshake
      </span>
    </div>
  );
}

export function AmazonLogo({ className = "h-7" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 160 50" className="w-auto h-7" fill="none">
        {/* amazon text */}
        <text
          x="10"
          y="32"
          fontFamily="'Libre Baskerville', Georgia, serif"
          fontWeight="700"
          fontSize="30"
          fill="#111827"
          letterSpacing="-0.8px"
        >
          amazon
        </text>
        {/* Amazon smile arrow */}
        <path
          d="M 18 39 C 55 49, 100 47, 125 36"
          stroke="#FF9900"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 121 33 L 129 36 L 124 42 Z"
          fill="#FF9900"
        />
      </svg>
    </div>
  );
}

export function PwcLogo({ className = "h-9" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      {/* PwC colored geometric rectangles */}
      <div className="flex flex-col gap-0.5">
        <div className="flex gap-0.5">
          <div className="w-2.5 h-2.5 bg-[#EB8C00] rounded-xs"></div>
          <div className="w-2.5 h-2.5 bg-[#E0301E] rounded-xs"></div>
        </div>
        <div className="flex gap-0.5">
          <div className="w-2.5 h-2.5 bg-[#DC143C] rounded-xs"></div>
          <div className="w-2.5 h-2.5 bg-[#D04A02] rounded-xs"></div>
        </div>
      </div>
      <span className="text-2xl font-black tracking-tight text-gray-900 font-serif">
        pwc
      </span>
    </div>
  );
}

export function BoeingLogo({ className = "h-6" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      <svg viewBox="0 0 160 36" className="w-auto h-6" fill="none">
        {/* Symbol */}
        <circle cx="16" cy="18" r="13" stroke="#0039A6" strokeWidth="2.5" />
        <path
          d="M 6 18 Q 16 6, 26 18 Q 16 30, 6 18 Z"
          fill="#0039A6"
        />
        <circle cx="16" cy="18" r="3" fill="#ffffff" />
        {/* Boeing Wordmark */}
        <text
          x="38"
          y="25"
          fontFamily="'Arial Black', sans-serif"
          fontWeight="900"
          fontStyle="italic"
          fontSize="21"
          fill="#0039A6"
          letterSpacing="1px"
        >
          BOEING
        </text>
      </svg>
    </div>
  );
}

export function AirbnbLogo({ className = "h-8" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-1.5 ${className}`}>
      <svg viewBox="0 0 32 32" className="w-6 h-6 text-[#FF5A5F]" fill="currentColor">
        <path d="M16 1c-4.4 0-8 3.6-8 8 0 5.4 6.6 13.9 7.4 14.9.3.4.9.4 1.2 0 .8-1 7.4-9.5 7.4-14.9 0-4.4-3.6-8-8-8zm0 11c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3z" />
        <path d="M16 2.5C12.4 2.5 9.5 5.4 9.5 9c0 4.6 5.5 11.8 6.5 13.1 1-1.3 6.5-8.5 6.5-13.1 0-3.6-2.9-6.5-6.5-6.5zm0 8.5c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" opacity="0.3" />
      </svg>
      <span className="text-2xl font-bold tracking-tight text-[#FF5A5F]">
        airbnb
      </span>
    </div>
  );
}

export function PgLogo({ className = "h-8" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <span className="text-3xl font-extrabold italic tracking-wider text-[#003CAE] font-serif">
        P&amp;G
      </span>
    </div>
  );
}

export function MicrosoftLogo({ className = "h-7" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-2.5 ${className}`}>
      <div className="grid grid-cols-2 gap-0.5 w-5 h-5">
        <div className="w-2.2 h-2.2 bg-[#F25022]"></div>
        <div className="w-2.2 h-2.2 bg-[#7FBA00]"></div>
        <div className="w-2.2 h-2.2 bg-[#00A4EF]"></div>
        <div className="w-2.2 h-2.2 bg-[#FFB900]"></div>
      </div>
      <span className="text-xl font-semibold tracking-tight text-gray-600 font-sans">
        Microsoft
      </span>
    </div>
  );
}

export function StanfordLogo({ className = "h-8" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 text-[#8C1515] font-serif font-bold ${className}`}>
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
        <path d="M12 2L4 18h6v4h4v-4h6L12 2zm0 4.5l3.8 8.5h-7.6L12 6.5z" />
      </svg>
      <div className="leading-tight">
        <span className="block text-sm font-semibold uppercase tracking-widest">Stanford</span>
        <span className="block text-xs font-normal tracking-wide opacity-80">University</span>
      </div>
    </div>
  );
}

export function MichiganStateLogo({ className = "h-8" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 text-[#18453B] font-sans font-extrabold ${className}`}>
      {/* Spartan Helmet */}
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
        <path d="M12 2C7 2 4 5 4 10c0 4 2 7 5 8v3l3-2 3 2v-3c3-1 5-4 5-8 0-5-3-8-8-8zm0 3c3 0 5 2 5 5 0 2-1 4-3 5v-4H10v4c-2-1-3-3-3-5 0-3 2-5 5-5z" />
      </svg>
      <div className="leading-none text-left">
        <span className="block text-xs font-black tracking-wider uppercase">Michigan</span>
        <span className="block text-xs font-bold tracking-wider text-[#18453B]/80">State</span>
      </div>
    </div>
  );
}

export function JohnsHopkinsLogo({ className = "h-8" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 text-[#002D72] font-serif font-bold ${className}`}>
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
        <path d="M12 2L2 7v7c0 5.5 4.5 9.5 10 10 5.5-.5 10-4.5 10-10V7L12 2zm0 3.2L19 8v5.5c0 4.2-3.3 7.3-7 8-3.7-.7-7-3.8-7-8V8l7-2.8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
      <div className="leading-tight">
        <span className="block text-xs font-black uppercase tracking-wider">Johns Hopkins</span>
        <span className="block text-[10px] font-medium tracking-wide uppercase opacity-75">University</span>
      </div>
    </div>
  );
}

export function RitLogo({ className = "h-8" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <span className="text-2xl font-black tracking-tighter text-[#F76902] font-sans">
        R·I·T
      </span>
      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest leading-none">
        Rochester Inst.<br />of Tech
      </span>
    </div>
  );
}
