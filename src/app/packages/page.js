"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

// --- DATA ---
const packages = [
    {
        id: "bungalow-stay",
        category: "Bungalow Stay",
        title: "Luxury Bungalow Rooms",
        tagline: "Choice of Ground Floor Veranda or 1st Floor Patio",
        capacity: "Up to 10 People per floor",
        pricing: {
            weekend: 2000,
            weekday: 1800,
            childWeekend: 1000,
            childWeekday: 900,
            minAdults: 10
        },
        images: ["/package/bungalow-g1.jpg", "/package/bungalow-f1.jpg"],
        features: ["Private Veranda/Patio", "Garden or Sunset Views"]
    },
    {
        id: "couple-room",
        category: "Private Stay",
        title: "Premium Couple Room",
        tagline: "Room with Private Garden",
        capacity: "1 Main Bed + 2 Extra Beds",
        pricing: {
            weekend: 5500,
            weekday: 4500,
            childWeekend: 1300,
            childWeekday: 1000,
            minAdults: 2
        },
        images: ["/package/couple1.jpg", "/package/couple2.jpg"],
        features: ["Private Garden", "En-suite Bath"]
    },
    {
        id: "cottages",
        category: "Lawn Stay",
        title: "Cottages with Private Lawn",
        tagline: "2 Standalone Cottage Rooms",
        capacity: "Accommodates 8-16 People",
        pricing: {
            weekend: 2000,
            weekday: 1800,
            childWeekend: 1000,
            childWeekday: 900,
            minAdults: 8
        },
        images: ["/package/cottage1.jpg", "/package/cottage2.jpg"],
        features: ["Private Lawn", "Rustic Design"]
    }
];

const experienceList = [
    { title: "Swimming Pool", detail: "A sparkling oasis for morning laps or afternoon lounging." },
    { title: "Rain Dance", detail: "Modern mist systems for a refreshing rhythmic escape." },
    { title: "Vast Lawns", detail: "Manicured greenery for events, sports, or quiet walks." },
    { title: "River Access", detail: "A gentle 2-minute stroll to the calming river banks." },
    { title: "Bonfire", detail: "Gather under the stars for stories and warmth." },
    { title: "Turf Sports", detail: "Dedicated space for professional-grade cricket and football." }
];

// --- HELPER COMPONENTS ---

function ImageSlideshow({ images, title }) {
    const [index, setIndex] = useState(0);
    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % images.length);
        }, 4000);
        return () => clearInterval(timer);
    }, [images.length]);

    return (
        <div className="h-full w-full relative overflow-hidden bg-gray-100">
            <AnimatePresence initial={false}>
                <motion.img
                    key={index}
                    src={images[index]}
                    alt={title}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2 }}
                    className="absolute inset-0 h-full w-full object-cover"
                />
            </AnimatePresence>
            <div className="absolute inset-0 bg-black/10 pointer-events-none" />
        </div>
    );
}

