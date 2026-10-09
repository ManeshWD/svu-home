"use client";

import React, { useState, useMemo } from "react";
import {
  Image as ImageIcon,
  Video,
  Calendar,
  Folder,
  Search,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  BookOpen,
  ArrowRight,
  GraduationCap,
  Users,
  Trophy,
  Building2,
  Dumbbell,
  Palette,
  HeartHandshake
} from "lucide-react";
import Header from "@/components/InnerHeader";
import Footer from "@/components/InnerFooter";

// Gallery stats
const stats = [
  { value: "2,450+", label: "Photos", icon: ImageIcon },
  { value: "320+", label: "Videos", icon: Video },
  { value: "150+", label: "Events", icon: Calendar },
  { value: "12+", label: "Categories", icon: Folder },
];

// Gallery categories for filter bar
const filterCategories = [
  { name: "All", icon: null },
  { name: "Events", icon: Calendar },
  { name: "Academics", icon: GraduationCap },
  { name: "Campus Life", icon: Users },
  { name: "Sports", icon: Dumbbell },
  { name: "Infrastructure", icon: Building2 },
  { name: "Achievements", icon: Trophy },
  { name: "Cultural", icon: Palette },
];

// All Gallery Albums Data based on the reference design image
const albumsData = [
  {
    title: "Convocation 2024",
    date: "May 20, 2024",
    photoCount: 56,
    category: "Achievements",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=600&auto=format&fit=crop",
    slug: "convocation-2024",
    year: "2024",
    month: "May"
  },
  {
    title: "Cultural Fest – VIBRANCE 2024",
    date: "Apr 10, 2024",
    photoCount: 78,
    category: "Cultural",
    image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=600&auto=format&fit=crop",
    slug: "cultural-fest-vibrance-2024",
    year: "2024",
    month: "April"
  },
  {
    title: "National Seminar on Innovation & Sustainability",
    date: "Mar 28, 2024",
    photoCount: 42,
    category: "Events",
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=600&auto=format&fit=crop",
    slug: "national-seminar-on-innovation-sustainability",
    year: "2024",
    month: "March"
  },
  {
    title: "Inter Collegiate Basketball Tournament",
    date: "Mar 15, 2024",
    photoCount: 63,
    category: "Sports",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=600&auto=format&fit=crop",
    slug: "inter-collegiate-basketball-tournament",
    year: "2024",
    month: "March"
  },
  {
    title: "Research Excellence",
    date: "Feb 22, 2024",
    photoCount: 49,
    category: "Academics",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600&auto=format&fit=crop",
    slug: "research-excellence",
    year: "2024",
    month: "February"
  },
  {
    title: "Library Day Celebrations",
    date: "Feb 12, 2024",
    photoCount: 31,
    category: "Infrastructure",
    image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=600&auto=format&fit=crop",
    slug: "library-day-celebrations",
    year: "2024",
    month: "February"
  },
  {
    title: "Student Achievements & Awards",
    date: "Jan 30, 2024",
    photoCount: 27,
    category: "Achievements",
    image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=600&auto=format&fit=crop",
    slug: "student-achievements-awards",
    year: "2024",
    month: "January"
  },
  {
    title: "Infrastructure Development",
    date: "Jan 18, 2024",
    photoCount: 35,
    category: "Infrastructure",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600&auto=format&fit=crop",
    slug: "infrastructure-development",
    year: "2024",
    month: "January"
  },
  {
    title: "Science Exhibition 2024",
    date: "Jan 05, 2024",
    photoCount: 59,
    category: "Events",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=600&auto=format&fit=crop",
    slug: "science-exhibition-2024",
    year: "2024",
    month: "January"
  },
  {
    title: "NSS – Community Service",
    date: "Dec 22, 2023",
    photoCount: 41,
    category: "Campus Life",
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=600&auto=format&fit=crop",
    slug: "nss-community-service",
    year: "2023",
    month: "December"
  },
  {
    title: "MoU Signing Ceremony",
    date: "Dec 10, 2023",
    photoCount: 26,
    category: "Academics",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=600&auto=format&fit=crop",
    slug: "mou-signing-ceremony",
    year: "2023",
    month: "December"
  },
  {
    title: "Fit India Run 2023",
    date: "Nov 26, 2023",
    photoCount: 47,
    category: "Sports",
    image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?q=80&w=600&auto=format&fit=crop",
    slug: "fit-india-run-2023",
    year: "2023",
    month: "November"
  },
];

