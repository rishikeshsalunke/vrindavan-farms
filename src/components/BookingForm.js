"use client";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function BookingForm({ initialRoom = "" }) {
  const todayStr = new Date().toISOString().split("T")[0];
const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

  const [bookingData, setBookingData] = useState({
    date: "",
    roomType: initialRoom,
    bookingType: "stay",
    adults: initialRoom === "couple_room" ? 2 : (initialRoom === "bungalow" ? 10 : (initialRoom === "cottage" ? 8 : 1)), 
    children: 0,
    guestName: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});
  const [pricing, setPricing] = useState({ total: 0, advance: 0 });

  // 1. Logic for Minimums & Constraints
  useEffect(() => {
    const { bookingType, roomType, adults } = bookingData;
    
    if (bookingType === "stay" && roomType) {
      if (roomType === "bungalow" && adults < 10 && adults > 0) {
        toast.error("Bungalow requires minimum 10 adults", { id: "min-bungalow" });
        setBookingData((prev) => ({ ...prev, adults: 10 }));
      } else if (roomType === "cottage" && adults < 8 && adults > 0) {
        toast.error("Cottage requires minimum 8 adults", { id: "min-cottage" });
        setBookingData((prev) => ({ ...prev, adults: 8 }));
      } else if (roomType === "couple_room" && adults < 2 && adults > 0) {
        setBookingData((prev) => ({ ...prev, adults: 2 }));
      }
    } else if (bookingType === "day_picnic" && adults < 8 && adults > 0) {
      toast.error("Day Picnic requires minimum 8 adults", { id: "min-picnic" });
      setBookingData((prev) => ({ ...prev, adults: 8 }));
    }
  }, [bookingData.roomType, bookingData.bookingType, bookingData.adults]);

  // 2. Pricing Logic
  useEffect(() => {
    const { date, roomType, bookingType, adults, children } = bookingData;
    if (!date) return;

    const isWeekend = [0, 5, 6].includes(new Date(date).getDay());
    let total = 0;

    if (bookingType === "day_picnic") {
      total = (Number(adults) + Number(children)) * 1200;
    } else {
      if (!roomType) return;
      const rate = isWeekend ? 2000 : 1800;
      const childRate = isWeekend ? 1000 : 900;

      if (roomType === "bungalow" || roomType === "cottage") {
        total = (adults * rate) + (children * childRate);
      } else if (roomType === "couple_room") {
        const numRooms = Math.ceil(adults / 2);
        const roomPrice = isWeekend ? 5500 : 4500;
        const extraChildRate = isWeekend ? 1300 : 1000;
        total = (numRooms * roomPrice) + (children * extraChildRate);
      }
    }

    setPricing({ total, advance: total * 0.5 });
  }, [bookingData]);

  const handleAdultChange = (val) => {
    let newValue = parseInt(val) || 0;
    
    if (bookingData.roomType === "couple_room") {
      if (newValue < 2 && newValue !== 0) newValue = 2;
      if (newValue % 2 !== 0 && newValue !== 0) {
        newValue = newValue > bookingData.adults ? newValue + 1 : newValue - 1;
      }
    }
    
    setBookingData({ ...bookingData, adults: newValue });
  };

  const validateForm = () => {
    let tempErrors = {};
    if (!bookingData.guestName.trim()) tempErrors.guestName = "Name is required";
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(bookingData.phone)) tempErrors.phone = "Invalid 10-digit number";
    if (!bookingData.date) tempErrors.date = "Select a date";
    if (bookingData.bookingType === "stay" && !bookingData.roomType) tempErrors.roomType = "Select room type";
    
    if (bookingData.bookingType === "stay") {
        if (bookingData.roomType === "bungalow" && bookingData.adults < 10) tempErrors.adults = "Min 10 required";
        if (bookingData.roomType === "cottage" && bookingData.adults < 8) tempErrors.adults = "Min 8 required";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleWhatsAppSubmit = () => {
    if (!validateForm()) {
      toast.error("Please fill all required fields correctly");
      return;
    }

    const tripName = bookingData.bookingType === "day_picnic" ? "☀️ Day Picnic" : `🏡 Stay (${bookingData.roomType})`;
    const message =
      `*NEW BOOKING REQUEST*%0A` +
      `--------------------------%0A` +
      `*Guest:* ${bookingData.guestName}%0A` +
      `*Phone:* ${bookingData.phone}%0A` +
      `*Date:* ${bookingData.date}%0A` +
      `*Trip:* ${tripName}%0A` +
      `*Group:* ${bookingData.adults} Adults, ${bookingData.children} Children%0A` +
      `--------------------------%0A` +
      `*Total Quote:* ₹${pricing.total}%0A` +
      `*Advance to Pay:* ₹${pricing.advance}%0A` +
      `--------------------------%0A` +
      `Hello, I would like to book for the above details. Please confirm availability.`;

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md mx-auto border border-gray-100">
      <Toaster position="top-center" reverseOrder={false} />
      <h2 className="font-serif text-2xl text-green-950 mb-6 text-center">Book Your Sanctuary</h2>

      <div className="space-y-4 mb-4">
        <input
          type="text" placeholder="Full Name"
          value={bookingData.guestName}
          className={`w-full p-3 border rounded-xl outline-none transition-all ${errors.guestName ? "border-red-500 bg-red-50" : "border-gray-200 focus:border-green-600"}`}
          onChange={(e) => setBookingData({ ...bookingData, guestName: e.target.value.replace(/[0-9]/g, "") })}
        />
        <input
          type="tel" placeholder="WhatsApp Number" maxLength={10}
          value={bookingData.phone}
          className={`w-full p-3 border rounded-xl outline-none transition-all ${errors.phone ? "border-red-500 bg-red-50" : "border-gray-200 focus:border-green-600"}`}
          onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value.replace(/\D/g, "") })}
        />
      </div>

      <div className="mb-4">
        <label className="block text-[10px] uppercase font-bold text-gray-400 mb-2 tracking-widest">Check-In Date</label>
        <input
          type="date" min={todayStr}
          className={`w-full p-3 border rounded-xl outline-none ${errors.date ? "border-red-500" : "border-gray-200 focus:border-green-600"}`}
          onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
        />
      </div>

      <div className="mb-4">
        <label className="block text-[10px] uppercase font-bold text-gray-400 mb-2 tracking-widest">Trip Type</label>
        <div className="grid grid-cols-2 gap-2">
          {["stay", "day_picnic"].map((type) => (
            <button key={type} type="button" onClick={() => setBookingData({ ...bookingData, bookingType: type, roomType: type === 'day_picnic' ? '' : bookingData.roomType })}
              className={`p-3 rounded-xl text-xs font-bold border transition-all uppercase tracking-tighter ${bookingData.bookingType === type ? "bg-green-950 text-white border-green-950 shadow-md" : "bg-white text-gray-400 border-gray-200"}`}>
              {type.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>

      {bookingData.bookingType === "stay" && (
        <div className="mb-4 animate-in fade-in slide-in-from-top-2">
          <select
            value={bookingData.roomType}
            className={`w-full p-3 border rounded-xl outline-none bg-white text-sm ${errors.roomType ? "border-red-500" : "border-gray-200 focus:border-green-600"}`}
            onChange={(e) => {
              const newRoom = e.target.value;
              let newAdults = bookingData.adults;
              if (newRoom === 'couple_room' && newAdults % 2 !== 0) newAdults += 1;
              if (newRoom === 'bungalow' && newAdults < 10) newAdults = 10;
              if (newRoom === 'cottage' && newAdults < 8) newAdults = 8;
              setBookingData({ ...bookingData, roomType: newRoom, adults: newAdults });
            }}>
            <option value="" disabled hidden>-- Choose Your Space --</option>
            <option value="bungalow">Bungalow (Min 10)</option>
            <option value="cottage">Cottage (Min 8)</option>
            <option value="couple_room">Couple Room (Pairs only)</option>
          </select>
          {errors.roomType && <p className="text-[10px] text-red-500 mt-1 ml-2">{errors.roomType}</p>}
        </div>
      )}

      {bookingData.bookingType === "day_picnic" && (
        <div className="mb-4 p-4 bg-blue-50 border border-blue-100 rounded-2xl animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center gap-3">
                <span className="text-xl">☀️</span>
                <div>
                    <p className="text-[10px] font-bold text-blue-800 uppercase">Day Picnic (9 AM – 5 PM)</p>
                    <p className="text-[11px] text-blue-600">Includes Breakfast & Lunch | ₹1200 pp</p>
                </div>
            </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Adults</label>
          <input
            type="number"
            value={bookingData.adults}
            step={bookingData.roomType === "couple_room" ? "2" : "1"}
            className={`w-full p-3 border rounded-xl focus:border-green-600 outline-none ${errors.adults ? 'border-red-500 bg-red-50' : 'border-gray-200'}`}
            onChange={(e) => handleAdultChange(e.target.value)}
          />
          {errors.adults && <p className="text-[10px] text-red-500 mt-1 ml-2">{errors.adults}</p>}
        </div>
        <div>
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Children</label>
          <input
            type="number"
            value={bookingData.children}
            className="w-full p-3 border border-gray-200 rounded-xl focus:border-green-600 outline-none"
            onChange={(e) => setBookingData({ ...bookingData, children: Math.max(0, parseInt(e.target.value) || 0) })}
          />
        </div>
      </div>

      <div className="bg-green-50 p-5 rounded-2xl mb-6 border border-green-100">
        <div className="flex justify-between font-bold text-green-950 text-xl">
          <span>Total:</span>
          <span>₹{pricing.total}</span>
        </div>
        <div className="flex justify-between items-center mt-1">
          <p className="text-[10px] text-green-700 font-bold uppercase tracking-widest">50% Advance</p>
          <p className="text-sm font-bold text-green-800">₹{pricing.advance}</p>
        </div>
      </div>

      <button onClick={handleWhatsAppSubmit}
        className="w-full py-4 bg-[#25D366] text-white rounded-full font-bold uppercase tracking-[0.2em] text-[11px] hover:bg-[#20bd5a] transition-all shadow-lg flex items-center justify-center gap-3 active:scale-95">
        Confirm via WhatsApp
      </button>
    </div>
  );
}