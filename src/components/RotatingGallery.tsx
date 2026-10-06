/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, X, ExternalLink } from "lucide-react";
import SquishyButton from "./SquishyButton";

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  photoCount: number;
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    title: "Inter-Collegiate Cricket Derby",
    category: "Sports & Athletics",
    image: "/moments/cricket_ground.webp",
    description: "Varsity cricket championship tournament on the lush green campus sports grounds under golden hour sunlight.",
    photoCount: 42,
  },
  {
    id: 2,
    title: "Tarangini Classical & Folk Dance",
    category: "Dance & Culture",
    image: "/moments/cultural_dance.webp",
    description: "Energetic South Indian classical fusion and folk dance performance with ghungroos on the university auditorium stage.",
    photoCount: 56,
  },
  {
    id: 3,
    title: "National Research Symposium Keynote",
    category: "Stage Presentations",
    image: "/moments/stage_presentation.webp",
    description: "Student scholar delivering an inspiring keynote presentation on stage in the university conference hall.",
    photoCount: 38,
  },
  {
    id: 4,
    title: "Swarotsav Live Stage Concert",
    category: "Music & Singing",
    image: "/moments/music_singing.webp",
    description: "Electrifying vocal performance with acoustic guitars and band at the annual university concert night.",
    photoCount: 64,
  },
  {
    id: 5,
    title: "Srinivasa Auditorium Plenary",
    category: "Auditorium & Events",
    image: "/moments/auditorium_symposium.webp",
    description: "A packed grand university auditorium of engaged Indian students applauding and celebrating academic milestones.",
    photoCount: 75,
  },
  {
    id: 6,
    title: "Cultural Festival & Floral Rangoli",
    category: "Cultural Activities",
    image: "/moments/cultural_rangoli.webp",
    description: "Students in traditional festive silk kurtas and sarees crafting an intricate flower petal rangoli mandala.",
    photoCount: 48,
  },
  {
    id: 7,
    title: "Varsity Football Cup Finals",
    category: "Sports Arena",
    image: "/moments/football_ground.webp",
    description: "High-octane collegiate soccer tournament and athletic action on the university championship grounds.",
    photoCount: 34,
  },
  {
    id: 8,
    title: "Heritage Campus Lawn Circles",
    category: "Campus Life",
    image: "/moments/campus_lawn.webp",
    description: "Scholars collaborating on laptops, sharing notes, and enjoying discussions under ancient banyan trees.",
    photoCount: 50,
  },
  {
    id: 9,
    title: "Rangasthalam Drama & Theater",
    category: "Dramatic Arts",
    image: "/moments/drama_theater.webp",
    description: "Indian college students performing a gripping dramatic play on the university auditorium stage.",
    photoCount: 40,
  },
  {
    id: 10,
    title: "71st Annual Convocation Cheers",
    category: "Celebrations",
    image: "/moments/convocation_celebration.webp",
    description: "Ecstatic graduates throwing mortarboard caps into the sunny sky on the historic university lawns.",
    photoCount: 88,
  },
  {
    id: 11,
    title: "Championship Cricket League",
    category: "Sports & Athletics",
    image: "/moments/cricket_ground.webp",
    description: "Action-packed cricket league matches played by collegiate teams on the university sports turf.",
    photoCount: 35,
  },
  {
    id: 12,
    title: "Youth Fest Classical Ensemble",
    category: "Dance & Culture",
    image: "/moments/cultural_dance.webp",
    description: "Graceful mudras and rhythmic footwork in festive silk attire lighting up the auditorium stage.",
    photoCount: 44,
  },
  {
    id: 13,
    title: "Young Innovators Colloquium",
    category: "Stage Presentations",
    image: "/moments/stage_presentation.webp",
    description: "Defending renewable energy and scientific discoveries before an auditorium full of peers and professors.",
    photoCount: 31,
  },
  {
    id: 14,
    title: "Campus Band & Acoustic Vocals",
    category: "Music & Singing",
    image: "/moments/music_singing.webp",
    description: "Vibrant musical renditions and acoustic melodies reverberating through the university auditorium.",
    photoCount: 52,
  },
  {
    id: 15,
    title: "Student Assembly & Keynotes",
    category: "Auditorium & Events",
    image: "/moments/auditorium_symposium.webp",
    description: "Inspiring talks and award ceremonies in the multi-tiered university auditorium hall.",
    photoCount: 68,
  },
  {
    id: 16,
    title: "Traditional Festivities & Diyas",
    category: "Cultural Activities",
    image: "/moments/cultural_rangoli.webp",
    description: "Joyful celebrations of art, culture, and unity with traditional marigold and rose petal decorations.",
    photoCount: 46,
  },
  {
    id: 17,
    title: "Campus League Football Clash",
    category: "Sports Arena",
    image: "/moments/football_ground.webp",
    description: "Dynamic athletic action and goal-scoring excitement on the university sports turf.",
    photoCount: 38,
  },
  {
    id: 18,
    title: "Open-Air Peer Discussions",
    category: "Campus Life",
    image: "/moments/campus_lawn.webp",
    description: "Engaging group studies, sharing notes, and campus camaraderie on the green lawns.",
    photoCount: 45,
  },
  {
    id: 19,
    title: "Annual Theater Production",
    category: "Dramatic Arts",
    image: "/moments/drama_theater.webp",
    description: "Powerful emotional performances and student acting excellence under the theater spotlights.",
    photoCount: 36,
  },
  {
    id: 20,
    title: "Graduation Cap Toss Moment",
    category: "Celebrations",
    image: "/moments/convocation_celebration.webp",
    description: "Unforgettable memories of graduation day as caps soar high above the iconic university quad.",
    photoCount: 72,
  },
];

