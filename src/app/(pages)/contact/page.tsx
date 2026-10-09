"use client";

import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Globe,
  Send,
  ShieldCheck,
  ChevronRight,
  Map,
} from "lucide-react";
import Header from "@/components/InnerHeader";
import Footer from "@/components/InnerFooter";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General Inquiry",
    message: "",
  });

  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");
    // Simulate API call
    setTimeout(() => {
      setFormStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "General Inquiry",
        message: "",
      });
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f8fafc] text-slate-800 font-sans">
      <Header />

      {/* Banner Section */}
      <section
        className="relative w-full py-16 md:py-20 text-white bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: `url('/college of arts.jpg')` }}
      >
        {/* Dark overlay for contrast and readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#001730]/95 via-[#002147]/90 to-transparent z-10" />

        <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-center h-full">
          {/* Breadcrumbs */}
          <div className="flex items-center space-x-2 text-xs font-semibold text-slate-300 mb-4 tracking-wide">
            <a href="/" className="hover:text-[#faa61a] transition-colors">Home</a>
            <ChevronRight className="w-3.5 h-3.5 text-[#faa61a]" />
            <span className="text-slate-400">Contact Us</span>
          </div>

          {/* Banner Title & Description */}
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight mb-4 text-[#ffffff]">
            Contact Us
          </h1>
          <div className="w-16 h-1 bg-[#faa61a] mb-4 rounded-full" />
          <p className="text-white/80 text-sm md:text-base max-w-2xl leading-relaxed">
            We are here to help and answer any question you might have. We look forward to hearing from you.
          </p>
        </div>
      </section>

      {/* Main Section */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 md:px-12 py-16">
        
        {/* Get in Touch Heading */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-4xl font-extrabold text-[#002147] tracking-tight">
            Get <span className="relative inline-block pb-1.5">
              in Touch
              <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#faa61a] rounded-full" />
            </span>
          </h2>
          <p className="text-slate-500 text-sm md:text-base mt-3 max-w-2xl mx-auto leading-relaxed">
            Reach out to us using the contact information below or fill out the form and we will get back to you.
          </p>
        </div>

        {/* Info & Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* Left Column: Contact Information */}
          <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/80 p-8 shadow-sm h-full">
            <div className="mb-6">
              <h3 className="text-lg font-bold text-[#002147] tracking-tight flex flex-col">
                <span>Contact Information</span>
                <span className="w-10 h-0.5 bg-[#faa61a] mt-1" />
              </h3>
            </div>

            <div className="space-y-6">
              {/* Address */}
              <div className="flex items-start space-x-4">
                <div className="bg-[#002147] p-3 rounded-full text-[#faa61a] shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#002147] mb-1">Address</h4>
                  <p className="text-xs md:text-sm text-slate-600 leading-relaxed font-medium">
                    Sri Venkateswara University<br />
                    Tirupati - 517502,<br />
                    Andhra Pradesh, India
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start space-x-4">
                <div className="bg-[#002147] p-3 rounded-full text-[#faa61a] shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#002147] mb-1">Phone</h4>
                  <p className="text-xs md:text-sm text-slate-600 leading-relaxed font-medium">
                    <a href="tel:+918772261234" className="hover:text-[#faa61a] transition-colors">+91 877-226-1234</a><br />
                    <a href="tel:+918772265678" className="hover:text-[#faa61a] transition-colors">+91 877-226-5678</a>
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-4">
                <div className="bg-[#002147] p-3 rounded-full text-[#faa61a] shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#002147] mb-1">Email</h4>
                  <p className="text-xs md:text-sm text-slate-600 leading-relaxed font-medium break-all">
                    <a href="mailto:info@svuniversity.edu.in" className="hover:text-[#faa61a] transition-colors">info@svuniversity.edu.in</a><br />
                    <a href="mailto:registrar@svuniversity.edu.in" className="hover:text-[#faa61a] transition-colors">registrar@svuniversity.edu.in</a>
                  </p>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start space-x-4">
                <div className="bg-[#002147] p-3 rounded-full text-[#faa61a] shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#002147] mb-1">Working Hours</h4>
                  <p className="text-xs md:text-sm text-slate-600 leading-relaxed font-medium">
                    Monday - Friday: 9:00 AM - 5:30 PM<br />
                    Saturday: 9:00 AM - 1:00 PM<br />
                    <span className="text-slate-400 font-semibold">(Sunday & Holidays Closed)</span>
                  </p>
                </div>
              </div>

              {/* Website */}
              <div className="flex items-start space-x-4">
                <div className="bg-[#002147] p-3 rounded-full text-[#faa61a] shrink-0">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#002147] mb-1">Website</h4>
                  <p className="text-xs md:text-sm text-slate-600 leading-relaxed font-medium">
                    <a href="https://www.svuniversity.edu.in" target="_blank" rel="noopener noreferrer" className="hover:text-[#faa61a] transition-colors">www.svuniversity.edu.in</a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Send us a Message Form */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200/80 p-8 shadow-sm">
            <div className="mb-6">
              <h3 className="text-lg font-bold text-[#002147] tracking-tight flex flex-col">
                <span>Send us a Message</span>
                <span className="w-10 h-0.5 bg-[#faa61a] mt-1" />
              </h3>
            </div>

            {formStatus === "success" ? (
              <div className="bg-emerald-50 border border-emerald-250 text-emerald-800 rounded-xl p-6 text-center">
                <ShieldCheck className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
                <h4 className="text-lg font-bold mb-1">Thank you!</h4>
                <p className="text-sm font-medium">Your message has been sent successfully. We will get back to you shortly.</p>
                <button
                  onClick={() => setFormStatus("idle")}
                  className="mt-4 px-5 py-2.5 bg-[#002147] hover:bg-[#001730] text-white font-bold text-xs rounded-lg transition-colors cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="flex flex-col space-y-1.5">
                    <label htmlFor="name" className="text-xs font-bold text-slate-600 uppercase tracking-wider">Your Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-[#faa61a] focus:bg-white rounded-lg px-4 py-3 text-xs md:text-sm text-slate-800 outline-none transition-all"
                    />
                  </div>

                  {/* Email */}
                  <div className="flex flex-col space-y-1.5">
                    <label htmlFor="email" className="text-xs font-bold text-slate-600 uppercase tracking-wider">Your Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-[#faa61a] focus:bg-white rounded-lg px-4 py-3 text-xs md:text-sm text-slate-800 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Phone Number */}
                  <div className="flex flex-col space-y-1.5">
                    <label htmlFor="phone" className="text-xs font-bold text-slate-600 uppercase tracking-wider">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-[#faa61a] focus:bg-white rounded-lg px-4 py-3 text-xs md:text-sm text-slate-800 outline-none transition-all"
                    />
                  </div>

                  {/* Subject */}
                  <div className="flex flex-col space-y-1.5 relative">
                    <label htmlFor="subject" className="text-xs font-bold text-slate-600 uppercase tracking-wider">Subject *</label>
                    <div className="relative">
                      <select
                        id="subject"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full bg-slate-50 border border-slate-200 focus:border-[#faa61a] focus:bg-white rounded-lg px-4 py-3 pr-10 text-xs md:text-sm text-slate-800 outline-none transition-all appearance-none"
                      >
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Admissions">Admissions Helpline</option>
                        <option value="Examinations">Examinations & Results</option>
                        <option value="Administration">Administration Support</option>
                        <option value="Feedback">Suggestions & Feedback</option>
                      </select>
                      <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div className="flex flex-col space-y-1.5">
                  <label htmlFor="message" className="text-xs font-bold text-slate-600 uppercase tracking-wider">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder="Type your message here..."
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-[#faa61a] focus:bg-white rounded-lg px-4 py-3 text-xs md:text-sm text-slate-800 outline-none transition-all resize-none"
                  />
                </div>

                {/* Button & Shield Container */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
                  <button
                    type="submit"
                    disabled={formStatus === "submitting"}
                    className="inline-flex items-center justify-center space-x-2 bg-[#002147] hover:bg-[#001730] text-white px-6 py-3.5 rounded-xl text-xs md:text-sm font-extrabold shadow hover:shadow-md transition-all duration-300 disabled:opacity-50 cursor-pointer"
                  >
                    <span>{formStatus === "submitting" ? "Sending..." : "Send Message"}</span>
                    <Send className="w-4 h-4" />
                  </button>

                  <div className="flex items-center space-x-2 text-slate-400 text-xs font-medium">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    <span>Your information is safe with us. We never share your details.</span>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Box: Find Us / Map Embed */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-8 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left side info */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-[#002147] tracking-tight flex flex-col">
                  <span>Find Us</span>
                  <span className="w-10 h-0.5 bg-[#faa61a] mt-1" />
                </h3>
              </div>
              <p className="text-slate-600 text-xs md:text-sm leading-relaxed font-semibold">
                Sri Venkateswara University is located in the temple city of Tirupati, at the foot of the Seven Hills, in a serene and green environment.
              </p>
              <div>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Sri+Venkateswara+University+Tirupati"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 border border-[#faa61a] text-[#002147] hover:bg-[#faa61a] hover:text-[#001730] px-5 py-2.5 rounded-lg text-xs md:text-sm font-black transition-all duration-300 shadow-sm"
                >
                  <span>View on Map</span>
                  <MapPin className="w-4 h-4 text-[#faa61a] group-hover:text-inherit" />
                </a>
              </div>
            </div>

            {/* Right side map embed */}
            <div className="lg:col-span-7 relative rounded-xl overflow-hidden border border-slate-100 shadow-inner h-[280px] w-full">
              {/* Map Address Overlay */}
              <div className="absolute top-4 left-4 z-20 bg-white/95 backdrop-blur-sm border border-slate-100 shadow-lg px-4 py-3 rounded-lg flex items-start space-x-2.5 max-w-[280px]">
                <div className="bg-[#faa61a]/10 p-1.5 rounded-full border border-[#faa61a]/30 text-[#faa61a] shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="text-[11px] font-extrabold text-[#002147] uppercase tracking-wider">Sri Venkateswara University</h5>
                  <p className="text-[10px] text-slate-500 font-semibold mt-0.5 leading-normal">
                    Tirupati - 517502, Andhra Pradesh
                  </p>
                </div>
              </div>

              {/* The Map Iframe */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3877.516716599473!2d79.39860829999999!3d13.6263024!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4d4b3cad0b13e3%3A0xb9635a2a9d920c7d!2sSRI%20VENKATESWARA%20UNIVERSITY!5e0!3m2!1sen!2sin!4v1782189671731!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 z-10"
              />
            </div>

          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
