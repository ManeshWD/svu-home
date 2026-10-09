"use client";

import { useMotionValue, motion, useSpring, useTransform, AnimatePresence } from "motion/react";
import React, { useRef, useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import Image from "next/image";
import AboutChildMenu from "./AboutChildMenu";
import MenuToggleIcon from "./MenuToggleIcon";
import NaacBadge from "./NaacBadge";

interface HoverImageLinksProps {
  onClose?: () => void;
}

export const HoverImageLinks = ({ onClose }: HoverImageLinksProps) => {
  const [activeChild, setActiveChild] = useState<string | null>(null);
  // The close icon morphs back into the hamburger while the menu fades out
  const [closing, setClosing] = useState(false);
  const close = () => {
    setClosing(true);
    onClose?.();
  };

  if (activeChild === "about") {
    return <AboutChildMenu onBack={() => setActiveChild(null)} onClose={onClose} />;
  }

  return (
    <section className="relative min-h-screen w-full shrink-0 bg-neutral-950 text-white flex flex-col justify-between">
      {/* Top Header Bar inside Mega Menu */}
      <div className="w-full border-b border-neutral-800 px-6 sm:px-12 py-5 flex items-center justify-between z-30 sticky top-0 bg-neutral-950/90 backdrop-blur-md">
        <div className="flex items-center gap-3.5">
          <Image
            src="/svu-color-crest.webp" unoptimized
            alt="SVU Crest"
            width={72}
            height={72}
            className="h-14 w-auto object-contain"
          />
          <div className="flex flex-col">
            <span className="font-serif font-bold text-lg xl:text-xl tracking-wide text-white uppercase leading-none">
              Sri Venkateswara
            </span>
            <span className="text-xs font-sans font-semibold tracking-widest text-[#23B5E9] uppercase mt-1.5">
              University • Tirupati
            </span>
          </div>
          <NaacBadge className="ml-1 h-14" />
        </div>

        {/* Close Button - ICON ONLY, NO TEXT */}
        <button
          onClick={close}
          className="p-2.5 rounded-full border border-neutral-700 bg-neutral-900 hover:bg-neutral-800 hover:border-neutral-50 text-white transition-all duration-200 cursor-pointer shadow-sm active:scale-95 flex items-center justify-center"
          aria-label="Close menu"
        >
          <MenuToggleIcon open={!closing} morphOnMount className="h-5 w-5 text-white" />
        </button>
      </div>

      {/* Main Links List */}
      <div className="mx-auto max-w-5xl w-full p-6 sm:p-10 md:p-14 flex-1 flex flex-col justify-center">
        <Link
          heading="About"
          subheading="History, vision & our NAAC A+ legacy since 1954"
          imgSrc="/about_real_admin.webp"
          href="/#about"
          noTransition
          onClick={(e) => {
            e.preventDefault();
            setActiveChild("about");
          }}
        />
        <Link
          heading="Colleges"
          subheading="Constituent colleges & programmes"
          imgSrc="/college%20of%20engineering.webp"
          href="/#colleges"
          onClick={onClose}
        />
        <Link
          heading="Faculty"
          subheading="Faculty directory across departments"
          imgSrc="/moments/auditorium_symposium.webp"
          href="/people/faculty"
          onClick={onClose}
        />
        <Link
          heading="Centres"
          subheading="13 research centres & institutes"
          imgSrc="/megamenu/portfolio.webp"
          href="/centers"
          onClick={onClose}
        />
        <Link
          heading="Events"
          subheading="What's happening on campus"
          imgSrc="/moments/convocation_celebration.webp"
          href="/events"
          onClick={onClose}
        />
        <Link
          heading="Gallery"
          subheading="Capturing SVU moments"
          imgSrc="/moments/cultural_dance.webp"
          href="/gallery"
          onClick={onClose}
        />
      </div>

      {/* Subtle Bottom Footer */}
      <div className="w-full border-t border-neutral-900 px-6 sm:px-12 py-4 flex flex-wrap items-center justify-between text-xs text-neutral-600">
        <span>© Sri Venkateswara University • Tirupati, Andhra Pradesh</span>
        <span className="text-neutral-500 font-mono">EST. 1954 • NAAC A+</span>
      </div>
    </section>
  );
};

interface LinkProps {
  heading: string;
  subheading: string;
  imgSrc: string;
  href: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  noTransition?: boolean;
}

const Link = ({ heading, imgSrc, subheading, href, onClick, noTransition }: LinkProps) => {
  const ref = useRef<HTMLAnchorElement | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const top = useTransform(mouseYSpring, [0.5, -0.5], ["40%", "60%"]);
  const left = useTransform(mouseXSpring, [0.5, -0.5], ["60%", "70%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  return (
    <motion.a
      href={href}
      ref={ref}
      onClick={onClick}
      data-no-transition={noTransition ? "true" : undefined}
      onMouseMove={handleMouseMove}
      initial="initial"
      whileHover="whileHover"
      className="group relative flex items-center justify-between border-b-2 border-neutral-700 py-4 transition-colors duration-500 hover:border-neutral-50 md:py-8 cursor-pointer select-none"
    >
      <div>
        <motion.span
          variants={{
            initial: { x: 0 },
            whileHover: { x: -16 },
          }}
          transition={{
            type: "spring",
            staggerChildren: 0.075,
            delayChildren: 0.25,
          }}
          className="relative z-10 flex items-center md:inline-block font-serif text-4xl font-bold text-neutral-500 transition-colors duration-500 group-hover:text-neutral-50 md:text-6xl"
        >
          <span>
            {heading.split("").map((l, i) => (
              <motion.span
                variants={{
                  initial: { x: 0 },
                  whileHover: { x: 16 },
                }}
                transition={{ type: "spring" }}
                className="inline-block"
                key={i}
              >
                {l === " " ? "\u00A0" : l}
              </motion.span>
            ))}
          </span>
          {/* Mobile child menu indicator arrow right next to menu text */}
          <FiArrowRight className="inline-block ml-3 md:hidden text-2xl text-[#23B5E9] shrink-0" />
        </motion.span>
        <span className="relative z-10 mt-2 block text-base text-neutral-500 transition-colors duration-500 group-hover:text-neutral-50">
          {subheading}
        </span>
      </div>

      <motion.img
        style={{
          top,
          left,
          translateX: "-50%",
          translateY: "-50%",
        }}
        variants={{
          initial: { scale: 0, rotate: "-12.5deg" },
          whileHover: { scale: 1, rotate: "12.5deg" },
        }}
        transition={{ type: "spring" }}
        src={imgSrc}
        className="pointer-events-none absolute z-0 hidden md:block md:h-48 md:w-64 rounded-lg object-cover shadow-2xl border border-neutral-700/50"
        alt={`Image representing a link for ${heading}`}
      />

      <motion.div
        variants={{
          initial: {
            x: "25%",
            opacity: 0,
          },
          whileHover: {
            x: "0%",
            opacity: 1,
          },
        }}
        transition={{ type: "spring" }}
        className="relative z-10 p-4"
      >
        <FiArrowRight className="text-4xl sm:text-5xl text-neutral-50" />
      </motion.div>
    </motion.a>
  );
};

export default HoverImageLinks;
