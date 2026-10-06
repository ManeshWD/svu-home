"use client";

import React, { useState } from "react";
import Image from "next/image";

interface Story {
  id: number;
  quote: string;
  name: string;
  role: string;
  company: string;
  school: string;
  image: string;
}

const stories: Story[] = [
  {
    id: 0,
    quote:
      "When top people see that I got my internship at Ernst & Young, the first thing I would say is: I am on Handshake.",
    name: "Jacob",
    role: "Auditing & Advisory Intern",
    company: "Ernst & Young",
    school: "University of Louisville, Class of 2021",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1100&q=85",
  },
  {
    id: 1,
    quote:
      "I had zero corporate connections. Handshake showed me aerospace engineering roles that specifically welcomed undergraduate beginners like me.",
    name: "Elena",
    role: "Associate Propulsion Engineer",
    company: "Boeing",
    school: "Purdue University, Class of 2022",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1100&q=85",
  },
  {
    id: 2,
    quote:
      "Within two weeks of updating my profile and projects, an Amazon campus recruiter reached out directly for an interview.",
    name: "Marcus",
    role: "Software Development Engineer",
    company: "Amazon",
    school: "University of Washington, Class of 2023",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1100&q=85",
  },
];

export default function SuccessStories() {
  const [activeIdx, setActiveIdx] = useState(0);
  const currentStory = stories[activeIdx];

  return (
    <section className="bg-[#FFE9C2] py-[clamp(2rem,6vh,4rem)] transition-colors duration-500 overflow-hidden border-t border-[#FFE9C2]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16 items-center">

          {/* Left Column: Testimonial Copy & Author Info */}
          <div className="lg:col-span-6 flex flex-col justify-between h-full py-2">
            <div>
              <span className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-[#D23F12] mb-2">
                Student Testimonials
              </span>
              <h2 className="text-[clamp(1.5rem,3.6vw,2.6rem)] font-black text-[#001546] tracking-tight leading-[1.1] font-['Plus_Jakarta_Sans',sans-serif]">
                New success<br />
                stories every day
              </h2>

              <blockquote className="mt-4 text-[clamp(1rem,1.6vw,1.35rem)] font-medium text-[#0C1230] leading-relaxed">
                &ldquo;{currentStory.quote}&rdquo;
              </blockquote>

              <div className="mt-4">
                <p className="text-base font-bold text-[#001546] font-['Plus_Jakarta_Sans',sans-serif]">
                  {currentStory.name}
                </p>
                <p className="text-xs font-medium text-[#5A6382] mt-0.5">
                  {currentStory.school}
                </p>
              </div>
            </div>

            {/* Pagination indicator dots */}
            <div className="flex items-center gap-2.5 mt-6">
              {stories.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => setActiveIdx(idx)}
                  className={`transition-all duration-300 rounded-full h-2.5 ${
                    activeIdx === idx
                      ? "w-8 bg-[#D23F12]"
                      : "w-2.5 bg-white/80 hover:bg-white"
                  }`}
                  aria-label={`View story ${idx + 1} of ${stories.length}`}
                />
              ))}
            </div>
          </div>

          {/* Right Column: Photo of student laughing/studying */}
          <div className="lg:col-span-6">
            <div className="relative mx-auto max-h-[38vh] max-w-md aspect-[4/3] overflow-hidden rounded-2xl bg-white shadow-xl sm:aspect-[16/11] lg:max-w-none ring-1 ring-[#001546]/10">
              <Image
                src={currentStory.image}
                alt={`${currentStory.name} - ${currentStory.school}`}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center transition-all duration-500 transform hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#001546]/30 via-transparent to-transparent"></div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
