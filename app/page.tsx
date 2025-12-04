"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import {
  Zap,
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  Search,
  Phone,
  Play,
  Battery,
  Gauge,
  Timer,
  MapPin,
  Star,
  Quote,
  Sun,
  Wind,
  Instagram,
  Linkedin,
  Twitter,
  Facebook,
  ArrowUpRight,
  Clock,
  CreditCard,
  Truck,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { SavingsCalculator } from "@/components/features/savings-calculator"
import { ServiceSection } from "@/components/features/service-section"
import { ModelComparison } from "@/components/features/model-comparison"
import { TechnologySection } from "@/components/features/technology-section"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
const scooterModels = [
  {
    id: 1,
    name: "SMG Sprint",
    tagline: "Urban Commuter",
    specs: {
      topSpeed: "80 km/h",
      range: "120 km",
      battery: "3.2 kWh",
      charging: "4 hrs",
    },
    price: "₹89,999",
    colors: ["#1a1a1a", "#FF4D00", "#3b82f6", "#22c55e"],
    image: "https://images.unsplash.com/photo-1620802051782-72656960d7c0?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 2,
    name: "SMG Blaze",
    tagline: "Performance Beast",
    specs: {
      topSpeed: "100 km/h",
      range: "150 km",
      battery: "4.0 kWh",
      charging: "5 hrs",
    },
    price: "₹1,19,999",
    colors: ["#1a1a1a", "#ef4444", "#8b5cf6", "#f59e0b"],
    image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    name: "SMG Volt Pro",
    tagline: "Long Range Champion",
    specs: {
      topSpeed: "90 km/h",
      range: "180 km",
      battery: "5.0 kWh",
      charging: "6 hrs",
    },
    price: "₹1,49,999",
    colors: ["#ffffff", "#1a1a1a", "#0ea5e9", "#10b981"],
    image: "https://images.unsplash.com/photo-1591635566278-10dca0ca76ee?auto=format&fit=crop&q=80&w=800",
  },
]

// Why Choose Electric Benefits
const electricBenefits = [
  {
    number: "01",
    title: "Instant Acceleration & Smooth Riding",
    description: "Experience the thrill of instant torque from the moment you twist the throttle. Unlike gas scooters, there's no lag—just pure, linear power. The silent motor ensures a peaceful ride, reducing noise pollution and letting you enjoy the sounds of the city.",
  },
  {
    number: "02",
    title: "Zero Emissions & Eco-Friendly",
    description: "Ride with a clear conscience. Our electric scooters produce zero tailpipe emissions, helping to reduce your carbon footprint and combat urban air pollution. Every kilometer you ride contributes to a cleaner, greener planet for future generations.",
  },
  {
    number: "03",
    title: "Lower Running Costs & Easy Maintenance",
    description: "Say goodbye to expensive fuel stops and frequent oil changes. With electricity costing a fraction of petrol and fewer moving parts in the motor, you can save up to 80% on running costs. Maintenance is minimal, saving you both time and money.",
  },
  {
    number: "04",
    title: "Connected Tech & Smart Features",
    description: "Stay in control with our advanced smart features. Track your scooter's location via GPS, monitor battery health in real-time, and receive over-the-air updates to keep your ride optimized. Our dedicated app puts the power of connectivity right in your pocket.",
  },
]

// Technology Features
const techFeatures = [
  {
    title: "Smart Connectivity",
    description:
      "Stay connected wherever you ride. SMG's smart interface syncs seamlessly with your devices — giving you navigation, ride stats, and real-time alerts.",
    icon: "connectivity",
    image: "https://images.unsplash.com/photo-1626847037657-fd3622613ce3?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Regenerative Braking",
    description: "Capture energy while braking to extend your range and maximize efficiency on every ride.",
    icon: "regen",
    image: "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Advanced Battery Tech",
    description: "Industry-leading lithium-ion cells with intelligent BMS for safety, longevity, and fast charging.",
    icon: "battery",
    image: "https://plus.unsplash.com/premium_photo-1679917152960-b9e6456ba1d2?auto=format&fit=crop&q=80&w=800",
  },
]

