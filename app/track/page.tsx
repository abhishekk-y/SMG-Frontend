"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Zap,
  Search,
  ArrowRight,
  User,
  ShieldCheck,
  ChevronLeft,
  Truck,
  Clock,
  Package,
  MapPin,
  Phone,
  Box,
  FileText,
  Home,
  Settings,
  FileCheck,
  CreditCard,
  MessageSquare,
  X,
  ShoppingBag,
  ClipboardList,
  Navigation,
  Map as MapIcon,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
} from "lucide-react"
import { Badge } from "@/components/custom/badge"
import { DownloadButton } from "@/components/custom/download-button"

// CheckCircle2 icon component (moved before usage)
const CheckCircle2 = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
)

// Mock Data
const TRACKING_DETAILS = {
  id: "SMG-IND-8821",
  orderDate: "22 Nov 2025",
  status: "Registration",
  horizontalStepIndex: 3,
  verticalStepIndex: 5,
  eta: "06 Dec 2025",
  courier: "Blue Dart Surface",
  trackingNumber: "BD-7728-1192-IN",
  dealer: {
    name: "Rajesh Motors (Auth. Dealer)",
    phone: "9828489249",
    location: "Koramangala, Bengaluru",
  },
  seller: {
    name: "SMG Motors India Pvt Ltd",
    address: "Plot 45, Okhla Industrial Estate,\nPhase III, New Delhi, 110020",
    phone: "+91 11 2345 6789",
  },
  buyer: {
    name: "Vikram Malhotra",
    email: "vikram.m@gmail.com",
    address: "Flat 402, Palm Meadows,\nKoramangala 4th Block,\nBengaluru, Karnataka 560034",
  },
  items: [
    {
      name: "SMG Pro Cruiser X1",
      variant: "Color: Midnight Black | Range: 120km",
      price: "₹89,999",
      qty: 1,
      img: "https://images.unsplash.com/photo-1620802051782-72656960d7c0?auto=format&fit=crop&q=80&w=200",
      specs: {
        vin: "SMG8821X1BLK2025",
        motor: "3.2kW Hub Motor",
        battery: "4.8kWh Li-Ion",
        warranty: "5 Years / 50,000 km",
      },
    },
  ],
  summary: {
    subtotal: "₹89,999",
    tax: "₹16,200",
    shipping: "₹1,200",
    total: "₹1,07,399",
  },
  timeline: [
    {
      title: "Order Confirmed",
      desc: "Your order has been successfully placed.",
      date: "Nov 22, 2025 • 01:08 PM",
      status: "completed",
      icon: CheckCircle2 as any,
    },
    {
      title: "Manufacturing in Progress",
      desc: "Vehicle assembly has started at the main plant.",
      date: "Nov 24, 2025 • 01:08 PM",
      status: "completed",
      icon: Settings,
    },
    {
      title: "Quality Check Completed",
      desc: "Passed 150+ point inspection.",
      date: "Nov 26, 2025 • 01:08 PM",
      status: "completed",
      icon: ShieldCheck,
    },
    {
      title: "Dispatched from Factory",
      desc: "Shipment has left the manufacturing unit.",
      date: "Nov 29, 2025 • 01:08 PM",
      status: "completed",
      icon: Package,
    },
    {
      title: "Reached Delivery Hub",
      desc: "Arrived at the local distribution center.",
      date: "Dec 02, 2025 • 01:08 PM",
      status: "completed",
      icon: MapPin,
    },
    {
      title: "Documentation & Registration",
      desc: "RTO registration and insurance processing.",
      date: "Dec 04, 2025 • 01:08 PM",
      status: "active",
      icon: FileText,
    },
    {
      title: "Out for Delivery",
      desc: "Vehicle is on the way to your address.",
      date: "Pending",
      status: "pending",
      icon: Truck,
    },
    {
      title: "Delivered Successfully",
      desc: "Handed over to the customer.",
      date: "Pending",
      status: "pending",
      icon: CheckCircle2 as any,
    },
  ],
}

