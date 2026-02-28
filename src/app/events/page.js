"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function EventsPage() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const phoneNumber = `+${whatsappNumber}`

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 1.1]);

  const getWhatsAppLink = (eventType) => {
    const message =
      `*ESTATE EVENT INQUIRY*%0A` +
      `--------------------------%0A` +
      `*Interested In:* ${eventType}%0A%0A` +
      `Hello! I was exploring your website and would like to inquire about hosting an event at your estate. %0A%0A` +
      `Could you please share:%0A` +
      `• Availability for upcoming dates%0A` +
      `• Event packages & pricing%0A` +
      `• Site visit procedures%0A%0A` +
      `Looking forward to hearing from you.`;

    return `https://wa.me/${whatsappNumber}?text=${message}`;
  };

  return (
    <main ref={containerRef} className="bg-[#fdfcf7] min-h-screen pb-10 md:pb-20 overflow-hidden font-sans">

      {/* 1. HERO SECTION */}
      <section className="relative min-h-[80vh] md:h-[90vh] flex flex-col justify-center px-4 md:px-6 py-20">
        <div className="max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <span className="text-orange-500 font-bold text-[9px] md:text-[10px] tracking-[0.4em] md:tracking-[0.5em] uppercase mb-4 md:mb-6 block">
              Private Estate • Maharashtra
            </span>
            <h1 className="text-[16vw] md:text-[8vw] font-serif text-green-950 leading-[0.9] md:leading-[0.85] tracking-tighter mb-8 md:mb-10">
              Made for <br />
              <span className="italic font-light text-green-800/70">Celebration.</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8"
          >
            <p className="text-gray-500 max-w-sm text-sm leading-relaxed border-l-2 border-orange-200 pl-6">
              From sun-drenched garden weddings to intimate birthday soirees, our 20,000 sq. ft. estate is a playground for the imagination.
            </p>
            <div className="hidden md:block text-right">
              <p className="text-[10px] font-black uppercase tracking-widest text-green-900 mb-2">Scroll to explore</p>
              <div className="w-[1px] h-12 bg-green-900/20 mx-auto mr-0"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. THE BIG CANVAS */}
      <section className="px-2 md:px-4 mb-20 md:mb-40">
        <div className="relative h-[60vh] md:h-[90vh] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl">
          <motion.img
            style={{ scale }}
            src="/lawn.jpg"
            className="w-full h-full object-cover"
            alt="The Grand Lawn"
          />
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-center text-white px-6"
            >
              <h2 className="text-4xl md:text-8xl font-serif italic mb-3 md:mb-4">The Grand Lawn</h2>
              <p className="uppercase tracking-[0.3em] md:tracking-[0.4em] text-[8px] md:text-[10px] font-bold opacity-90">Uninterrupted Luxury under the sky</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. CORE OFFERINGS */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 mb-20 md:mb-40">
        <div className="space-y-24 md:space-y-40">

          {/* 1. WEDDINGS & RECEPTIONS */}
          <div className="grid md:grid-cols-2 gap-10 md:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-4 md:space-y-6 order-1"
            >
              <div className="flex items-center gap-4">
                <div className="h-px w-8 md:w-10 bg-orange-300" />
                <span className="text-[10px] md:text-xs text-orange-600 font-bold uppercase tracking-[0.3em]">Sanctuary</span>
              </div>
              <h3 className="text-3xl md:text-5xl font-serif text-green-950 leading-tight">Weddings <span className="italic text-green-800">&</span> Receptions</h3>
              <p className="text-gray-500 text-sm leading-relaxed pb-4 md:pb-6">
                Exchange vows under the golden sun and transition seamlessly into a grand evening reception. Our sprawling lawns provide a natural, elegant backdrop for ceremonies of up to 500 guests.
              </p>
              <a href={getWhatsAppLink("Wedding or Reception")} className="inline-block px-8 md:px-10 py-4 bg-green-900 text-white rounded-full font-bold uppercase text-[9px] md:text-[10px] tracking-widest transition-all active:scale-95 shadow-xl">
                Inquire Personally
              </a>
            </motion.div>

            <div className="grid grid-cols-2 gap-4 md:gap-6 items-start order-2">
              <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="aspect-[3/4] rounded-2xl md:rounded-3xl overflow-hidden shadow-xl">
                <img src="/hero/wedding.jpg" className="w-full h-full object-cover" alt="Wedding ceremony" />
              </motion.div>
              <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="aspect-[3/4] rounded-2xl md:rounded-3xl overflow-hidden shadow-xl mt-8 md:mt-16">
                <img src="/hero/reception.jpg" className="w-full h-full object-cover" alt="Evening reception" />
              </motion.div>
            </div>
          </div>

          {/* 2. BIRTHDAY SOIREE */}
          <div className="grid md:grid-cols-2 gap-10 md:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-4 md:space-y-6 order-1 md:order-2"
            >
              <div className="flex items-center gap-4">
                <span className="text-[10px] md:text-xs text-orange-600 font-bold uppercase tracking-[0.3em]">Milestones</span>
                <div className="h-px w-8 md:w-10 bg-orange-300" />
              </div>
              <h3 className="text-3xl md:text-5xl font-serif text-green-950 leading-tight">Birthday <span className="italic text-green-800">Soirees</span></h3>
              <p className="text-gray-500 text-sm leading-relaxed pb-4 md:pb-6">
                Celebrate your milestone in a sanctuary of privacy. Whether it’s a themed garden party or an intimate dinner under the stars, we make every year feel like a masterpiece.
              </p>
              <a href={getWhatsAppLink("Birthday Soiree")} className="inline-block px-8 md:px-10 py-4 bg-green-900 text-white rounded-full font-bold uppercase text-[9px] md:text-[10px] tracking-widest transition-all active:scale-95 shadow-xl">
                Inquire Personally
              </a>
            </motion.div>

            <div className="grid grid-cols-2 gap-4 md:gap-6 items-end order-2 md:order-1">
              <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="aspect-[3/4] rounded-2xl md:rounded-3xl overflow-hidden shadow-xl mb-8 md:mb-16">
                <img src="/hero/birthday.jpg" className="w-full h-full object-cover" alt="Birthday celebration" />
              </motion.div>
              <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="aspect-[3/4] rounded-2xl md:rounded-3xl overflow-hidden shadow-xl">
                <img src="/hero/bday.jpg" className="w-full h-full object-cover" alt="Decor details" />
              </motion.div>
            </div>
          </div>

          {/* 3. CORPORATE & PRIVATE EVENTS */}
          <div className="grid md:grid-cols-2 gap-10 md:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-4 md:space-y-6 order-1"
            >
              <div className="flex items-center gap-4">
                <div className="h-px w-8 md:w-10 bg-orange-300" />
                <span className="text-[10px] md:text-xs text-orange-600 font-bold uppercase tracking-[0.3em]">Gatherings</span>
              </div>
              <h3 className="text-3xl md:text-5xl font-serif text-green-950 leading-tight">Events <span className="italic text-green-800">&</span> Offsites</h3>
              <p className="text-gray-500 text-sm leading-relaxed pb-4 md:pb-6">
                Host an event that stays with people. From corporate retreats that inspire creativity to large-scale private parties, our estate offers the ultimate open-air canvas.
              </p>
              <a href={getWhatsAppLink("Corporate Event or Offsite")} className="inline-block px-8 md:px-10 py-4 bg-green-900 text-white rounded-full font-bold uppercase text-[9px] md:text-[10px] tracking-widest transition-all active:scale-95 shadow-xl">
                Inquire Personally
              </a>
            </motion.div>

            <div className="grid grid-cols-2 gap-4 md:gap-6 items-start order-2">
              <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="aspect-[3/4] rounded-2xl md:rounded-3xl overflow-hidden shadow-xl">
                <img src="/hero/corp.jpg" className="w-full h-full object-cover" alt="Corporate offsite" />
              </motion.div>
              <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="aspect-[3/4] rounded-2xl md:rounded-3xl overflow-hidden shadow-xl mt-8 md:mt-16">
                <img src="/hero/party.jpg" className="w-full h-full object-cover" alt="Garden party" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE CONCIERGE (Footer) */}
      <section className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="bg-green-950 rounded-[2.5rem] md:rounded-[3rem] p-10 md:p-24 relative overflow-hidden text-center text-white">
          <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40vw] md:text-[30vw] font-serif italic whitespace-nowrap">
              Contact Us
            </div>
          </div>

          <div className="relative z-10">
            <motion.h2
              whileInView={{ y: [20, 0], opacity: [0, 1] }}
              className="text-3xl md:text-6xl font-serif mb-6 md:mb-8 leading-tight"
            >
              Let's craft your <br /><span className="italic text-orange-400">perfect day.</span>
            </motion.h2>

            <p className="text-green-100/60 max-w-sm mx-auto text-xs md:text-sm mb-10 md:mb-12 font-light">
              We skip the forms for a reason. Experience personal coordination with our estate manager.
            </p>

            <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-6">
              <a
                href={getWhatsAppLink("General Event Inquiry")}
                className="group relative px-10 md:px-12 py-5 bg-white text-green-950 rounded-full font-bold uppercase text-[9px] md:text-[10px] tracking-[0.2em] md:tracking-[0.3em] overflow-hidden transition-all active:scale-95"
              >
                <span className="relative z-10">WhatsApp Concierge</span>
                <div className="hidden md:block absolute inset-0 bg-orange-400 translate-y-[101%] group-hover:translate-y-0 transition-transform duration-300" />
              </a>

              <a
                href={`tel:${phoneNumber}`}
                className="px-10 md:px-12 py-5 border border-white/30 text-white rounded-full font-bold uppercase text-[9px] md:text-[10px] tracking-[0.2em] md:tracking-[0.3em] hover:bg-white/10 transition-all active:scale-95"
              >
                Schedule a Call
              </a>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}