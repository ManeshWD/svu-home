import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutUs from "@/components/AboutUs";
import Leadership from "@/components/Leadership";
import Colleges from "@/components/Colleges";
import Centres from "@/components/Centres";
import Events from "@/components/Events";
import Notifications from "@/components/Notifications";
import RotatingGallery from "@/components/RotatingGallery";
import RecruiterMarquee from "@/components/RecruiterMarquee";
import QueriesCta from "@/components/QueriesCta";
import Footer from "@/components/Footer";
import WithFanWatermark from "@/components/FanWatermark";
import GoToTopSling from "@/components/GoToTopSling";
import QuickAccess from "@/components/mobile/QuickAccess";
import PauseOffscreenAnimations from "@/components/PauseOffscreenAnimations";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FFF9EE] text-[#0C1230] selection:bg-[#D23F12] selection:text-white">
      <main className="flex-1">
        {/* Replicated Hero Section */}
        <WithFanWatermark side="left" tone="light">
          <Hero />
        </WithFanWatermark>

        {/* Mobile-only quick-access service icons */}
        <QuickAccess />

        {/* About the university */}
        <WithFanWatermark side="right" tone="dark">
          <AboutUs />
        </WithFanWatermark>

        {/* Vice-Chancellor, Rector & Registrar messages */}
        {/* Fan sits behind the content so the frosted cards blur it */}
        <WithFanWatermark side="left" tone="light" className="svu-fan-watermark--behind">
          <Leadership />
        </WithFanWatermark>

        {/* Constituent colleges carousel */}
        <WithFanWatermark side="left" tone="dark">
          <Colleges />
        </WithFanWatermark>

        {/* Circulars, exam notifications & announcements */}
        {/* Fan behind the content so the date strip's frosted blur shows it */}
        <WithFanWatermark side="right" tone="light" className="svu-fan-watermark--behind">
          <Notifications />
        </WithFanWatermark>

        {/* Centres & institutes */}
        <WithFanWatermark side="left" tone="dark">
          <Centres />
        </WithFanWatermark>

        {/* Events (replaces "Employers are hiring at your school"; anchor kept
            for the footer's Campus Placements link) */}
        <div id="employers">
          <WithFanWatermark side="right" tone="light">
            <Events />
          </WithFanWatermark>
        </div>

        {/* Capturing SVU Moments (Half-Circle Rotating Gallery) */}
        <div id="career-centers">
          <WithFanWatermark side="left" tone="dark">
            <RotatingGallery />
          </WithFanWatermark>
        </div>

        {/* Featured recruiters ticker — sits below the gallery */}
        <WithFanWatermark side="right" tone="light">
          <RecruiterMarquee />
        </WithFanWatermark>

        {/* "Have queries?" CTA — eye-follow button + folder of common questions */}
        {/* Fan behind the content so the glass button blurs it */}
        <WithFanWatermark side="left" tone="dark" className="svu-fan-watermark--behind">
          <QueriesCta />
        </WithFanWatermark>
      </main>

      {/* Footer (draws its own fan, behind the frosted CTA card) */}
      <div id="contact">
        <Footer />
      </div>

      {/* Slingshot Go-To-Top Button */}
      <GoToTopSling />

      {/* Rests endless animations in sections scrolled out of view */}
      <PauseOffscreenAnimations />
    </div>
  );
}