export default function TrackPage() {
  const [view, setView] = useState<"landing" | "otp_verify" | "customer_track">("landing")
  const [trackingId, setTrackingId] = useState("")
  const [otp, setOtp] = useState(["", "", "", ""])
  const [isLoading, setIsLoading] = useState(false)
  const [showSupport, setShowSupport] = useState(false)
  const otpRefs = useRef<(HTMLInputElement | null)[]>([])

  // Animation States
  const [animatedHorizontalStep, setAnimatedHorizontalStep] = useState(0)
  const [animatedVerticalStep, setAnimatedVerticalStep] = useState(-1)

  // Trigger animations when entering tracking view
  useEffect(() => {
    if (view === "customer_track") {
      // Horizontal Animation
      setAnimatedHorizontalStep(0)
      const targetHStep = TRACKING_DETAILS.horizontalStepIndex
      const intervalH = setInterval(() => {
        setAnimatedHorizontalStep((prev) => {
          if (prev < targetHStep) return prev + 1
          clearInterval(intervalH)
          return prev
        })
      }, 600)

      // Vertical Animation
      setAnimatedVerticalStep(-1)
      const targetVStep = TRACKING_DETAILS.verticalStepIndex
      const intervalV = setInterval(() => {
        setAnimatedVerticalStep((prev) => {
          if (prev < targetVStep) return prev + 1
          clearInterval(intervalV)
          return prev
        })
      }, 800)

      return () => {
        clearInterval(intervalH)
        clearInterval(intervalV)
      }
    }
  }, [view])

  const handleTrackOrder = (e: React.FormEvent) => {
    e.preventDefault()
    if (!trackingId) return
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setView("otp_verify")
    }, 1500)
  }

  const handleOtpVerify = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setView("customer_track")
    }, 1500)
  }

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)
    if (value && index < 3) {
      otpRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus()
    }
  }

  // VIEW: LANDING PAGE (Tracking ID Input)
  if (view === "landing") {
    return (
      <div className="min-h-screen bg-white flex flex-col font-sans text-gray-900 selection:bg-[#FF4D00] selection:text-white">
        <nav className="h-24 flex items-center justify-between px-6 lg:px-12 bg-white/80 backdrop-blur-md sticky top-0 z-50 transition-all">
          <Link href="/" className="flex items-center gap-2 cursor-pointer">
            <div className="w-11 h-11 bg-[#FF4D00] rounded-2xl flex items-center justify-center transform -skew-x-12 shadow-lg shadow-orange-500/30">
              <Zap className="w-6 h-6 text-white fill-current" />
            </div>
            <span className="text-2xl font-black tracking-tighter italic">
              SMG<span className="text-[#FF4D00]">MOTORS</span>
            </span>
          </Link>
          <Link
            href="/dealer"
            className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-[#FF4D00] transition-colors bg-gray-50 px-4 py-2 rounded-xl hover:bg-orange-50"
          >
            <User className="w-4 h-4" /> Partner Login
          </Link>
        </nav>

        <div className="flex-1 flex flex-col lg:flex-row">
          <div className="lg:w-1/2 bg-gray-100 relative overflow-hidden order-2 lg:order-1 h-[50vh] lg:h-auto group">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
              style={{
                backgroundImage:
                  "url('/assets/track-order-bg.png')",
              }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/80 via-black/20 to-transparent flex items-end p-16">
              <div
                className="text-white transform translate-y-4 opacity-0 animate-slide-up-fade"
                style={{ animationFillMode: "forwards" }}
              >
                <div className="flex gap-2 mb-4">
                  <span className="bg-[#FF4D00] px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider shadow-lg">
                    New Arrival
                  </span>
                  <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider border border-white/20">
                    Electric
                  </span>
                </div>
                <h2 className="text-6xl font-black mb-3 tracking-tighter leading-[0.9]">The SMG Pro X1</h2>
                <p className="opacity-90 text-lg font-medium max-w-md">
                  Engineered for Indian Roads. 180km Range. 0-60 in 3.2s.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 flex items-center justify-center p-8 lg:p-24 order-1 lg:order-2 bg-white relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-50 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
            <div className="max-w-md w-full space-y-10 relative z-10">
              <div className="text-center lg:text-left">
                <span className="text-[#FF4D00] font-bold text-xs tracking-[0.2em] uppercase border-b-2 border-[#FF4D00] pb-1">
                  Logistics Portal
                </span>
                <h1 className="text-5xl lg:text-7xl font-black text-gray-900 mt-6 mb-6 leading-[0.9] tracking-tighter">
                  Track Your <br />
                  Delivery.
                </h1>
                <p className="text-gray-500 text-lg leading-relaxed font-medium">
                  Enter your Order ID to verify your identity and see live vehicle status.
                </p>
              </div>
              <form onSubmit={handleTrackOrder} className="space-y-6 mt-8">
                <div className="group">
                  <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide group-focus-within:text-[#FF4D00] transition-colors">
                    Tracking ID
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={trackingId}
                      onChange={(e) => setTrackingId(e.target.value)}
                      placeholder="e.g. SMG-IND-8821"
                      className="w-full pl-6 pr-14 py-5 bg-gray-50 border-2 border-gray-100 rounded-3xl text-xl font-bold text-gray-900 focus:outline-none focus:border-[#FF4D00] focus:bg-white transition-all placeholder:text-gray-300 uppercase shadow-sm group-focus-within:shadow-xl group-focus-within:shadow-orange-500/10"
                    />
                    <Search className="w-6 h-6 text-gray-400 absolute right-6 top-1/2 -translate-y-1/2 group-focus-within:text-[#FF4D00] transition-colors" />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={!trackingId || isLoading}
                  className="w-full bg-[#FF4D00] hover:bg-[#E04400] text-white font-bold py-5 rounded-3xl text-lg shadow-xl shadow-orange-500/30 transition-all transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 group"
                >
                  {isLoading ? (
                    "Sending OTP..."
                  ) : (
                    <>
                      Verify & Track <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // VIEW: OTP VERIFICATION
  if (view === "otp_verify") {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 selection:bg-[#FF4D00] selection:text-white">
        <div className="bg-white rounded-[2.5rem] shadow-2xl p-10 lg:p-14 max-w-md w-full relative overflow-hidden animate-slide-up">
          <div className="absolute top-0 left-0 w-full h-2 bg-[#FF4D00]"></div>
          <div className="text-center mb-10">
            <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
              <ShieldCheck className="w-10 h-10 text-[#FF4D00]" />
            </div>
            <h2 className="text-3xl font-black text-gray-900 mb-3 tracking-tight">Security Check</h2>
            <p className="text-gray-500 font-medium">
              We've sent a code to the mobile number linked to Order{" "}
              <span className="font-bold text-gray-900">{trackingId}</span>
            </p>
          </div>
          <form onSubmit={handleOtpVerify}>
            <div className="flex gap-4 justify-center mb-10">
              {otp.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => (otpRefs.current[i] = el)}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  className="w-16 h-20 text-center text-3xl font-black border-2 border-gray-100 bg-gray-50 rounded-2xl focus:border-[#FF4D00] focus:ring-4 focus:ring-orange-100 focus:bg-white outline-none transition-all shadow-inner"
                />
              ))}
            </div>
            <button
              type="submit"
              className="w-full bg-[#FF4D00] hover:bg-[#E04400] text-white font-bold py-5 rounded-3xl text-lg shadow-xl shadow-orange-500/30 transition-all flex items-center justify-center gap-2 transform active:scale-95"
            >
              {isLoading ? "Verifying..." : "Access Dashboard"}
            </button>
          </form>
          <div className="text-center mt-8">
            <button
              onClick={() => setView("landing")}
              className="text-sm font-bold text-gray-400 hover:text-gray-900 transition-colors"
            >
              Cancel & Go Back
            </button>
          </div>
        </div>
      </div>
    )
  }

  // VIEW: CUSTOMER TRACKING DASHBOARD
  return (
    <div className="min-h-screen bg-[#F8F9FA] font-sans text-gray-900 flex flex-col selection:bg-[#FF4D00] selection:text-white">
      {/* Customer Header */}
      <header className="bg-white border-b border-gray-200 h-24 flex items-center justify-between px-6 lg:px-10 sticky top-0 z-40 shadow-sm/50 backdrop-blur-xl bg-white/90">
        <div className="flex items-center gap-6">
          <button
            onClick={() => setView("landing")}
            className="p-3 hover:bg-gray-100 rounded-2xl transition-colors group border border-transparent hover:border-gray-200"
          >
            <ChevronLeft className="w-5 h-5 text-gray-500 group-hover:text-gray-900 group-hover:-translate-x-0.5 transition-transform" />
          </button>
          <Link href="/" className="flex items-center gap-3 cursor-pointer">
            <div className="w-10 h-10 bg-[#FF4D00] rounded-xl flex items-center justify-center transform -skew-x-12 shadow-lg shadow-orange-500/20">
              <Zap className="w-5 h-5 text-white fill-current" />
            </div>
            <span className="font-black italic text-xl tracking-tight hidden sm:block">
              SMG<span className="text-[#FF4D00]">MOTORS</span>
            </span>
          </Link>
        </div>
        <div className="flex items-center gap-6">
          <button className="hidden sm:flex items-center gap-2.5 px-5 py-3 bg-white border border-gray-200 rounded-2xl text-xs font-bold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm">
            <Phone className="w-3.5 h-3.5 text-[#FF4D00]" /> 1800-SMG-HELP
          </button>
          <div className="flex items-center gap-4 pl-6 border-l border-gray-200">
            <div className="text-right hidden md:block">
              <div className="text-sm font-bold text-gray-900">{TRACKING_DETAILS.buyer.name}</div>
              <div className="text-xs font-medium text-gray-500">Premium Member</div>
            </div>
            <div className="w-12 h-12 bg-gray-100 rounded-full overflow-hidden border-2 border-white shadow-md">
              <img
                src="https://ui-avatars.com/api/?name=Vikram+M&background=FF4D00&color=fff&bold=true"
                alt="User"
              />
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 p-6 lg:p-12 max-w-[1600px] mx-auto w-full">
        {/* Top Bar with Greeting */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div>
            <h2 className="text-2xl font-bold text-gray-400 mb-2 tracking-tight">
              Hello, {TRACKING_DETAILS.buyer.name.split(" ")[0]} 👋
            </h2>
            <div className="flex items-center gap-4">
              <h1 className="text-4xl lg:text-5xl font-black text-gray-900 tracking-tighter">
                Order #{TRACKING_DETAILS.id}
              </h1>
              <Badge status={TRACKING_DETAILS.status} />
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setShowSupport(!showSupport)}
              className="px-6 py-3.5 bg-gray-900 text-white rounded-2xl text-sm font-bold shadow-xl hover:bg-gray-800 transition-all flex items-center gap-2 hover:-translate-y-0.5"
            >
              <MessageSquare className="w-4 h-4" /> Chat Support
            </button>
          </div>
        </div>

        {/* SPLIT LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT COLUMN */}
          <div className="lg:col-span-8 space-y-8">
            {/* 1. Horizontal Stepper */}
            <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-lg font-black text-gray-900 flex items-center gap-2">
                  <Truck className="w-5 h-5 text-[#FF4D00]" /> Shipment Status
                </h3>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">Updated: Just now</span>
              </div>

              <div className="relative px-2">
                <div className="absolute top-6 left-6 right-6 h-1 bg-gray-100 rounded-full"></div>
                <div
                  className="absolute top-6 left-6 h-1 bg-[#FF4D00] rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${(animatedHorizontalStep / 4) * 100}%`, maxWidth: "calc(100% - 3rem)" }}
                ></div>

                <div className="relative flex justify-between text-center">
                  {["Order Placed", "Processed", "Shipped", "Arrived at Dealer", "Out for Delivery"].map(
                    (step, i) => {
                      const isCompleted = i <= animatedHorizontalStep
                      const isCurrent = i === animatedHorizontalStep
                      return (
                        <div
                          key={i}
                          className="flex flex-col items-center gap-4 z-10 group cursor-default"
                          style={{ width: "60px" }}
                        >
                          <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center border-[3px] transition-all duration-500 ${isCompleted
                              ? "bg-[#FF4D00] border-[#FF4D00] text-white shadow-xl shadow-orange-500/20 scale-110"
                              : "bg-white border-gray-200 text-gray-300"
                              }`}
                          >
                            {i === 0 && <FileText className="w-5 h-5" />}
                            {i === 1 && <Box className="w-5 h-5" />}
                            {i === 2 && <Truck className="w-5 h-5" />}
                            {i === 3 && <MapPin className="w-5 h-5" />}
                            {i === 4 && <Home className="w-5 h-5" />}
                          </div>
                          <span
                            className={`text-[10px] font-bold uppercase tracking-wide transition-colors ${isCurrent ? "text-[#FF4D00]" : isCompleted ? "text-gray-900" : "text-gray-400"
                              }`}
                          >
                            {step}
                          </span>
                        </div>
                      )
                    }
                  )}
                </div>
              </div>
            </div>

            {/* 2. Split Cards: Address & Logistics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-[2.5rem] border border-gray-200 p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-6">
                  <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest">Delivery Address</h4>
                  <MapIcon className="w-5 h-5 text-gray-400" />
                </div>
                <div className="space-y-1">
                  <p className="font-bold text-xl text-gray-900">{TRACKING_DETAILS.buyer.name}</p>
                  <p className="text-sm text-gray-500 leading-relaxed whitespace-pre-line font-medium mt-2">
                    {TRACKING_DETAILS.buyer.address}
                  </p>
                </div>
                <div className="mt-6 pt-6 border-t border-gray-100 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">Mobile Number</p>
                    <p className="text-sm font-bold text-gray-900">+91 98XXX XXXXX</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-[2.5rem] border border-gray-200 p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-6">
                  <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest">Logistics Partner</h4>
                  <Box className="w-5 h-5 text-gray-400" />
                </div>
                <div className="flex items-start gap-4 mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-700 font-black text-xl">
                    BD
                  </div>
                  <div>
                    <p className="text-lg font-bold text-gray-900">{TRACKING_DETAILS.courier}</p>
                    <p className="text-xs text-gray-500 font-bold bg-gray-100 px-2 py-1 rounded inline-block mt-1">
                      Surface Transport
                    </p>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-3 flex justify-between items-center">
                  <span className="font-mono font-bold text-gray-900">{TRACKING_DETAILS.trackingNumber}</span>
                  <ClipboardList className="w-4 h-4 text-gray-400 cursor-pointer hover:text-[#FF4D00]" />
                </div>
              </div>
            </div>

            {/* 3. Documents */}
            <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm">
              <h3 className="text-lg font-black text-gray-900 mb-6 flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-[#FF4D00]" /> Ownership Documents
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {["Tax Invoice", "Warranty Card", "Insurance Policy"].map((doc, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center justify-between p-6 rounded-2xl border-2 border-gray-50 bg-gray-50/50 hover:bg-white hover:border-[#FF4D00] hover:shadow-lg transition-all cursor-pointer group gap-4"
                  >
                    <div className="flex items-center gap-3 w-full justify-center">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${i === 0
                          ? "bg-blue-100 text-blue-600"
                          : i === 1
                            ? "bg-green-100 text-green-600"
                            : "bg-purple-100 text-purple-600"
                          }`}
                      >
                        {i === 0 ? (
                          <FileText className="w-5 h-5" />
                        ) : i === 1 ? (
                          <ShieldCheck className="w-5 h-5" />
                        ) : (
                          <FileCheck className="w-5 h-5" />
                        )}
                      </div>
                      <span className="font-bold text-gray-900 text-lg">{doc}</span>
                    </div>
                    <DownloadButton label="Download" />
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Package Details */}
            <div className="bg-white rounded-[2.5rem] border border-gray-200 p-8 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-lg font-black text-gray-900 flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-[#FF4D00]" /> Package Details
                </h4>
                <div className="flex gap-2">
                  <DownloadButton label="Invoice" />
                </div>
              </div>
              <div className="flex items-center gap-8 group">
                <div className="w-40 h-32 bg-gray-50 rounded-2xl overflow-hidden border border-gray-200 shrink-0 relative">
                  <img
                    src={TRACKING_DETAILS.items[0].img}
                    alt="Scooter"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="flex-1 space-y-2">
                  <div>
                    <h5 className="font-black text-gray-900 text-2xl">{TRACKING_DETAILS.items[0].name}</h5>
                    <p className="text-sm text-gray-500 font-medium">{TRACKING_DETAILS.items[0].variant}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-3">
                    <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                      <p className="text-[8px] font-bold text-gray-400 uppercase">VIN</p>
                      <p className="text-xs font-bold text-gray-900 font-mono">
                        {TRACKING_DETAILS.items[0].specs.vin}
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                      <p className="text-[8px] font-bold text-gray-400 uppercase">Motor</p>
                      <p className="text-xs font-bold text-gray-900">{TRACKING_DETAILS.items[0].specs.motor}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 5. Payment Summary */}
            <div className="bg-gray-900 text-white p-8 rounded-[2.5rem] shadow-xl">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-[#FF4D00]" /> Payment Summary
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between text-gray-400 text-sm">
                  <span>Subtotal</span>
                  <span className="font-medium text-white">{TRACKING_DETAILS.summary.subtotal}</span>
                </div>
                <div className="flex justify-between text-gray-400 text-sm">
                  <span>GST (18%)</span>
                  <span className="font-medium text-white">{TRACKING_DETAILS.summary.tax}</span>
                </div>
                <div className="flex justify-between text-gray-400 text-sm pb-4 border-b border-gray-800">
                  <span>Shipping</span>
                  <span className="font-medium text-white">{TRACKING_DETAILS.summary.shipping}</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-2xl font-black text-[#FF4D00]">{TRACKING_DETAILS.summary.total}</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="lg:col-span-4 space-y-8">
            {/* Dealer Contact Card */}
            <div className="bg-gray-900 rounded-[2.5rem] p-8 text-white shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF4D00] rounded-full blur-[60px] opacity-20 group-hover:opacity-40 transition-opacity"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Your Dealer</p>
                    <h4 className="text-lg font-black">{TRACKING_DETAILS.dealer.name}</h4>
                  </div>
                </div>

                <div className="bg-white/5 rounded-2xl p-4 mb-6 border border-white/10">
                  <p className="text-xs text-gray-400 mb-1">Dealer Location</p>
                  <p className="text-sm font-bold">{TRACKING_DETAILS.dealer.location}</p>
                </div>

                <button className="w-full py-4 bg-[#FF4D00] hover:bg-[#E04400] text-white rounded-2xl text-sm font-black shadow-lg shadow-orange-500/20 transition-all flex items-center justify-center gap-3 group-hover:scale-[1.02]">
                  <Phone className="w-5 h-5 fill-current" /> Call {TRACKING_DETAILS.dealer.phone}
                </button>
              </div>
            </div>

            {/* Vertical Timeline Card */}
            <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm relative overflow-hidden">
              <div className="flex items-center justify-between mb-10">
                <h3 className="text-lg font-black text-gray-900 flex items-center gap-2">
                  <Navigation className="w-5 h-5 text-[#FF4D00]" /> Vehicle Journey
                </h3>
                <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]"></div>
              </div>

              <div className="relative pl-4">
                <div className="absolute left-[43px] top-7 bottom-7 w-0.5 bg-gray-100"></div>
                <div
                  className="absolute left-[43px] top-7 w-0.5 bg-[#FF4D00] transition-all duration-1000 ease-out"
                  style={{
                    height: `${(Math.max(0, animatedVerticalStep) / (TRACKING_DETAILS.timeline.length - 1)) * 100}%`,
                  }}
                ></div>

                <div className="space-y-12">
                  {TRACKING_DETAILS.timeline.map((step, i) => {
                    const isActive = i === animatedVerticalStep
                    const isCompleted = i < animatedVerticalStep
                    const isPending = i > animatedVerticalStep

                    return (
                      <div
                        key={i}
                        className={`relative flex gap-6 group transition-all duration-500 ${isPending ? "opacity-40 grayscale" : "opacity-100"
                          }`}
                      >
                        <div
                          className={`relative z-10 w-14 h-14 rounded-full flex items-center justify-center border-[3px] shrink-0 transition-all duration-500
                                       ${isActive
                              ? "bg-white border-[#FF4D00] text-[#FF4D00] shadow-xl shadow-orange-500/20 scale-110"
                              : isCompleted
                                ? "bg-[#FF4D00] border-[#FF4D00] text-white"
                                : "bg-white border-gray-200 text-gray-300"
                            }`}
                        >
                          {isActive ? (
                            <div className="w-4 h-4 bg-[#FF4D00] rounded-full animate-pulse" />
                          ) : (
                            <step.icon className="w-6 h-6" />
                          )}
                        </div>
                        <div className={`pt-1 transition-all duration-300 ${isActive ? "translate-x-1" : ""}`}>
                          <h4
                            className={`text-base font-bold tracking-tight ${isActive ? "text-[#FF4D00]" : isCompleted ? "text-gray-900" : "text-gray-400"
                              }`}
                          >
                            {step.title}
                          </h4>
                          <p className="text-xs font-medium text-gray-500 mt-1 leading-relaxed max-w-[200px]">
                            {step.desc}
                          </p>
                          {step.status !== "pending" && (
                            <p className="text-[10px] font-bold text-gray-400 mt-2">{step.date}</p>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Support Area */}
            {showSupport && (
              <div className="fixed bottom-8 right-8 w-80 bg-white rounded-[2rem] border border-gray-200 p-6 shadow-2xl animate-slide-up z-50">
                <div className="flex justify-between items-center mb-6">
                  <h4 className="font-bold text-gray-900">Live Support</h4>
                  <button onClick={() => setShowSupport(false)} className="p-1 hover:bg-gray-100 rounded-full">
                    <X className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
                <div className="h-48 bg-gray-50 rounded-2xl p-4 mb-4 overflow-y-auto border border-gray-100">
                  <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm text-xs font-medium text-gray-600 mb-3 w-fit border border-gray-100">
                    Hello Vikram! 👋 How can we help you with your order today?
                  </div>
                  <div className="bg-[#FF4D00] text-white p-3 rounded-2xl rounded-tr-none shadow-md shadow-orange-500/10 text-xs font-medium mb-3 w-fit ml-auto">
                    When will the registration be done?
                  </div>
                  <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm text-xs font-medium text-gray-600 w-fit border border-gray-100">
                    We are currently processing the RTO documents. It should be completed by Dec 04.
                  </div>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    className="flex-1 bg-gray-50 border-transparent rounded-xl text-xs font-bold px-4 py-3 focus:bg-white focus:ring-2 focus:ring-[#FF4D00]/20 focus:border-[#FF4D00] transition-all outline-none"
                  />
                  <button className="p-3 bg-[#FF4D00] text-white rounded-xl hover:bg-[#E04400] transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* PAGE FOOTER */}
        <footer className="mt-12 pt-8 border-t border-gray-200 text-center">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 max-w-7xl mx-auto px-4">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-[#FF4D00]" />
              <span className="font-black italic tracking-tighter text-lg text-gray-400">
                SMG<span className="text-gray-300">MOTORS</span>
              </span>
            </div>
            <div className="flex gap-6 text-xs font-bold text-gray-400">
              <a href="#" className="hover:text-[#FF4D00]">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-[#FF4D00]">
                Terms of Service
              </a>
              <a href="#" className="hover:text-[#FF4D00]">
                Cancellation Policy
              </a>
              <a href="#" className="hover:text-[#FF4D00]">
                Help Center
              </a>
            </div>
            <div className="flex gap-4">
              <Facebook className="w-4 h-4 text-gray-300 hover:text-[#FF4D00] cursor-pointer" />
              <Twitter className="w-4 h-4 text-gray-300 hover:text-[#FF4D00] cursor-pointer" />
              <Instagram className="w-4 h-4 text-gray-300 hover:text-[#FF4D00] cursor-pointer" />
              <Linkedin className="w-4 h-4 text-gray-300 hover:text-[#FF4D00] cursor-pointer" />
              <Youtube className="w-4 h-4 text-gray-300 hover:text-[#FF4D00] cursor-pointer" />
            </div>
          </div>
          <p className="text-[10px] text-gray-300 font-medium mt-6 pb-4">
            © 2025 SMG Electric Motors Pvt Ltd. All rights reserved.
          </p>
        </footer>
      </main>
    </div>
  )
}
