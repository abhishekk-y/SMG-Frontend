"use client"

import Link from "next/link"
import { ArrowLeft, Phone, Wrench, Clock, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function RoadsideAssistancePage() {
    return (
        <div className="min-h-screen bg-white font-sans">
            <nav className="p-6 border-b border-gray-100">
                <div className="max-w-7xl mx-auto flex items-center gap-4">
                    <Link href="/" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <ArrowLeft className="w-6 h-6 text-gray-900" />
                    </Link>
                    <span className="font-bold text-xl text-gray-900">Roadside Assistance</span>
                </div>
            </nav>

            <main className="relative">
                {/* Hero Background */}
                <div className="absolute inset-0 h-[500px] z-0">
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage: "url('/assets/service-1.png')",
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/80 to-white" />
                </div>

                <div className="relative z-10 max-w-4xl mx-auto px-6 py-16">
                    <div className="text-center mb-16">
                        <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                            <Wrench className="w-10 h-10 text-[#FF4D00]" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">We've Got Your Back.</h1>
                        <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                            24/7 support, anywhere, anytime. Our dedicated team is just a tap away to ensure your journey never stops.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 mb-16">
                        <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
                            <Clock className="w-8 h-8 text-[#FF4D00] mb-4" />
                            <h3 className="text-xl font-bold text-gray-900 mb-2">24/7 Availability</h3>
                            <p className="text-gray-500">Day or night, rain or shine, we are always ready to assist you.</p>
                        </div>
                        <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
                            "use client"

                            import Link from "next/link"
                            import {ArrowLeft, Phone, Wrench, Clock, MapPin} from "lucide-react"
                            import {Button} from "@/components/ui/button"

                            export default function RoadsideAssistancePage() {
    return (
                            <div className="min-h-screen bg-white font-sans">
                                <nav className="p-6 border-b border-gray-100">
                                    <div className="max-w-7xl mx-auto flex items-center gap-4">
                                        <Link href="/" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                            <ArrowLeft className="w-6 h-6 text-gray-900" />
                                        </Link>
                                        <span className="font-bold text-xl text-gray-900">Roadside Assistance</span>
                                    </div>
                                </nav>

                                <main className="relative">
                                    {/* Hero Background */}
                                    <div className="absolute inset-0 h-[500px] z-0">
                                        <div
                                            className="absolute inset-0 bg-cover bg-center"
                                            style={{
                                                backgroundImage: "url('/assets/service-1.png')",
                                            }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/80 to-white" />
                                    </div>

                                    <div className="relative z-10 max-w-4xl mx-auto px-6 py-16">
                                        <div className="text-center mb-16">
                                            <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                                                <Wrench className="w-10 h-10 text-[#FF4D00]" />
                                            </div>
                                            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">We've Got Your Back.</h1>
                                            <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                                                24/7 support, anywhere, anytime. Our dedicated team is just a tap away to ensure your journey never stops.
                                            </p>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-8 mb-16">
                                            <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
                                                <Clock className="w-8 h-8 text-[#FF4D00] mb-4" />
                                                <h3 className="text-xl font-bold text-gray-900 mb-2">24/7 Availability</h3>
                                                <p className="text-gray-500">Day or night, rain or shine, we are always ready to assist you.</p>
                                            </div>
                                            <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
                                                <MapPin className="w-8 h-8 text-[#FF4D00] mb-4" />
                                                <h3 className="text-xl font-bold text-gray-900 mb-2">Pan-India Coverage</h3>
                                                <p className="text-gray-500">Support available across 500+ cities and major highways.</p>
                                            </div>
                                        </div>

                                        <div className="bg-gray-900 text-white p-10 rounded-[2.5rem] text-center shadow-xl">
                                            <h2 className="text-2xl font-bold mb-4">Need Immediate Help?</h2>
                                            <p className="text-gray-400 mb-8">Call our emergency helpline for instant support.</p>
                                            <Button className="bg-[#FF4D00] hover:bg-[#E04400] text-white px-8 py-6 rounded-full text-lg font-bold shadow-lg shadow-orange-500/20">
                                                <Phone className="w-5 h-5 mr-2" /> Call 1800-SMG-HELP
                                            </Button>
                                        </div>
                                    </div>
                                </main>
                            </div>
                            )
}
