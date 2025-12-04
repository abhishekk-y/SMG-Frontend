"use client"

import Link from "next/link"
import { ArrowLeft, Award, CheckCircle2, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function WarrantyPage() {
    return (
        <div className="min-h-screen bg-white font-sans">
            <nav className="p-6 border-b border-gray-100">
                <div className="max-w-7xl mx-auto flex items-center gap-4">
                    <Link href="/" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <ArrowLeft className="w-6 h-6 text-gray-900" />
                    </Link>
                    <span className="font-bold text-xl text-gray-900">Extended Warranty</span>
                </div>
            </nav>

            <main className="relative">
                {/* Hero Background */}
                <div className="absolute inset-0 h-[500px] z-0">
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage: "url('/assets/service-3.png')",
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/80 to-white" />
                </div>

                <div className="relative z-10 max-w-4xl mx-auto px-6 py-16">
                    <div className="text-center mb-16">
                        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                            <Award className="w-10 h-10 text-green-600" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">Built to Last.</h1>
                        <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                            Industry-leading warranty coverage for your peace of mind. Up to 5 years or 60,000 km.
                        </p>
                    </div>

                    <div className="bg-white border-2 border-gray-100 rounded-[2.5rem] p-8 md:p-12 mb-12 shadow-sm">
                        <h3 className="text-2xl font-bold text-gray-900 mb-8">What's Covered?</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            {["Motor & Controller", "Battery Pack", "Charger", "Frame & Chassis", "Display Unit", "Wiring Harness"].map((item, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                                    <span className="font-medium text-gray-700">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="text-center">
                        <Button className="bg-[#FF4D00] hover:bg-[#E04400] text-white px-10 py-6 rounded-full text-lg font-bold shadow-xl shadow-orange-500/20">
                            Check Eligibility
                        </Button>
                    </div>
                </div>
            </main>
        </div>
    )
}
