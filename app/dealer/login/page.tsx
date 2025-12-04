"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Zap, ArrowRight, User, Lock, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function DealerLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate authentication
    setTimeout(() => {
      setIsLoading(false)
      router.push("/dealer")
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/assets/login-bg.png')",
          }}
        />
        <div className="absolute inset-0 bg-white/90 backdrop-blur-sm" />
      </div>

      {/* Header */}
      <header className="relative z-10 h-24 flex items-center justify-between px-6 lg:px-12 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-11 h-11 bg-[#FF4D00] rounded-2xl flex items-center justify-center transform -skew-x-12 shadow-lg shadow-orange-500/30">
            <Zap className="w-6 h-6 text-white fill-current" />
          </div>
          <span className="text-2xl font-black tracking-tighter italic">
            SMG<span className="text-[#FF4D00]">PARTNER</span>
          </span>
        </Link>
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-[#FF4D00] transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </header>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2.5rem] shadow-2xl p-10 lg:p-14 max-w-md w-full relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-2 bg-[#FF4D00]"></div>

          <div className="text-center mb-10">
            <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
              <User className="w-10 h-10 text-[#FF4D00]" />
            </div>
            <h2 className="text-3xl font-black text-gray-900 mb-3 tracking-tight">Partner Login</h2>
            <p className="text-gray-500 font-medium">Access your dealer dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="group">
              <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide group-focus-within:text-[#FF4D00] transition-colors">
                Dealer ID / Email
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="DLR-IND-001 or email@example.com"
                  className="w-full pl-6 pr-14 py-5 bg-gray-50 border-2 border-gray-100 rounded-3xl text-base font-bold text-gray-900 focus:outline-none focus:border-[#FF4D00] focus:bg-white transition-all placeholder:text-gray-300 shadow-sm group-focus-within:shadow-xl group-focus-within:shadow-orange-500/10"
                  required
                />
                <User className="w-6 h-6 text-gray-400 absolute right-6 top-1/2 -translate-y-1/2 group-focus-within:text-[#FF4D00] transition-colors" />
              </div>
            </div>

            <div className="group">
              <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide group-focus-within:text-[#FF4D00] transition-colors">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-6 pr-14 py-5 bg-gray-50 border-2 border-gray-100 rounded-3xl text-base font-bold text-gray-900 focus:outline-none focus:border-[#FF4D00] focus:bg-white transition-all placeholder:text-gray-300 shadow-sm group-focus-within:shadow-xl group-focus-within:shadow-orange-500/10"
                  required
                />
                <Lock className="w-6 h-6 text-gray-400 absolute right-6 top-1/2 -translate-y-1/2 group-focus-within:text-[#FF4D00] transition-colors" />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-300 text-[#FF4D00] focus:ring-[#FF4D00]"
                />
                <span className="text-gray-600 font-medium">Remember me</span>
              </label>
              <a href="#" className="text-[#FF4D00] font-bold hover:underline">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#FF4D00] hover:bg-[#E04400] text-white font-bold py-5 rounded-3xl text-lg shadow-xl shadow-orange-500/30 transition-all transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 group"
            >
              {isLoading ? (
                "Signing in..."
              ) : (
                <>
                  Sign In <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-500">
              Don't have an account?{" "}
              <a href="#" className="text-[#FF4D00] font-bold hover:underline">
                Contact Sales
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
