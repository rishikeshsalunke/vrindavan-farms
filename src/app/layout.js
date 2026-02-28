"use client";

import { useState, useEffect } from "react";
import "./globals.css";

export default function RootLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <html lang="en" suppressHydrationWarning>
      <body 
        className="bg-[#fdfcf7] text-gray-900 antialiased" 
        suppressHydrationWarning
      >
        <nav className="fixed top-0 w-full z-[999] bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center relative z-[1001]">

            {/* LOGO */}
            <a href="/" onClick={closeMenu} className="group flex flex-col items-center">
              <h1 className="text-xl md:text-2xl font-serif tracking-[0.2em] text-green-950 leading-none">
                VRINDAVAN
              </h1>
              <span className="block text-[7px] md:text-[9px] tracking-[0.5em] font-sans uppercase text-gray-600 font-black mt-1">
                Farms & Resorts
              </span>
            </a>

            {/* DESKTOP NAV */}
            <div className="hidden md:flex items-center space-x-10 text-[11px] uppercase tracking-[0.2em] text-gray-800 font-bold">
              <a href="/" className="hover:text-orange-600 transition-colors">Explore</a>
              <a href="/rooms" className="hover:text-orange-600 transition-colors">Sanctuaries</a>
              <a href="/packages" className="hover:text-orange-600 transition-colors">Packages</a>
              <a href="/events" className="hover:text-orange-600 transition-colors">Events</a>
              <a href="/booking" className="bg-green-950 text-white px-7 py-2.5 rounded-full hover:bg-orange-600 transition duration-500">
                Reserve
              </a>
            </div>

            {/* MOBILE HAMBURGER BUTTON */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden flex flex-col justify-center items-center w-10 h-10 space-y-1.5 focus:outline-none relative z-[1002]"
              aria-label="Toggle Menu"
            >
              <span className={`w-6 h-0.5 bg-green-950 transition-all duration-300 ${isOpen ? "rotate-45 translate-y-2" : ""}`}></span>
              <span className={`w-6 h-0.5 bg-green-950 transition-all duration-300 ${isOpen ? "opacity-0" : ""}`}></span>
              <span className={`w-6 h-0.5 bg-green-950 transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
            </button>
          </div>

          {/* MOBILE MENU OVERLAY */}
          <div 
            className={`fixed inset-0 bg-[#fdfcf7] z-[1000] flex flex-col items-center justify-center transition-transform duration-500 ease-in-out ${
              isOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex flex-col items-center space-y-8 text-center w-full">
              <span className="text-orange-600 text-[10px] font-black uppercase tracking-[0.4em] mb-4">Menu</span>
              
              <a onClick={closeMenu} href="/" className="text-3xl font-serif text-green-950">Explore</a>
              <a onClick={closeMenu} href="/rooms" className="text-3xl font-serif text-green-950">Sanctuaries</a>
              <a onClick={closeMenu} href="/packages" className="text-3xl font-serif text-green-950">Packages</a>
              <a onClick={closeMenu} href="/events" className="text-3xl font-serif text-green-950">Events</a>
              
              <div className="pt-4">
                <a onClick={closeMenu} href="/booking" className="bg-green-950 text-white px-12 py-4 rounded-full text-[12px] font-bold uppercase tracking-[0.3em] inline-block shadow-xl">
                  Reserve Now
                </a>
              </div>

              <div className="pt-8 opacity-40">
                <p className="text-[9px] uppercase tracking-widest text-green-950 font-bold">Vrindavan Farms & Resorts</p>
              </div>
            </div>
          </div>
        </nav>

        <main className="pt-24 min-h-screen">
          {children}
        </main>

        {/* FOOTER */}
        <footer className="bg-green-950 text-[#d1d5db] py-20 text-center font-serif">
          <h2 className="text-3xl mb-4 text-white tracking-widest uppercase">Vrindavan</h2>
          <p className="mb-8 font-sans uppercase text-[10px] tracking-[0.4em] text-orange-400 font-bold">A Nature-Forward Luxury Escape</p>
          <div className="h-px w-20 bg-green-800/20 mx-auto mb-8"></div>
          <p className="text-[10px] font-sans tracking-widest opacity-50">© 2026 VRINDAVAN FARMS. ALL RIGHTS RESERVED.</p>
        </footer>
      </body>
    </html>
  );
}