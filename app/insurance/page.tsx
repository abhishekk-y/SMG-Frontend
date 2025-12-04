"use client"

import Link from "next/link"
import { ArrowLeft, ShieldCheck, FileCheck, Umbrella } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function InsurancePage() {
    return (
        <div className="min-h-screen bg-white font-sans">
            <nav className="p-6 border-b border-gray-100">
                <div className="max-w-7xl mx-auto flex items-center gap-4">
                    <Link href="/" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <ArrowLeft className="w-6 h-6 text-gray-900" />
                    </Link>
                    <span className="font-bold text-xl text-gray-900">SMG Protect</span>
                </div>
            </nav>

            <main className="relative">
                {/* Hero Background */}
                <div className="absolute inset-0 h-[500px] z-0">
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage: "url('/assets/service-2.png')",
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/80 to-white" />
                </div>

                <div className="relative z-10 max-w-4xl mx-auto px-6 py-16">
                    <div className="text-center mb-16">
                        <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                            <ShieldCheck className="w-10 h-10 text-blue-600" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">Comprehensive Protection.</h1>
                        <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                            Ride worry-free with our tailored insurance plans designed specifically for electric vehicles.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 mb-16">
                        {[
                            { title: "Zero Depreciation", icon: ShieldCheck, desc: "Full coverage for parts replacement." },
                            { title: "Battery Cover", icon: FileCheck, desc: "Special protection for your battery pack." },
                            { title: "Third Party", icon: Umbrella, desc: "Coverage for third-party liabilities." },
                        ].map((item, i) => (
                            <div key={i} className="bg-gray-50 p-8 rounded-3xl border border-gray-100 hover:shadow-lg transition-all">
                                <item.icon className="w-8 h-8 text-blue-600 mb-4" />
                                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                                <p className="text-sm text-gray-500">{item.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="text-center">
                        <Button className="bg-gray-900 text-white px-10 py-6 rounded-full text-lg font-bold shadow-xl">
                            Get a Quote
                        </Button>
                    </div>
                </div>
            </main>
        </div>
    )
}
