"use client";

import { useSearchParams } from "next/navigation";
import BookingForm from "../../components/BookingForm";
import { Suspense } from "react";

function BookingContent() {
    const searchParams = useSearchParams();
    const initialRoom = searchParams.get("room") || "bungalow";

    return (
        <div className="bg-green-50 min-h-screen py-20 px-6 md:px-20">
            <h1 className="text-4xl font-bold text-green-950 mb-10 text-center font-serif">
                Reserve Your Stay
            </h1>
            
            <div className="max-w-4xl mx-auto">
                <BookingForm initialRoom={initialRoom} />
            </div>
        </div>
    );
}

export default function BookingPage() {
    return (
        <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
            <BookingContent />
        </Suspense>
    );
}