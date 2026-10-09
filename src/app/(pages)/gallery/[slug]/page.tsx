"use client";

import React, { useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  ChevronRight,
  ChevronLeft,
  X,
  Maximize2,
  Image as ImageIcon
} from "lucide-react";
import Header from "@/components/InnerHeader";
import Footer from "@/components/InnerFooter";

// Database of specific gallery albums (12 albums corresponding to main page)
const albumsDatabase: Record<string, {
  title: string;
  date: string;
  location: string;
  category: string;
  featuredImage: string;
  images: string[];
}> = {
  "convocation-2024": {
    title: "Convocation 2024",
    date: "May 20, 2024",
    location: "Sri Venkateswara University Auditorium",
    category: "Achievements",
    featuredImage: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1525921429624-479b6c294a40?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1535905257518-6f140b79478e?q=80&w=800&auto=format&fit=crop",
    ]
  },
  "cultural-fest-vibrance-2024": {
    title: "Cultural Fest – VIBRANCE 2024",
    date: "Apr 10, 2024",
    location: "SVU Open Air Theatre",
    category: "Cultural",
    featuredImage: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=800&auto=format&fit=crop",
    ]
  },
  "national-seminar-on-innovation-sustainability": {
    title: "National Seminar on Innovation & Sustainability",
    date: "Mar 28, 2024",
    location: "SVU Senate Hall",
    category: "Events",
    featuredImage: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?q=80&w=800&auto=format&fit=crop",
    ]
  },
  "inter-collegiate-basketball-tournament": {
    title: "Inter Collegiate Basketball Tournament",
    date: "Mar 15, 2024",
    location: "SVU Sports Complex",
    category: "Sports",
    featuredImage: "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519766304817-4f37bda74a27?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=800&auto=format&fit=crop",
    ]
  },
  "research-excellence": {
    title: "Research Excellence",
    date: "Feb 22, 2024",
    location: "SVU Advanced Research Labs",
    category: "Academics",
    featuredImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1532187863486-abf9d39d66e8?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518152006812-edab29b069ac?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=800&auto=format&fit=crop",
    ]
  },
  "library-day-celebrations": {
    title: "Library Day Celebrations",
    date: "Feb 12, 2024",
    location: "SVU Central Library",
    category: "Infrastructure",
    featuredImage: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1529148482759-b35b28030728?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1568667256549-094345857637?q=80&w=800&auto=format&fit=crop",
    ]
  },
  "student-achievements-awards": {
    title: "Student Achievements & Awards",
    date: "Jan 30, 2024",
    location: "SVU Senate Hall",
    category: "Achievements",
    featuredImage: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1535905257518-6f140b79478e?q=80&w=800&auto=format&fit=crop",
    ]
  },
  "infrastructure-development": {
    title: "Infrastructure Development",
    date: "Jan 18, 2024",
    location: "SVU New Academic Blocks",
    category: "Infrastructure",
    featuredImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1568667256549-094345857637?q=80&w=800&auto=format&fit=crop",
    ]
  },
  "science-exhibition-2024": {
    title: "Science Exhibition 2024",
    date: "Jan 05, 2024",
    location: "SVU Convocation Hall Grounds",
    category: "Events",
    featuredImage: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=800&auto=format&fit=crop",
    ]
  },
  "nss-community-service": {
    title: "NSS – Community Service",
    date: "Dec 22, 2023",
    location: "Nearby Tirupati Rural Villages",
    category: "Campus Life",
    featuredImage: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1525921429624-479b6c294a40?q=80&w=800&auto=format&fit=crop",
    ]
  },
  "mou-signing-ceremony": {
    title: "MoU Signing Ceremony",
    date: "Dec 10, 2023",
    location: "SVU Senate Chamber",
    category: "Academics",
    featuredImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=800&auto=format&fit=crop",
    ]
  },
  "fit-india-run-2023": {
    title: "Fit India Run 2023",
    date: "Nov 26, 2023",
    location: "SVU Stadium & Ring Road",
    category: "Sports",
    featuredImage: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=800&auto=format&fit=crop",
    ]
  }
};

