"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

// --- DATA ---
const estateHighlights = [
  {
    id: 1,
    title: "The Heritage Bungalows",
    tagline: "Spacious Comfort for the Whole Tribe",
    desc: "Two grand bungalows designed for reunions. Open halls, private balconies, and enough room for 15+ guests to create memories together.",
    images: ["/room/bungalow1.jpg", "/room/bungalow-inside.jpg", "/room/bungalow-inside2.jpg", "/room/bungalow-balcony.jpg", "/room/bungalow-hall.jpg"],
    side: "left"
  },
  {
    id: 2,
    title: "The Private Cottages",
    tagline: "Luxurious comfort meets wilderness adventure",
    desc: "Our private cottages offer the raw beauty of nature without sacrificing the soft linens and comfort you crave.",
    images: ["/room/cottage1.jpg", "/room/cottage-bed.jpg", "/room/cottage-bed2.jpg", "/room/cottage-view.jpg"],
    side: "right"
  },
  {
    id: 3,
    title: "The Grand Lawns",
    tagline: "20,000 Sq. Ft. of Pure Greenery",
    desc: "A vast expanse for weddings, late-night bonfires, or simply running free. Decoration-friendly and vast enough for any celebration.",
    images: ["/room/lawn.jpg", "/room/lawn-event.jpg", "/room/lawn-night.jpg"],
    side: "left"
  }
];

const activities = [
  { name: "Swimming Pool", img: "/room/pool.jpg" },
  { name: "Rain Dance", img: "/room/rain.jpg" },
  { name: "Multiple Lawns", img: "/room/lawn.jpg" },
  { name: "Bonfire Night", img: "/room/bonfire.jpg" },
  { name: "Private Gardens", img: "/room/garden.jpg" },
  { name: "Cricket", img: "/room/cricket.jpg" }
];

// --- COMPONENTS ---
function FeatureSlideshow({ images }) {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % images.length);
  const prev = () => setIndex((prev) => (prev - 1 + images.length) % images.length);

  const onDragEnd = (event, info) => {
    if (info.offset.x < -50) next(); 
    if (info.offset.x > 50) prev();  
  };

  return (
    <div className="relative group overflow-hidden rounded-xl shadow-2xl h-full w-full bg-gray-200 touch-none">
      <AnimatePresence mode="wait">
        <motion.img
          key={index}
          src={images[index]}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={onDragEnd}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 w-full h-full object-cover cursor-grab active:cursor-grabbing"
        />
      </AnimatePresence>

      <div className="hidden md:flex absolute inset-0 items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button 
          onClick={(e) => { e.stopPropagation(); prev(); }} 
          className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-green-800 hover:text-white transition"
        >
          ←
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); next(); }} 
          className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-green-800 hover:text-white transition"
        >
          →
        </button>
      </div>

      <div className="md:hidden absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
         {images.map((_, i) => (
          <div 
            key={i} 
            className={`h-1 rounded-full transition-all duration-300 ${
              i === index ? "w-6 bg-white shadow-sm" : "w-1.5 bg-white/50"
            }`} 
          />
        ))}
      </div>

      <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md text-white text-[8px] tracking-[0.2em] px-2 py-1 rounded uppercase font-bold pointer-events-none">
        {index + 1} / {images.length}
      </div>
    </div>
  );
}