/* -------------------------------------------------------------------------
   Section copy — mirrors the ACF defaults of the EduGulf orbit gallery
   ------------------------------------------------------------------------- */
const GALLERY_EYEBROW = "MEDIA & LIFE";
const GALLERY_TITLE = "Capturing SVU Moments";
const GALLERY_SUBTITLE =
  "Sports tournaments, dance recitals, stage keynotes, live concerts, and vibrant Indian campus culture.";
const GALLERY_CTA_TEXT = "View Full Gallery";

/** EduGulf repeats the gallery items until the ring holds exactly 22 cards. */
const ORBIT_COUNT = 22;
const orbitItems: GalleryItem[] = (() => {
  if (galleryItems.length === 0) return [];
  const out: GalleryItem[] = [];
  while (out.length < ORBIT_COUNT) out.push(...galleryItems);
  return out.slice(0, ORBIT_COUNT);
})();


function slotClass(diff: number): string {
  if (diff === 0) return "is-active";
  if (diff === -1) return "is-prev";
  if (diff === 1) return "is-next";
  if (diff === -2) return "is-prev-2";
  if (diff === 2) return "is-next-2";
  return "";
}

export default function RotatingGallery() {
  const [selectedGallery, setSelectedGallery] = useState<GalleryItem | null>(null);

  /* ------------------------------ Mobile cover-flow carousel (initGalleryCoverflow) */
  const [active, setActive] = useState(() => Math.floor(orbitItems.length / 2));
  const touchStartX = useRef<number | null>(null);

  const go = useCallback((dir: number) => {
    setActive((prev) => (prev + dir + orbitItems.length) % orbitItems.length);
  }, []);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
    touchStartX.current = null;
  };

  /* ------------------------------ Lightbox: close on Escape */
  useEffect(() => {
    if (!selectedGallery) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedGallery(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedGallery]);

  return (
    <section className="section section-gallery-orbit" id="gallery">
      <div className="gallery-orbit-glow" aria-hidden="true" />

      <div className="gallery-orbit-container">
        <div className="orbit-stage">

          {/* Rotating Orbit Circle Track */}
          <div className="orbit-ring" aria-label="SVU Rotating Gallery">
            {orbitItems.map((item, idx) => {
              const angle = Math.round((idx / orbitItems.length) * 360 * 100) / 100;
              return (
                <div
                  key={`orbit-${idx}`}
                  className="orbit-item"
                  style={{ ["--angle" as string]: `${angle}deg` } as React.CSSProperties}
                >
                  <div className="orbit-card-facer">
                    <div className="orbit-card-spinner">
                      <div
                        className="orbit-card"
                        tabIndex={0}
                        role="button"
                        aria-label={item.title}
                        onClick={() => setSelectedGallery(item)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            setSelectedGallery(item);
                          }
                        }}
                      >
                        <img src={item.image} alt={item.title} loading="lazy" />
                        <div className="orbit-card-tag" aria-hidden="true">
                          <span className="tag-title">{item.title}</span>
                          <span className="tag-sub">{item.category}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Center Content Hub */}
          <div className="orbit-center-hub">
            <span className="section-eyebrow">{GALLERY_EYEBROW}</span>
            <h2 className="orbit-hub-title">{GALLERY_TITLE}</h2>
            <div className="orbit-hub-desc">
              <p>{GALLERY_SUBTITLE}</p>
            </div>
            <div className="orbit-hub-cta">
              <SquishyButton onClick={() => setSelectedGallery(galleryItems[0])}>
                {GALLERY_CTA_TEXT}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </SquishyButton>
            </div>
          </div>

        </div>

        {/* Mobile-only cover-flow carousel */}
        <div className="gallery-coverflow" aria-roledescription="carousel">
          <div className="gallery-coverflow-head">
            <span className="section-eyebrow">{GALLERY_EYEBROW}</span>
            <h2 className="gallery-coverflow-title">{GALLERY_TITLE}</h2>
            <SquishyButton onClick={() => setSelectedGallery(galleryItems[0])}>
              {GALLERY_CTA_TEXT}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </SquishyButton>
          </div>

          <div className="cf-stage" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
            <div className="cf-track">
              {orbitItems.map((item, idx) => {
                const diff = idx - active;
                const cls = slotClass(diff);
                return (
                  <button
                    key={`cf-${idx}`}
                    type="button"
                    className={`cf-card ${cls}`.trim()}
                    aria-label={item.title}
                    aria-hidden={diff !== 0}
                    tabIndex={Math.abs(diff) <= 2 ? 0 : -1}
                    onClick={() => {
                      if (idx !== active) setActive(idx);
                      else setSelectedGallery(item);
                    }}
                  >
                    <img src={item.image} alt={item.title} loading="lazy" />
                    <span className="cf-card-caption">
                      <span className="cf-cap-title">{item.title}</span>
                      <span className="cf-cap-sub">{item.category}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="cf-controls">
            <button type="button" className="cf-nav cf-prev" aria-label="Previous image" onClick={() => go(-1)}>
              <ArrowRight aria-hidden="true" />
            </button>
            <button type="button" className="cf-nav cf-next" aria-label="Next image" onClick={() => go(1)}>
              <ArrowRight aria-hidden="true" />
            </button>
          </div>
        </div>

      </div>

      {/* ======================================================== */}
      {/* DETAILED GALLERY ALBUM VIEW MODAL (lightbox trigger target) */}
      {/* ======================================================== */}
      {selectedGallery && (
        <div
          className="fixed inset-0 z-50 bg-[#001546]/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedGallery(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#001546] text-white rounded-3xl overflow-hidden shadow-2xl border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-video w-full max-h-[55vh]">
              <Image
                src={selectedGallery.image}
                alt={selectedGallery.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#001546] via-transparent to-black/30" />
              <button
                onClick={() => setSelectedGallery(null)}
                className="absolute top-4 right-4 p-2.5 rounded-full bg-[#001546]/80 hover:bg-[#001546] text-white backdrop-blur-md transition-all cursor-pointer shadow-lg hover:scale-105"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8 bg-[#001546]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="bg-[#FFE9C2] text-[#D23F12] px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider">
                      {selectedGallery.category}
                    </span>
                    <span className="text-xs text-[#FFE9C2]/80">
                      Collection &bull; {selectedGallery.photoCount} High-Resolution Photos
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-2">
                    {selectedGallery.title}
                  </h3>
                  <p className="mt-2 text-sm text-[#FFE9C2]/90 max-w-xl leading-relaxed">
                    {selectedGallery.description}
                  </p>
                </div>

                <div className="flex sm:flex-col gap-3 shrink-0">
                  <button
                    onClick={() => setSelectedGallery(null)}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#FFB21A] text-[#001546] font-bold text-xs uppercase tracking-wider hover:bg-[#ffc247] transition-colors cursor-pointer shadow-md"
                  >
                    <span>Open Album</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setSelectedGallery(null)}
                    className="px-5 py-3 rounded-full border border-white/20 text-white font-semibold text-xs uppercase tracking-wider hover:bg-white/10 transition-colors cursor-pointer text-center"
                  >
                    Back to Hub
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