// Extremely stable fallback image
const FALLBACK_DUMMY_IMAGE = "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=800&auto=format&fit=crop";

export default function GallerySinglePage() {
  const params = useParams();
  const router = useRouter();
  const slug = (params?.slug as string) || "";

  // Lightbox State
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImgIndex, setActiveImgIndex] = useState(0);

  // Retrieve data based on slug, otherwise use default fallback values
  const albumData = useMemo(() => {
    if (slug && albumsDatabase[slug]) {
      return albumsDatabase[slug];
    }
    
    // Default fallback mock data
    const formattedTitle = slug
      ? slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
      : "SVU Campus Memories";
      
    return {
      title: formattedTitle,
      date: "June 15, 2024",
      location: "Sri Venkateswara University Campus, Tirupati",
      category: "Campus Life",
      featuredImage: FALLBACK_DUMMY_IMAGE,
      images: [
        FALLBACK_DUMMY_IMAGE,
        "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1525921429624-479b6c294a40?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=800&auto=format&fit=crop",
      ]
    };
  }, [slug]);

  // Combine featured image + grid images for total album assets
  const allImages = useMemo(() => {
    return [albumData.featuredImage, ...albumData.images];
  }, [albumData]);

  // Lightbox handlers
  const openLightbox = (index: number) => {
    setActiveImgIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const showNextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveImgIndex((prev) => (prev + 1) % allImages.length);
  };

  const showPrevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveImgIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#fafbfc] text-slate-800">
      <Header />

      {/* Path Header Bar */}
      <div className="bg-[#002147] text-white py-3.5 px-4 md:px-8 border-b border-[#faa61a]/20 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Breadcrumb Path */}
          <div className="flex items-center space-x-2 text-xs font-semibold text-white/80">
            <a href="/" className="hover:text-[#faa61a] transition-colors">Home</a>
            <ChevronRight className="w-3.5 h-3.5 text-white/40" />
            <a href="/gallery" className="hover:text-[#faa61a] transition-colors">Gallery</a>
            <ChevronRight className="w-3.5 h-3.5 text-white/40" />
            <span className="text-[#faa61a] font-bold">{albumData.title}</span>
          </div>

          {/* Back Button */}
          <button
            onClick={() => router.push("/gallery")}
            className="inline-flex items-center space-x-2 bg-white/10 hover:bg-white/20 border border-white/10 hover:border-white/30 text-white text-xs font-bold px-4 py-2 rounded-lg transition-all duration-300 cursor-pointer self-start sm:self-auto shadow-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#faa61a]" />
            <span>Back to Gallery</span>
          </button>
        </div>
      </div>

      {/* Album Heading Banner */}
      <section className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-8 md:py-12 space-y-4">
          <span className="text-[#faa61a] text-xs font-extrabold uppercase tracking-widest bg-[#faa61a]/10 px-3 py-1 rounded-full inline-flex items-center gap-1.5 border border-[#faa61a]/20">
            <ImageIcon className="w-3.5 h-3.5" />
            Gallery
          </span>
          
          <h1 className="text-3xl md:text-5xl font-black text-[#002147] tracking-tight leading-tight">
            {albumData.title}
          </h1>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-xs text-gray-500 font-bold uppercase tracking-wider">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-[#faa61a] shrink-0" />
              <span>{albumData.date}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-[#faa61a] shrink-0" />
              <span>{albumData.location}</span>
            </div>
          </div>
          
          <div className="w-16 h-1 bg-[#faa61a] rounded-full mt-2" />
        </div>
      </section>

      {/* Main Gallery Media Grid */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 md:px-12 py-10 space-y-8">
        
        {/* Large Featured Image */}
        <div
          onClick={() => openLightbox(0)}
          className="group relative w-full aspect-[16/9] md:h-[480px] bg-slate-100 rounded-3xl overflow-hidden shadow-lg border-2 border-white cursor-pointer"
        >
          <img
            src={albumData.featuredImage}
            alt={`${albumData.title} Featured`}
            onError={(e) => {
              (e.target as HTMLImageElement).onerror = null;
              (e.target as HTMLImageElement).src = FALLBACK_DUMMY_IMAGE;
            }}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent flex flex-col justify-end p-6 md:p-8" />
          
          <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 bg-white/90 backdrop-blur-md text-[#002147] px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider shadow-md flex items-center gap-2 border border-white/20">
            <Maximize2 className="w-3.5 h-3.5 text-[#faa61a]" />
            <span>Click to View Album</span>
          </div>
        </div>

        {/* Secondary Grid Images */}
        <div>
          <h2 className="text-lg md:text-xl font-black text-[#002147] mb-6 flex items-center gap-2">
            <span>Album Photos</span>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-150 text-gray-500 font-sans border border-slate-200">
              {allImages.length} items
            </span>
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {allImages.slice(1).map((image, idx) => (
              <div
                key={idx}
                onClick={() => openLightbox(idx + 1)}
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer"
              >
                <img
                  src={image}
                  alt={`${albumData.title} ${idx + 1}`}
                  onError={(e) => {
                    (e.target as HTMLImageElement).onerror = null;
                    (e.target as HTMLImageElement).src = FALLBACK_DUMMY_IMAGE;
                  }}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Hover overlay with zoom icon */}
                <div className="absolute inset-0 bg-[#001730]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="bg-white/95 text-[#002147] p-2.5 rounded-full shadow-lg transform scale-75 group-hover:scale-100 transition-transform duration-300">
                    <Maximize2 className="w-4 h-4 text-[#faa61a]" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>

      {/* Lightbox / High-Res Image Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-sm flex flex-col justify-between p-4 md:p-6 select-none animate-in fade-in duration-300"
          onClick={closeLightbox}
        >
          {/* Lightbox Top Header */}
          <div className="flex justify-between items-center w-full text-white/90 z-20">
            <div className="space-y-0.5">
              <h3 className="text-xs md:text-sm font-black uppercase tracking-wider text-[#faa61a]">
                {albumData.title}
              </h3>
              <p className="text-[10px] md:text-xs text-white/60 font-semibold">
                Photo {activeImgIndex + 1} of {allImages.length}
              </p>
            </div>

            <button
              onClick={closeLightbox}
              className="bg-white/10 hover:bg-white/20 border border-white/10 text-white p-2.5 rounded-full transition-all cursor-pointer shadow flex items-center justify-center"
              title="Close viewer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main Large Image Container */}
          <div className="relative flex-1 flex items-center justify-center max-w-5xl mx-auto w-full py-4">
            {/* Left Nav Arrow */}
            <button
              onClick={showPrevImage}
              className="absolute left-0 md:-left-16 bg-white/10 hover:bg-white/20 border border-white/10 text-white p-3 rounded-full transition-all cursor-pointer z-30 flex items-center justify-center"
              title="Previous photo"
            >
              <ChevronLeft className="w-6 h-6 text-[#faa61a]" />
            </button>

            {/* High-res Image Wrapper with zoom effect */}
            <div
              className="relative max-h-full w-full flex justify-center items-center overflow-hidden animate-in zoom-in-95 duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={allImages[activeImgIndex]}
                alt={`${albumData.title} Large viewer`}
                onError={(e) => {
                  (e.target as HTMLImageElement).onerror = null;
                  (e.target as HTMLImageElement).src = FALLBACK_DUMMY_IMAGE;
                }}
                className="max-h-[70vh] md:max-h-[78vh] max-w-full rounded-2xl shadow-2xl border border-white/5 object-contain"
              />
            </div>

            {/* Right Nav Arrow */}
            <button
              onClick={showNextImage}
              className="absolute right-0 md:-right-16 bg-white/10 hover:bg-white/20 border border-white/10 text-white p-3 rounded-full transition-all cursor-pointer z-30 flex items-center justify-center"
              title="Next photo"
            >
              <ChevronRight className="w-6 h-6 text-[#faa61a]" />
            </button>
          </div>

          {/* Lightbox Footer text */}
          <div className="w-full text-center text-white/50 text-[10px] md:text-xs font-bold uppercase tracking-widest py-2 z-10 select-none pointer-events-none">
            © Sri Venkateswara University • {albumData.category}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