export default function ExperiencesPage() {
    const [isWeekend, setIsWeekend] = useState(true);
    const router = useRouter();

    return (
        <div className="bg-[#fdfcf7] min-h-screen pt-24 md:pt-32 pb-20 px-4 md:px-6 font-sans">
            <div className="max-w-7xl mx-auto">

                {/* 1. Header & Pricing Toggle */}
                <header className="text-center mb-12 md:mb-16">
                    <h1 className="text-4xl md:text-7xl font-serif mb-4 md:mb-6 text-green-950 leading-tight">Rates & Retreats</h1>

                    <div className="flex items-center justify-center gap-4 mb-6">
                        <span className={`text-[9px] md:text-[10px] font-bold tracking-widest transition-colors ${!isWeekend ? 'text-orange-600' : 'text-gray-400'}`}>WEEKDAYS</span>
                        <button
                            onClick={() => setIsWeekend(!isWeekend)}
                            className="w-12 h-6 bg-green-900 rounded-full relative p-1 transition-colors"
                        >
                            <motion.div
                                animate={{ x: isWeekend ? 24 : 0 }}
                                className="w-4 h-4 bg-white rounded-full shadow-md"
                            />
                        </button>
                        <span className={`text-[9px] md:text-[10px] font-bold tracking-widest transition-colors ${isWeekend ? 'text-orange-600' : 'text-gray-400'}`}>WEEKENDS</span>
                    </div>

                    <p className="text-[9px] md:text-[10px] text-gray-500 font-medium tracking-[0.15em] md:tracking-[0.2em] uppercase italic px-4">
                        *All stays include: Welcome Drink, Lunch, Dinner & Breakfast
                    </p>
                </header>

                {/* 2. Package Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mb-20 md:mb-32">
                    {packages.map((pkg) => (
                        <motion.div
                            key={pkg.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-white border border-gray-100 rounded-4xl overflow-hidden shadow-sm flex flex-col"
                        >
                            <div className="relative h-60 md:h-72">
                                <ImageSlideshow images={pkg.images} title={pkg.title} />
                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[8px] md:text-[9px] font-bold uppercase tracking-wider text-green-900">
                                    {pkg.category}
                                </div>
                            </div>

                            <div className="p-6 md:p-8 flex flex-col grow">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="flex-1">
                                        <h3 className="text-xl md:text-2xl font-serif text-green-900 leading-tight">{pkg.title}</h3>
                                        <p className="text-[10px] md:text-xs text-gray-500 font-medium mt-1">{pkg.tagline}</p>
                                    </div>
                                    <div className="text-right ml-4">
                                        <p className="text-xl md:text-2xl font-serif text-green-800">
                                            ₹{isWeekend ? pkg.pricing.weekend.toLocaleString() : pkg.pricing.weekday.toLocaleString()}
                                        </p>
                                        <p className="text-[8px] md:text-[9px] text-gray-400 uppercase font-bold tracking-widest mt-1">
                                            {pkg.id === 'couple-room' ? 'Per Couple' : 'Per Person'}
                                        </p>
                                    </div>
                                </div>

                                {/* Gray Capacity Box */}
                                <div className="bg-gray-50 rounded-2xl p-4 mb-6 grid grid-cols-2 gap-4 border border-gray-100">
                                    <div>
                                        <p className="text-[8px] md:text-[9px] font-bold text-gray-400 uppercase mb-1">Capacity</p>
                                        <p className="text-[11px] md:text-xs text-gray-700 font-bold">{pkg.capacity}</p>
                                    </div>
                                    <div>
                                        <p className="text-[8px] md:text-[9px] font-bold text-gray-400 uppercase mb-1">Child Rate</p>
                                        <p className="text-[11px] md:text-xs text-gray-700 font-bold">
                                            ₹{isWeekend ? pkg.pricing.childWeekend : pkg.pricing.childWeekday}
                                        </p>
                                    </div>
                                </div>

                                {/* Bullet Features */}
                                <ul className="space-y-2.5 mb-8">
                                    {pkg.features.map((feat, i) => (
                                        <li key={i} className="text-xs text-gray-600 flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 bg-orange-400 rounded-full shrink-0" /> {feat}
                                        </li>
                                    ))}
                                    <li className="text-xs text-green-700 font-bold flex items-center gap-2">
                                        <span className="text-sm">✓</span> Meals Included
                                    </li>
                                </ul>

                                {/* BUTTON */}
                                <button
                                    onClick={() => router.push(`/booking?room=${pkg.id}`)}
                                    className="mt-auto w-full py-4 rounded-xl font-bold uppercase text-[10px] tracking-[0.2em] transition-all duration-300
                                    bg-green-800 text-white active:scale-[0.98]
                                        md:bg-transparent md:text-green-800 md:border-2 md:border-green-800 
                                        md:hover:bg-green-800 md:hover:text-white">
                                    Book {pkg.title}
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* 3. The Experience Section */}
                <section className="py-16 md:py-24 border-t border-gray-100">
                    <div className="grid lg:grid-cols-12 gap-12 md:gap-16 items-start">

                        {/* Left Column */}
                        <div className="lg:col-span-4 lg:sticky lg:top-32">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                <span className="text-orange-500 font-bold text-[9px] md:text-[10px] tracking-[0.4em] uppercase mb-4 block">
                                    The Estate Life
                                </span>
                                <h2 className="text-4xl md:text-6xl font-serif text-green-950 leading-[1.1] mb-6 md:mb-8">
                                    Included <br />
                                    <span className="italic font-light text-green-800">Experiences</span>
                                </h2>
                                <div className="h-px w-20 md:w-24 bg-green-900/20 mb-6 md:mb-8" />
                                <p className="text-gray-500 text-sm leading-relaxed max-w-sm">
                                    Beyond your private sanctuary lies 20,000 square feet of curated nature.
                                    Every amenity is designed for deep reconnection.
                                </p>
                            </motion.div>
                        </div>

                        {/* Right Column */}
                        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 md:gap-y-4">
                            {experienceList.map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.05, duration: 0.5 }}
                                    className="group relative p-6 md:p-8 rounded-2xl hover:bg-green-50/50 transition-colors duration-500"
                                >
                                    <span className="absolute top-6 right-6 md:top-8 md:right-8 text-2xl md:text-3xl font-serif text-green-900/5 group-hover:text-orange-500/10 transition-colors duration-500">
                                        0{idx + 1}
                                    </span>

                                    <div className="relative z-10">
                                        <h4 className="text-green-900 font-bold text-xs md:text-sm uppercase tracking-[0.15em] md:tracking-[0.2em] mb-2 md:mb-3 flex items-center gap-3">
                                            <span className="w-3 md:w-4 h-0.5 bg-orange-400 group-hover:w-10 transition-all duration-500 ease-out shrink-0"></span>
                                            {item.title}
                                        </h4>
                                        <p className="text-gray-500 text-[12px] md:text-[13px] pl-6 md:pl-7 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                                            {item.detail}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                    </div>
                </section>

            </div>
        </div>
    );
}