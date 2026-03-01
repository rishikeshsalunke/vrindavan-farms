"use client";
import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ParallaxProvider, Parallax } from "react-scroll-parallax";
import Link from "next/link";



export default function Home() {
  const containerRef = useRef(null);

  const [selectedRoom, setSelectedRoom] = useState("");

  const handleBookClick = (roomId) => {
    setSelectedRoom(roomId);

    const formSection = document.getElementById("booking-section");
    formSection?.scrollIntoView({ behavior: "smooth" });
  };

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  function ScrollRevealImage({ src, speed }) {
    return (
      <Parallax speed={speed}>
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-10% 0px -20% 0px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="w-full"
        >
          <img
            src={src}
            className="w-full h-48 md:h-150 object-cover rounded-sm shadow-xl"
            alt="Experience"
          />
        </motion.div>
      </Parallax>
    );
  }

  return (
    <ParallaxProvider>
      <main ref={containerRef} className="bg-[#fdfcf7] text-[#1a1a1a]">

        {/* 1. THE CINEMATIC OPENING */}
        <section className="relative h-[120vh] flex items-center justify-center overflow-hidden bg-black">
          <motion.div
            style={{ scale: useTransform(scrollYProgress, [0, 0.2], [1, 1.2]), opacity: useTransform(scrollYProgress, [0, 0.2], [1, 0.5]) }}
            className="absolute inset-0 z-0"
          >
            <video
              autoPlay muted loop playsInline
              className="w-full h-full object-cover opacity-60"
            >
              <source src="/hero/drone-shot.mp4" type="video/mp4" />
            </video>
          </motion.div>

          <div className="relative z-10 text-center text-white px-4">
            <motion.span
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="block text-[8px] md:text-[10px] tracking-[0.4em] md:tracking-[0.8em] uppercase mb-6 md:mb-8 font-medium"
            >
              Est. 2024 — Karjat's Hidden Jewel
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-6xl md:text-[8vw] font-serif italic leading-[1.1] md:leading-none"
            >
              Vrindavan <br /> <span className="text-2xl md:text-[4vw] font-light not-italic tracking-[0.1em] md:tracking-[0.2em] opacity-80 block mt-2 md:mt-0">Farms</span>
            </motion.h1>
          </div>

          <div className="absolute bottom-20 left-6 md:left-20 text-white/50 text-[8px] md:text-[10px] tracking-widest vertical-rl uppercase">
            Scroll to Breathe
          </div>
        </section>

        {/* 2. THE FLOATING GALLERY */}
        <section className="py-20 md:py-40 px-6 md:px-20 max-w-400 mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
              className="bg-green-900/5 p-8 md:p-12 rounded-sm"
            >
              <h2 className="text-3xl md:text-5xl font-serif mb-6 md:mb-8 leading-tight">Nature is the <br /> Only Architect.</h2>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed font-light italic mb-8">
                We didn't build Vrindavan; we simply carved a path through the existing beauty. Five sanctuaries tucked away, where the only alarm clock is the morning sun hitting the orchard.
              </p>
              <div className="flex flex-col gap-6 items-start">
                <motion.a
                  href="/rooms"
                  whileHover={{ y: -2 }}
                  className="w-full md:w-auto text-center px-10 py-4 bg-green-900 text-white text-[10px] font-bold uppercase tracking-[0.3em] rounded-sm hover:bg-orange-700 transition-colors shadow-xl"
                >
                  Explor Farm
                </motion.a>

                {/* <a href="/map" className="inline-block border-b border-green-900/20 pb-1 text-[10px] font-medium uppercase tracking-widest text-gray-400 hover:text-green-900 hover:border-green-900 transition-all">
                  View Estate Map
                </a> */}
              </div>
            </motion.div>
          </div>

          <div className="md:col-span-7 grid grid-cols-2 gap-4">
            <div className="space-y-4 pt-10 md:pt-20">
              <motion.img src="/hero/farm.jpg" className="w-full aspect-3/4 object-cover rounded-sm shadow-xl" whileHover={{ scale: 0.98 }} />
              <motion.img src="/hero/farm1.jpg" className="w-full aspect-square object-cover rounded-sm" whileHover={{ scale: 0.98 }} />
            </div>
            <div className="space-y-4">
              <motion.img src="/hero/farm2.jpg" className="w-full aspect-square object-cover rounded-sm" whileHover={{ scale: 0.98 }} />
              <motion.img src="/hero/farm4.jpg" className="w-full aspect-3/4 object-cover rounded-sm shadow-xl" whileHover={{ scale: 0.98 }} />
            </div>
          </div>
        </section>

        {/* 3. THE "GRAND LAWN" EVENTS */}
        <section className="py-20 md:py-40 bg-[#fdfcf7] px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 gap-8">
              <div className="max-w-2xl">
                <span className="text-orange-700 font-bold text-[10px] uppercase tracking-[0.4em] mb-4 block">The Grand Lawn</span>
                <h2 className="text-4xl md:text-8xl font-serif italic text-green-900 leading-[1.1] md:leading-[0.9]">
                  20,000 Sq.Ft of <br className="hidden md:block" /> Infinite Space.
                </h2>
                <div className="mt-8 md:mt-12 flex flex-col md:flex-row gap-6 items-start md:items-center">
                  <motion.a
                    href="/events"
                    whileHover={{ y: -2 }}
                    className="w-full md:w-auto text-center px-10 py-4 bg-green-900 text-white text-[10px] font-bold uppercase tracking-[0.3em] rounded-sm hover:bg-orange-700 transition-colors shadow-xl"
                  >
                    Plan an Occasion
                  </motion.a>

                  <a href="/gallery" className="group flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-green-900">
                    Tour the Grounds
                    <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
                  </a>
                </div>
              </div>
              <p className="text-gray-500 font-light italic text-base md:text-lg max-w-xs border-l border-green-900/20 pl-6">
                "A vast emerald canvas designed for your most significant milestones."
              </p>
            </div>

            <div className="grid md:grid-cols-12 gap-6 md:gap-10">
              {/* Big Feature: Weddings */}
              <motion.div
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                className="md:col-span-8 group cursor-pointer relative z-10"
              >
                <div className="relative h-80 md:h-175 overflow-hidden rounded-sm">
                  <img src="/hero/wedding.jpg" className="w-full h-full object-cover transition duration-1000 group-hover:scale-105" alt="Weddings" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all"></div>
                  <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 text-white">
                    <h3 className="text-3xl md:text-5xl font-serif italic">Weddings</h3>
                    <p className="text-[10px] uppercase tracking-widest mt-2 opacity-80">The Signature Al Fresco Union</p>
                  </div>
                </div>
              </motion.div>

              {/* Small Feature: Birthdays */}
              <motion.div
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                className="md:col-span-4 mt-0 md:mt-20 group cursor-pointer"
              >
                <div className="relative h-80 md:h-125 overflow-hidden rounded-sm">
                  <img src="/hero/bday.jpg" className="w-full h-full object-cover transition duration-1000 group-hover:scale-105" alt="Birthdays" />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-all"></div>
                  <div className="absolute top-10 left-6 md:top-18 md:left-9 text-white">
                    <h3 className="text-2xl md:text-3xl font-serif italic">Birthdays</h3>
                    <p className="text-[10px] uppercase tracking-widest mt-2 opacity-80">
                      Intimate sunset gatherings.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Medium Feature: Corporate */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="md:col-span-5 group cursor-pointer"
              >
                <div className="relative h-80 md:h-112.5 overflow-hidden rounded-sm">
                  <img src="/hero/corp.jpg" className="w-full h-full object-cover transition duration-1000 group-hover:scale-105" alt="Corporate" />
                  <div className="absolute inset-0 bg-linear-to-b from-black/50 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-all"></div>
                  <div className="absolute top-6 left-6 md:top-10 md:left-10 right-10 flex items-start justify-between z-10 text-white">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-serif italic leading-none">Off-sites</h3>
                      <p className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] mt-3 opacity-80">
                        Recharge. Refocus.
                      </p>
                    </div>
                    <span className="text-[9px] font-bold uppercase tracking-[0.3em] border-b border-white/40 pb-1">Explore</span>
                  </div>
                </div>
              </motion.div>

              {/* Large Feature: Receptions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="md:col-span-7 group cursor-pointer relative z-0"
              >
                <div className="relative h-80 md:h-137.5 overflow-hidden rounded-sm">
                  <img src="/hero/reception.jpg" className="w-full h-full object-cover transition duration-1000 group-hover:scale-105" alt="Receptions" />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-all"></div>
                  <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 text-white">
                    <h3 className="text-3xl md:text-4xl font-serif italic">Receptions</h3>
                    <p className="text-[10px] uppercase tracking-widest mt-2 opacity-80">Grand Galas</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 4. THE AMENITIES "PULSE" */}
        <section className="py-20 md:py-40 bg-[#fdfcf7] px-4 md:px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-12 gap-8 md:gap-20 items-start">
            <div className="col-span-12 md:col-span-5 md:sticky md:top-40">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <span className="text-orange-600 font-bold text-[10px] uppercase tracking-widest">
                  The Experience
                </span>
                <h2 className="text-4xl md:text-6xl font-serif mt-4 mb-8 italic leading-tight">
                  The Pulse <br className="hidden md:block" /> of Vrindavan
                </h2>

                <div className="space-y-4 md:space-y-6">
                  {["Pool", "Rain", "Music", "Games"].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 md:gap-6 group cursor-pointer border-b border-black/5 pb-4">
                      <span className="text-[10px] font-bold text-gray-300 group-hover:text-green-900 transition-colors">
                        0{i + 1}
                      </span>
                      <h4 className="text-xl md:text-2xl font-serif group-hover:translate-x-2 transition-transform duration-500">
                        {item}
                      </h4>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            <div className="col-span-12 md:col-span-7 grid gap-10 md:gap-24">
              <ScrollRevealImage src="/hero/pool.jpg" speed={-2} />
              <ScrollRevealImage src="/hero/rain.jpg" speed={2} />
              <ScrollRevealImage src="/hero/nature.jpg" speed={1} />
              <ScrollRevealImage src="/hero/game.jpg" speed={3} />
            </div>
          </div>
        </section>

        

        {/* 5. THE "RECONNECT" CALL TO ACTION */}
        <section className="py-24 md:py-40 bg-white border-t border-gray-100 text-center px-6">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-7xl font-serif mb-12 leading-tight">
                The kettle is on. <br /> <span className="italic">Where are you?</span>
            </h2>
            <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-6">
              {/* FIXED BUTTONS: Now using Link to navigate to the correct pages */}
              <Link 
                href="/packages" 
                className="w-full md:w-auto px-12 py-5 bg-green-900 text-white uppercase text-[10px] tracking-widest font-bold hover:bg-black transition-all flex items-center justify-center"
              >
                Book Overnight
              </Link>
              
              <Link 
                href="/events" 
                className="w-full md:w-auto px-12 py-5 border border-green-900 text-green-900 uppercase text-[10px] tracking-widest font-bold hover:bg-green-900 hover:text-white transition-all flex items-center justify-center"
              >
                Inquire for Events
              </Link>
            </div>
          </motion.div>
        </section>

      </main>
    </ParallaxProvider>
  );
}