export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState("All Years");
  const [selectedMonth, setSelectedMonth] = useState("All Months");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [visibleCount, setVisibleCount] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);

  // Extract filter option values
  const years = ["All Years", "2024", "2023", "2022"];
  const months = [
    "All Months", "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const categoriesList = ["All Categories", "Academics", "Events", "Campus Life", "Sports", "Infrastructure", "Achievements", "Cultural"];

  // Filter items based on active filters and search query
  const filteredAlbums = useMemo(() => {
    return albumsData.filter((item) => {
      // Category Tab Filter
      const tabMatch = activeTab === "All" || item.category === activeTab;
      
      // Text search match (Title or Category)
      const queryMatch =
        searchQuery.trim() === "" ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());

      // Year Filter dropdown
      const yearMatch = selectedYear === "All Years" || item.year === selectedYear;

      // Month Filter dropdown
      const monthMatch = selectedMonth === "All Months" || item.month === selectedMonth;

      // Category Filter dropdown
      const catMatch = selectedCategory === "All Categories" || item.category === selectedCategory;

      return tabMatch && queryMatch && yearMatch && monthMatch && catMatch;
    });
  }, [activeTab, searchQuery, selectedYear, selectedMonth, selectedCategory]);

  // Handle Load More
  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  // Pagination calculations (mock based on 298 total results in reference design)
  const totalResults = filteredAlbums.length;
  
  return (
    <div className="flex flex-col min-h-screen bg-[#fafbfc] text-slate-800">
      <Header />

      {/* Breadcrumb Bar */}
      <div className="bg-white border-b border-gray-100 py-3.5 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex items-center space-x-2 text-xs font-semibold text-gray-500">
          <a href="/" className="hover:text-[#faa61a] transition-colors">Home</a>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-[#002147] font-bold">Gallery</span>
        </div>
      </div>

      {/* Hero Header Banner */}
      <section className="relative bg-gradient-to-r from-blue-50/70 via-indigo-50/30 to-transparent border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 pt-10 pb-20 md:pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left side content */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex items-center space-x-2">
                <span className="text-[#faa61a] text-xs font-extrabold uppercase tracking-wider bg-[#faa61a]/10 px-3 py-1 rounded-full flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5" />
                  Gallery
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-[#002147] tracking-tight leading-tight">
                Gallery
              </h1>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed font-medium max-w-xl">
                A collection of memorable moments that showcase the vibrant life, achievements and milestones of Sri Venkateswara University.
              </p>
              <div className="w-20 h-1 bg-[#faa61a] rounded-full" />
            </div>

            {/* Right side Clock Tower Image */}
            <div className="lg:col-span-5 hidden lg:flex justify-end relative">
              <div className="relative w-full max-w-[420px] aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-200">
                <img
                  src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=800&auto=format&fit=crop"
                  alt="Sri Venkateswara University Clock Tower"
                  onError={(e) => {
                    (e.target as HTMLImageElement).onerror = null;
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop";
                  }}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#002147]/20 to-transparent" />
              </div>
            </div>

          </div>
        </div>

        {/* Floating Stats Block */}
        <div className="absolute bottom-0 left-0 right-0 transform translate-y-1/2 px-6">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 p-4 md:p-6 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 items-center divide-x divide-gray-100">
            {stats.map((stat, idx) => {
              const IconComp = stat.icon;
              return (
                <div key={idx} className="flex items-center space-x-3.5 justify-center md:first:pl-0 pl-2">
                  <div className="bg-[#002147]/5 text-[#002147] p-2.5 rounded-xl shrink-0">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-lg md:text-xl font-black text-[#002147] leading-none mb-1">
                      {stat.value}
                    </div>
                    <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider leading-none">
                      {stat.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Listing Section */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 md:px-12 pt-20 pb-16 space-y-10 mt-6">
        
        {/* Category Navigation filter bar */}
        <div className="border-b border-gray-200 pb-4 overflow-x-auto scrollbar-none">
          <div className="flex space-x-2 md:space-x-3 min-w-max">
            {filterCategories.map((category, idx) => {
              const IconComp = category.icon;
              const isActive = activeTab === category.name;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    setActiveTab(category.name);
                    setCurrentPage(1);
                  }}
                  className={`inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-[#002147] text-white shadow-lg shadow-[#002147]/20"
                      : "bg-white hover:bg-gray-50 text-[#002147] border border-gray-200/80 shadow-sm"
                  }`}
                >
                  {IconComp && <IconComp className="w-3.5 h-3.5" />}
                  <span>{category.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dropdown Filters and Search Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
          {/* Left Dropdowns */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Year Dropdown */}
            <div className="relative">
              <select
                value={selectedYear}
                onChange={(e) => {
                  setSelectedYear(e.target.value);
                  setCurrentPage(1);
                }}
                className="appearance-none bg-gray-50 border border-gray-200 hover:border-gray-300 text-xs font-semibold text-gray-700 px-4 py-2.5 pr-8 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#002147] cursor-pointer min-w-[120px]"
              >
                {years.map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Month Dropdown */}
            <div className="relative">
              <select
                value={selectedMonth}
                onChange={(e) => {
                  setSelectedMonth(e.target.value);
                  setCurrentPage(1);
                }}
                className="appearance-none bg-gray-50 border border-gray-200 hover:border-gray-300 text-xs font-semibold text-gray-700 px-4 py-2.5 pr-8 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#002147] cursor-pointer min-w-[120px]"
              >
                {months.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Category Dropdown */}
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setCurrentPage(1);
                }}
                className="appearance-none bg-gray-50 border border-gray-200 hover:border-gray-300 text-xs font-semibold text-gray-700 px-4 py-2.5 pr-8 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#002147] cursor-pointer min-w-[150px]"
              >
                {categoriesList.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Right Search Input */}
          <div className="relative max-w-md w-full md:w-72">
            <input
              type="text"
              placeholder="Search gallery..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-gray-50 border border-gray-200 hover:border-gray-300 text-xs font-medium text-gray-700 pl-9 pr-4 py-2.5 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#002147] placeholder-gray-400 shadow-inner"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Album Cards Grid */}
        {filteredAlbums.length === 0 ? (
          <div className="bg-white border border-gray-100 rounded-3xl p-12 text-center shadow-sm space-y-4">
            <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center text-[#002147] mx-auto border border-gray-100 shadow-inner">
              <ImageIcon className="w-8 h-8 opacity-60" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-black text-[#002147]">No moments found</h3>
              <p className="text-gray-500 text-xs font-semibold">We couldn't find any albums matching your criteria.</p>
            </div>
            <button
              onClick={() => {
                setActiveTab("All");
                setSearchQuery("");
                setSelectedYear("All Years");
                setSelectedMonth("All Months");
                setSelectedCategory("All Categories");
              }}
              className="bg-[#002147] hover:bg-[#001730] text-white text-xs font-bold px-6 py-3 rounded-xl transition-all cursor-pointer shadow-md"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredAlbums.slice(0, visibleCount).map((album, idx) => (
                <a
                  key={idx}
                  href={`/gallery/${album.slug}`}
                  className="group bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col h-full cursor-pointer"
                >
                  {/* Thumbnail Image */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 border-b border-gray-100">
                    <img
                      src={album.image}
                      alt={album.title}
                      onError={(e) => {
                        (e.target as HTMLImageElement).onerror = null;
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=600&auto=format&fit=crop";
                      }}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Hover dark gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#001730]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Album Info */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3 bg-white">
                    <div className="space-y-1">
                      <span className="text-[9px] font-black uppercase tracking-wider text-[#faa61a] bg-[#faa61a]/10 px-2 py-0.5 rounded border border-[#faa61a]/20 inline-block mb-1.5">
                        {album.category}
                      </span>
                      <h3 className="text-sm font-black text-[#002147] group-hover:text-blue-600 transition-colors leading-snug line-clamp-2">
                        {album.title}
                      </h3>
                    </div>

                    <div className="pt-2 border-t border-gray-50 flex items-center justify-between text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                      <div className="flex items-center space-x-1.5">
                        <Calendar className="w-3.5 h-3.5 text-gray-400" />
                        <span>{album.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <ImageIcon className="w-3.5 h-3.5 text-[#faa61a]" />
                        <span>{album.photoCount}</span>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Load More Button */}
            {visibleCount < filteredAlbums.length && (
              <div className="mt-8 flex justify-center">
                <button
                  onClick={handleLoadMore}
                  className="inline-flex items-center space-x-2 border border-gray-200 hover:border-[#002147] hover:bg-[#002147]/5 text-gray-600 hover:text-[#002147] px-6 py-3 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 cursor-pointer shadow-sm"
                >
                  <span>Load More</span>
                  <ChevronDown className="w-4 h-4 text-[#faa61a]" />
                </button>
              </div>
            )}

            {/* Pagination Controls */}
            <div className="border-t border-gray-100 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-gray-500 font-bold">
                Showing 1 to {Math.min(visibleCount, filteredAlbums.length)} of {totalResults} results
              </span>

              <div className="flex items-center space-x-1.5">
                <button
                  className="p-2 rounded-lg border border-gray-200 text-gray-400 hover:text-gray-700 hover:bg-gray-50 cursor-pointer disabled:opacity-40 disabled:pointer-events-none"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                
                {[1, 2, 3, 4, '...', 25].map((pageNum, idx) => {
                  const isActive = currentPage === pageNum;
                  if (pageNum === '...') {
                    return <span key={idx} className="px-2 text-gray-400">...</span>;
                  }
                  return (
                    <button
                      key={idx}
                      onClick={() => typeof pageNum === 'number' && setCurrentPage(pageNum)}
                      className={`w-9 h-9 rounded-lg border text-xs font-bold flex items-center justify-center transition-all cursor-pointer ${
                        isActive
                          ? "bg-[#002147] border-[#002147] text-white shadow-md shadow-[#002147]/10"
                          : "border-gray-200 text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <button
                  className="p-2 rounded-lg border border-gray-200 text-gray-400 hover:text-gray-700 hover:bg-gray-50 cursor-pointer disabled:opacity-40"
                  disabled={currentPage === 25}
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </>
        )}

      </main>

      <Footer />
    </div>
  );
}