// Charging Stations
const chargingStations = [
  { id: 1, name: "SMG Hub - Connaught Place", location: "New Delhi", rating: 4.8, power: "15kW Fast Charge" },
  { id: 2, name: "SMG Hub - Bandra West", location: "Mumbai", rating: 4.9, power: "15kW Fast Charge" },
  { id: 3, name: "SMG Hub - Koramangala", location: "Bangalore", rating: 4.7, power: "15kW Fast Charge" },
]

// Customer Testimonials
const testimonials = [
  {
    name: "Priya Sharma",
    role: "SMG Sprint Owner",
    quote: "I love how eco-friendly my SMG is. Charging is easy, and the smart features make every commute enjoyable.",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200",
  },
  {
    name: "Rahul Verma",
    role: "SMG Blaze Owner",
    quote: "The performance is incredible! Zero to 60 in seconds, and the range easily covers my daily commute.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
  },
]

// Stats
const stats = [
  { value: "50K+", label: "Happy Riders" },
  { value: "500+", label: "Charging Hubs" },
  { value: "180km", label: "Max Range" },
  { value: "4.9★", label: "Customer Rating" },
]

export default function LandingPage() {
  const [selectedModel, setSelectedModel] = useState(0)
  const [selectedColor, setSelectedColor] = useState(0)
  const [activeBenefit, setActiveBenefit] = useState(0)
  const [activeTestimonial, setActiveTestimonial] = useState(0)

  const currentModel = scooterModels[selectedModel]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FF4D00] to-[#FF6B35] flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">
              SMG<span className="text-[#FF4D00]">Motors</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="#models" className="text-sm font-medium text-gray-600 hover:text-[#FF4D00] transition-colors">
              Models
            </Link>
            <Link href="#technology" className="text-sm font-medium text-gray-600 hover:text-[#FF4D00] transition-colors">
              Technology
            </Link>
            <Link href="#charging" className="text-sm font-medium text-gray-600 hover:text-[#FF4D00] transition-colors">
              Charging
            </Link>
            <Link href="/track" className="text-sm font-medium text-gray-600 hover:text-[#FF4D00] transition-colors">
              Track Order
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="text-gray-500 hover:text-[#FF4D00] hover:bg-orange-50">
              <Search className="w-5 h-5" />
            </Button>
            <Button className="bg-[#FF4D00] hover:bg-[#E04400] text-white gap-2 shadow-lg shadow-orange-500/20" asChild>
              <Link href="/dealer">
                Contact <Phone className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/hero-scooter.png"
            alt="SMG Electric Scooter Cinematic"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8">
              <Zap className="w-4 h-4 text-[#FF4D00]" />
              <span className="text-sm font-medium tracking-wide">The Future of Urban Mobility</span>
            </div>

            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-6 leading-[0.9]">
              RIDE <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4D00] to-[#FF6B35]">BEYOND</span>
              <br />
              LIMITS
            </h1>

            <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
              Experience the perfect fusion of performance, style, and sustainability.
              The all-new SMG Series is here to redefine your journey.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button className="h-14 px-8 rounded-full bg-[#FF4D00] hover:bg-[#E04400] text-white text-lg font-bold shadow-lg shadow-orange-500/30 transition-all hover:scale-110 hover:shadow-orange-500/50 active:scale-95">
                <Link href="#models">Explore Models</Link>
              </Button>
              <Button variant="outline" className="h-14 px-8 rounded-full bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 text-lg font-medium transition-all hover:scale-105 active:scale-95" asChild>
                <Link href="/track" className="flex items-center gap-2">
                  Track Order <Truck className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Hero Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-10 border-t border-white/10"
          >
            {[
              { label: "Top Speed", value: "100 km/h" },
              { label: "Range", value: "180 km" },
              { label: "Charging", value: "0-80% in 2h" },
              { label: "Warranty", value: "5 Years" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</p>
                <p className="text-sm text-gray-400 uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50"
        >
          <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white/50 to-transparent" />
        </motion.div>
      </section>

      {/* Featured Models Section */}
      <section id="models" className="py-16 md:py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-gray-50 to-transparent pointer-events-none" />
        <div className="w-full px-6 md:px-12 lg:px-24 relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-sm text-[#FF4D00] font-bold tracking-wider uppercase">Featured Models</span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-2 tracking-tight">Explore Our Electric Lineup</h2>
          </motion.div>

          {/* Model Tabs */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-white border-gray-200 hover:bg-gray-50 hover:border-[#FF4D00] transition-all"
              onClick={() => setSelectedModel((prev) => (prev === 0 ? scooterModels.length - 1 : prev - 1))}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>

            <div className="flex gap-2 bg-gray-100 p-1 rounded-full">
              {scooterModels.map((model, i) => (
                <button
                  key={model.id}
                  onClick={() => setSelectedModel(i)}
                  className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${selectedModel === i
                    ? "bg-white text-gray-900 shadow-md scale-105"
                    : "text-gray-500 hover:text-gray-900"
                    }`}
                >
                  {model.name}
                </button>
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-white border-gray-200 hover:bg-gray-50 hover:border-[#FF4D00] transition-all"
              onClick={() => setSelectedModel((prev) => (prev === scooterModels.length - 1 ? 0 : prev + 1))}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Configurator */}
          <div className="grid md:grid-cols-3 gap-8 mb-12 p-6 bg-gray-50 rounded-3xl border border-gray-100">
            {/* Motor Type */}
            <div>
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Motor</h4>
              <div className="flex gap-2">
                <button className="px-6 py-2 bg-gray-900 text-white rounded-full text-sm font-medium shadow-lg shadow-gray-900/20">Hub Motor</button>
                <button className="px-6 py-2 bg-white text-gray-600 border border-gray-200 rounded-full text-sm font-medium hover:border-gray-400 transition-colors">
                  Mid-Drive
                </button>
              </div>
            </div>

            {/* Colors */}
            <div>
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Color</h4>
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full hover:bg-white">
                  <ChevronLeft className="w-3 h-3" />
                </Button>
                {currentModel.colors.map((color, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedColor(i)}
                    className={`w-10 h-10 rounded-full border-4 transition-all ${selectedColor === i ? "border-white shadow-lg scale-110 ring-2 ring-gray-200" : "border-transparent scale-100 hover:scale-105"
                      }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
                <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full hover:bg-white">
                  <ChevronRight className="w-3 h-3" />
                </Button>
              </div>
            </div>

            {/* Battery */}
            <div>
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Battery</h4>
              <div className="flex gap-2">
                <button className="px-5 py-2 bg-gray-900 text-white rounded-full text-sm font-medium shadow-lg shadow-gray-900/20">Standard</button>
                <button className="px-5 py-2 bg-white text-gray-600 border border-gray-200 rounded-full text-sm font-medium hover:border-gray-400 transition-colors">
                  Extended
                </button>
                <button className="px-5 py-2 bg-white text-gray-600 border border-gray-200 rounded-full text-sm font-medium hover:border-gray-400 transition-colors">
                  Swappable
                </button>
              </div>
            </div>
          </div>

          {/* Model Display */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedModel}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid lg:grid-cols-[200px_1fr_200px] gap-8 items-center"
            >
              {/* Left Specs */}
              <div className="space-y-8">
                {[
                  { label: "Top Speed", value: currentModel.specs.topSpeed },
                  { label: "Range", value: currentModel.specs.range },
                  { label: "Battery", value: currentModel.specs.battery },
                  { label: "Charge Time", value: currentModel.specs.charging },
                ].map((spec, i) => (
                  <motion.div
                    key={spec.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="group cursor-default"
                  >
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider group-hover:text-[#FF4D00] transition-colors">{spec.label}</span>
                    <p className="text-3xl font-black text-gray-900 mt-1">{spec.value}</p>
                  </motion.div>
                ))}
              </div>

              {/* Center Image - 360 Viewer */}
              <div className="relative z-20">
                <div className="aspect-[16/10] relative rounded-3xl overflow-hidden shadow-2xl shadow-gray-900/10">
                  <video
                    src="/assets/Full_Video_Generation.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover scale-150"
                  />
                </div>
                <div className="text-center mt-8">
                  <p className="text-sm font-medium text-[#FF4D00] tracking-widest uppercase mb-2">{currentModel.tagline}</p>
                  <p className="text-3xl font-black text-gray-900">Starting at {currentModel.price}</p>
                  <div className="flex items-center justify-center gap-4">
                    <Button className="bg-gray-900 text-white rounded-full px-8 py-6 text-lg hover:bg-[#FF4D00] hover:scale-110 transition-all shadow-xl shadow-gray-900/20 hover:shadow-orange-500/40 active:scale-95" asChild>
                      <Link href="/dealer">
                        Book Now <ArrowRight className="ml-2 w-5 h-5" />
                      </Link>
                    </Button>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="rounded-full px-8 py-6 text-lg border-gray-200 hover:bg-gray-50 hover:border-[#FF4D00] hover:text-[#FF4D00] transition-all hover:scale-105 active:scale-95">
                          View Specs
                        </Button>
                      </DialogTrigger>
                      {/* DialogContent and DialogDescription would go here */}
                    </Dialog>
                  </div>
                </div>

              </div>

              {/* Right Gallery */}
              <div className="space-y-4">
                {[
                  "/assets/feature-1.webp",
                  "/assets/feature-2.webp",
                  "/assets/feature-3.webp",
                  "/assets/feature-4.webp",
                ].map((src, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="aspect-[4/3] relative rounded-2xl overflow-hidden border-2 border-transparent hover:border-[#FF4D00] transition-all cursor-pointer group shadow-sm hover:shadow-xl"
                  >
                    <Image
                      src={src}
                      alt={`Detail ${i + 1}`}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Feature Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">
            {[
              {
                icon: Battery,
                title: "Fast Charging",
                desc: "0-80% in 2 hours",
                sub: "Stay powered and ready to go anytime.",
              },
              { icon: Zap, title: "Energy Efficient", desc: "12 paise per km", sub: "Save up to 80% on fuel costs." },
              {
                icon: Timer,
                title: "Quick Acceleration",
                desc: "0-40 in 4.5 seconds",
                sub: "Instant torque, pure thrill.",
              },
              { icon: Gauge, title: "Long Range", desc: "Up to 180 km", sub: "Dependable for any journey." },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                className="p-8 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-gray-200/50 transition-all group"
              >
                <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center mb-6 group-hover:bg-[#FF4D00] transition-colors">
                  <feature.icon className="w-6 h-6 text-gray-900 group-hover:text-white transition-colors" />
                </div>
                <h4 className="font-bold text-lg text-gray-900 mb-2">{feature.title}</h4>
                <p className="text-sm font-medium text-[#FF4D00] mb-2">{feature.desc}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{feature.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Model Comparison Section */}
      <ModelComparison />

      {/* Savings Calculator Section */}
      <SavingsCalculator />

      {/* Service Section */}
      <ServiceSection />

      {/* Why Choose Electric Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="w-full px-6 md:px-12 lg:px-24">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left Image */}
            <div className="relative">
              <div className="aspect-[3/4] rounded-3xl overflow-hidden">
                <Image
                  src="/assets/sustainability.png"
                  alt="Electric Scooter Lifestyle"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Right Content */}
            <div>
              <span className="text-sm text-gray-500 tracking-wider">/ Why Choose Electric</span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-4">
                Smarter. Greener.
                <br />
                Better.
              </h2>
              <p className="text-gray-500 mb-10 max-w-md">
                Embrace sustainability without compromising on performance. Here's why EVs are the smarter choice.
              </p>

              {/* Benefits List */}
              <div className="space-y-4">
                {electricBenefits.map((benefit, i) => (
                  <motion.div
                    key={benefit.number}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 ${activeBenefit === i ? "bg-white shadow-xl scale-105" : "hover:bg-white/50 bg-white/30"
                      }`}
                    onClick={() => setActiveBenefit(activeBenefit === i ? -1 : i)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className={`text-sm font-mono transition-colors ${activeBenefit === i ? "text-[#00B4D8]" : "text-gray-400"}`}>{benefit.number}</span>
                        <span className={`font-bold text-lg transition-colors ${activeBenefit === i ? "text-gray-900" : "text-gray-600"}`}>{benefit.title}</span>
                      </div>
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${activeBenefit === i ? "bg-[#00B4D8] text-white rotate-90" : "bg-gray-100 text-gray-400"
                          }`}
                      >
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                    <AnimatePresence>
                      {activeBenefit === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0, marginTop: 0 }}
                          animate={{ height: "auto", opacity: 1, marginTop: 16 }}
                          exit={{ height: 0, opacity: 0, marginTop: 0 }}
                          className="overflow-hidden"
                        >
                          <p className="text-gray-500 leading-relaxed pl-10 border-l-2 border-[#00B4D8]/20">
                            {benefit.description}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <TechnologySection />

      <section id="charging" className="py-16 md:py-24 bg-gray-50">
        <div className="w-full px-6 md:px-12 lg:px-24">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Left - Map */}
            <div>
              <span className="text-sm text-gray-500 tracking-wider">/ Charging Network</span>
              <div className="flex items-center justify-between mt-2 mb-8">
                <h2 className="text-4xl font-bold text-gray-900">
                  Charge Anywhere,
                  <br />
                  Anytime
                </h2>
                <Button className="bg-[#00B4D8] hover:bg-[#0096c7] text-white gap-2">
                  Find Charging Stations <ArrowRight className="w-4 h-4" />
                </Button>
              </div>

              {/* Map Placeholder */}
              <div className="relative aspect-square rounded-3xl overflow-hidden bg-gray-200">
                <Image
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=800"
                  alt="Charging Network Map"
                  fill
                  className="object-cover"
                />
                {/* Map Markers */}
                <div className="absolute top-1/4 left-1/3 w-8 h-8 bg-[#00B4D8] rounded-full flex items-center justify-center shadow-lg animate-pulse">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                <div className="absolute top-1/2 left-1/2 w-8 h-8 bg-[#00B4D8] rounded-full flex items-center justify-center shadow-lg">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                <div className="absolute bottom-1/3 right-1/3 w-8 h-8 bg-[#00B4D8] rounded-full flex items-center justify-center shadow-lg">
                  <MapPin className="w-4 h-4 text-white" />
                </div>

                {/* Info Popup */}
                <div className="absolute top-1/4 left-1/3 ml-10 bg-white rounded-xl p-3 shadow-xl max-w-[200px]">
                  <p className="text-xs font-medium text-gray-900">SMG Hub - Connaught Place</p>
                  <p className="text-[10px] text-gray-500">Fast-charging station in Central Delhi</p>
                </div>
              </div>
            </div>

            {/* Right - Station Detail */}
            <div className="lg:pt-20">
              <div className="bg-white rounded-3xl p-6 shadow-xl">
                <h4 className="font-semibold text-gray-900 mb-4">Station Details</h4>

                <div className="aspect-video relative rounded-xl overflow-hidden mb-4">
                  <Image
                    src="https://images.unsplash.com/photo-1664360096183-b90343715206?auto=format&fit=crop&q=80&w=800"
                    alt="Charging Station"
                    fill
                    className="object-cover"
                  />
                </div>

                <h5 className="font-semibold text-gray-900">SMG Hub - Connaught Place</h5>
                <p className="text-sm text-gray-500 mb-4">Fast-charging station located at Central Delhi.</p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-sm">
                    <Zap className="w-4 h-4 text-[#00B4D8]" />
                    <span className="text-gray-600">15 kW Fast Charge</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <CreditCard className="w-4 h-4 text-[#00B4D8]" />
                    <span className="text-gray-600">Supports contactless payment</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Clock className="w-4 h-4 text-[#00B4D8]" />
                    <span className="text-gray-600">Open 24/7</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <span className="text-sm font-medium">4.8</span>
                </div>

                <div className="flex items-center gap-3 mb-6">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden">
                        <Image
                          src={`https://images.unsplash.com/photo-${i === 1 ? "1535713875002-d1d0cf377fde" : i === 2 ? "1580489944761-15a19d654956" : i === 3 ? "1531427186611-ecfd6d936c79" : "1494790108377-be9c29b29330"}?auto=format&fit=crop&q=80&w=100`}
                          alt="User"
                          width={32}
                          height={32}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    Trusted by <strong>EV Riders</strong>
                  </span>
                </div>

                <div className="flex gap-3">
                  <Button className="w-full bg-[#00B4D8] hover:bg-[#0096c7] text-white gap-2">
                    View Location <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Stories Section */}
      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="w-full px-6 md:px-12 lg:px-24">
          <div className="text-center mb-16">
            <span className="text-sm text-gray-500 tracking-wider">/ Customer Stories</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-2">Real Riders, Real Experiences</h2>
          </div>

          <div className="grid lg:grid-cols-[1fr_2fr] gap-12">
            {/* Left - Testimonial Thumbnails */}
            <div className="space-y-4">
              {testimonials.map((testimonial, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all text-left ${activeTestimonial === i ? "bg-gray-100" : "hover:bg-gray-50"
                    }`}
                >
                  <div className="w-16 h-16 rounded-full overflow-hidden">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">— {testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* Right - Active Testimonial */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="grid md:grid-cols-2 gap-8 items-center"
              >
                <div className="aspect-[3/4] relative rounded-3xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&q=80&w=800"
                    alt="Customer"
                    fill
                    className="object-cover"
                  />
                </div>

                <div>
                  <Quote className="w-10 h-10 text-gray-200 mb-4" />
                  <blockquote className="text-2xl font-medium text-gray-900 mb-6 leading-relaxed">
                    "{testimonials[activeTestimonial].quote}"
                  </blockquote>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">— {testimonials[activeTestimonial].name}</p>
                      <p className="text-sm text-gray-500">{testimonials[activeTestimonial].role}</p>
                    </div>
                    <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-full">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm font-medium">{testimonials[activeTestimonial].rating}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-8">
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full bg-transparent"
                      onClick={() => setActiveTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full bg-transparent"
                      onClick={() => setActiveTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Sustainability Section */}
      {/* Sustainability Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
            <div>
              <span className="text-sm text-gray-500 tracking-wider">/ Sustainability Commitment</span>
              <h2 className="text-4xl font-bold text-gray-900 mt-2">
                Driving Towards a<br />
                Greener Tomorrow
              </h2>
            </div>
            <p className="text-gray-500 max-w-md mt-4 md:mt-0">
              From clean manufacturing to renewable energy integration, we are committed to building a sustainable
              future.
            </p>
          </div>

          {/* Sustainability Images */}
          <div className="space-y-2">
            <div className="relative aspect-[21/9] rounded-3xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=1200"
                alt="Solar Power"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
              <div className="absolute bottom-8 right-8 text-white text-right">
                <Sun className="w-8 h-8 mb-2 ml-auto" />
                <h3 className="text-3xl font-bold">Solar Power</h3>
                <p className="text-white/70">Integration</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-2">
              <div className="relative aspect-video rounded-3xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&q=80&w=800"
                  alt="Clean Charging"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-bold">EV Charging with</h3>
                  <p className="text-white/70">Clean Energy</p>
                </div>
              </div>

              <div className="relative aspect-video rounded-3xl overflow-hidden">
                <Image
                  src="/wind-turbines-green-hills-sustainable-energy.jpg"
                  alt="Sustainable Energy"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 right-6 text-white text-right">
                  <Wind className="w-6 h-6 mb-2 ml-auto" />
                  <h3 className="text-2xl font-bold">Sustainable</h3>
                  <p className="text-white/70">Energy Source</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-[#0a0a0f] relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/placeholder.svg?height=600&width=1200"
            alt="CTA Background"
            fill
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0f] via-[#0a0a0f]/80 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="max-w-xl">
            <span className="text-sm text-gray-400 tracking-wider">/ Call to Action</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4">Ready to Go Electric?</h2>
            <p className="text-gray-400 mb-8">
              Join the movement and take the wheel of tomorrow's riding experience today.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-[#00B4D8] hover:bg-[#0096c7] text-white gap-2">
                Book a Test Ride <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 gap-2 bg-transparent"
              >
                Contact Sales <Phone className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-24 pb-12">
        <div className="w-full px-6 md:px-12 lg:px-24">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            {/* Brand */}
            <div>
              <Link href="/" className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FF4D00] to-[#FF6B35] flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">
                  SMG<span className="text-[#FF4D00]">Motors</span>
                </span>
              </Link>
              <p className="text-sm text-gray-500 mb-4">
                SMG Motors creates electric vehicles that power a cleaner, smarter, and more exciting future of
                mobility.
              </p>
              <Button variant="outline" className="gap-2 bg-transparent">
                Contact Us <ArrowRight className="w-4 h-4" />
              </Button>
            </div>

            {/* Address */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Address</h4>
              <p className="text-sm text-gray-500">
                88 Electric Avenue,
                <br />
                Gurugram, Haryana 122001
                <br />
                India
              </p>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Contact Us</h4>
              <p className="text-sm text-gray-500 mb-1">+91 1800 123 4567</p>
              <p className="text-sm text-gray-500">hello@smgmotors.in</p>
            </div>

            {/* Social & Back to Top */}
            <div className="flex flex-col items-end">
              <Button
                variant="outline"
                className="gap-2 mb-6 bg-transparent"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                Back to Top <ArrowUpRight className="w-4 h-4" />
              </Button>
              <div className="flex gap-3">
                {[Instagram, Linkedin, Twitter, Facebook].map((Icon, i) => (
                  <Button key={i} variant="outline" size="icon" className="rounded-full bg-transparent">
                    <Icon className="w-4 h-4" />
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Links */}
          <div className="flex flex-wrap justify-between items-center pt-8 border-t border-gray-100">
            <div className="flex flex-wrap gap-6 text-sm text-gray-500">
              <Link href="/track" className="hover:text-gray-900 transition-colors">
                Track Order
              </Link>
              <Link href="#models" className="hover:text-gray-900 transition-colors">
                Models
              </Link>
              <Link href="#charging" className="hover:text-gray-900 transition-colors">
                Charging
              </Link>
              <Link href="#technology" className="hover:text-gray-900 transition-colors">
                Technology
              </Link>
              <Link href="/dealer" className="hover:text-gray-900 transition-colors">
                Dealer Portal
              </Link>
              <Link
                href="/dealer/login"
                className="hover:text-[#FF4D00] transition-colors font-semibold text-gray-900"
              >
                Dealership Login →
              </Link>
            </div>
            <div className="flex gap-6 text-sm text-gray-500 mt-4 md:mt-0">
              <Link href="/terms" className="hover:text-gray-900 transition-colors">
                Terms & Conditions
              </Link>
              <span>© 2025 SMG Motors. All Rights Reserved.</span>
              <Link href="/privacy" className="hover:text-gray-900 transition-colors">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