export default function RoomsPage() {
  const router = useRouter();

  return (
    <div className="bg-[#fdfcf7] min-h-screen pt-24 md:pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* 1. HEADER */}
        <header className="text-center mb-16 md:mb-24">
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="uppercase tracking-[0.3em] md:tracking-[0.5em] text-[8px] md:text-[10px] text-green-800 font-bold mb-4">The Estate Tour</motion.p>
          <h1 className="text-5xl md:text-8xl font-serif text-gray-900 leading-[1.1] md:leading-tight">More Than Just <br /> <span className="italic">A Place to Stay</span></h1>
        </header>

        {/* 2. SANCTUARIES SECTION */}
        <div className="space-y-16 md:space-y-48 mb-24 md:mb-40">
          {estateHighlights.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className={`flex flex-row ${item.side === 'right' ? 'flex-row-reverse' : 'flex-row'} items-center gap-4 md:gap-24`}
            >
              {/* Image Side */}
              <div className="flex-1 relative w-1/2">
                <div className="h-50 sm:h-75 md:h-125 w-full">
                  <FeatureSlideshow images={item.images} />
                </div>
              </div>

              {/* Text Side */}
              <div className="flex-1 text-left space-y-2 md:space-y-6 w-1/2">
                <div>
                  <h2 className="text-xl sm:text-3xl md:text-6xl font-serif text-green-900 leading-tight">{item.title}</h2>
                  <p className="text-orange-500 font-bold uppercase tracking-widest text-[7px] md:text-[10px] mt-1">{item.tagline}</p>
                </div>

                <p className="text-gray-600 leading-tight md:leading-relaxed text-[9px] sm:text-xs md:text-lg italic line-clamp-3 md:line-clamp-none">
                  {item.desc}
                </p>

                <div className="pt-2 md:pt-4 flex flex-col md:flex-row items-start md:items-center gap-4">
                  <button
                    onClick={() => {
                      if (item.title === "The Grand Lawns") {
                        router.push('/events');
                      } else {
                        router.push('/packages');
                      }
                    }}
                    className="px-3 py-1.5 md:px-8 md:py-3 bg-green-900 text-white text-[7px] md:text-[10px] font-bold uppercase tracking-[0.2em] rounded-full hover:bg-orange-700 transition-all shadow-lg active:scale-95"
                  >
                    {item.title === "The Grand Lawns" ? "Plan an Event" : "Book Your Stay"}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 3. SIMPLE PLEASURES */}
        <section className="py-16 md:py-24 border-t border-green-900/10">
          <div className="text-center mb-12 md:mb-16 space-y-4">
            <span className="text-orange-600 text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] md:tracking-[0.5em] block">The Living Farm</span>
            <h2 className="text-3xl md:text-5xl font-serif text-green-900">Simple <span className="italic font-light opacity-70">Pleasures.</span></h2>
            <p className="text-gray-500 text-xs md:text-sm font-light max-w-sm mx-auto leading-relaxed italic px-4">
              From the morning dew on the lawns to the crackle of the night fire, every moment here is an invitation to slow down.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-10">
            {activities.map((act, i) => (
              <motion.div key={i} className="group cursor-pointer">
                <div className="relative aspect-square overflow-hidden rounded-xl md:rounded-2xl bg-white shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-all duration-500 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] group-hover:-translate-y-2">
                  <img src={act.img} alt={act.name} className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110" />
                  <div className="absolute inset-x-0 bottom-0 bg-white py-3 md:py-6 text-center">
                    <h3 className="text-[8px] md:text-[11px] font-bold uppercase tracking-widest md:tracking-[0.3em] text-green-900 group-hover:text-orange-700 transition-colors">{act.name}</h3>
                    <div className="mt-1 md:mt-2 h-px w-3 md:w-4 bg-orange-300 mx-auto transition-all duration-500 group-hover:w-10" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 4. FOOTER */}
        <footer className="text-center mt-24 md:mt-40">
          <h3 className="text-2xl md:text-3xl font-serif mb-6 md:mb-8 italic text-gray-800">Ready to write your own story?</h3>
          <button onClick={() => router.push('/booking')} className="px-10 py-4 md:px-16 md:py-5 bg-green-800 text-white uppercase text-[10px] md:text-xs tracking-[0.3em] md:tracking-[0.4em] font-bold hover:bg-black transition duration-500 rounded-full shadow-xl w-full md:w-auto">
            Secure Your Dates
          </button>
        </footer>

      </div>
    </div>
  );
}