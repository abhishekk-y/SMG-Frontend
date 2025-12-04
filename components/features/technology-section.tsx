"use client"

import Image from "next/image"
import { ArrowRight, Wifi, Shield, Battery } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export function TechnologySection() {
    return (
        <section className="py-24 bg-white">
            <div className="w-full px-6 md:px-12 lg:px-24">
                <div className="text-center mb-16">
                    <span className="text-sm text-gray-500 tracking-wider uppercase">/ Technology & Innovation</span>
                    <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-2">Powered by Innovation</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-2 gap-6 h-[800px] md:h-[600px]">
                    {/* Smart Connectivity - Large Left */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="md:col-span-1 md:row-span-1 relative rounded-[2.5rem] overflow-hidden group"
                    >
                        <Image
                            src="/assets/feature-4.webp"
                            alt="Smart Connectivity"
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-black/60 p-8 flex flex-col justify-end">
                            <div className="w-12 h-12 bg-blue-500/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6">
                                <Wifi className="w-6 h-6 text-blue-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-3">Smart Connectivity</h3>
                            <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                                Stay connected wherever you drive. SMG's smart interface syncs seamlessly with your devices — giving you navigation, entertainment, and real-time vehicle insights.
                            </p>
                            <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-xl py-6 text-base font-bold flex justify-between items-center group/btn">
                                Learn More <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                            </Button>
                        </div>
                    </motion.div>

                    {/* Battery Efficiency - Large Right (Spans 2 cols, 2 rows) */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="md:col-span-2 md:row-span-2 relative rounded-[2.5rem] overflow-hidden group"
                    >
                        <Image
                            src="/assets/feature-1.webp"
                            alt="Battery Efficiency"
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-10 flex flex-col justify-end">
                            <div className="flex items-end justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/10">
                                        <Battery className="w-7 h-7 text-white" />
                                    </div>
                                    <h3 className="text-3xl font-bold text-white">Battery Efficiency</h3>
                                </div>
                                <Button size="icon" className="w-14 h-14 rounded-2xl bg-blue-500 hover:bg-blue-600 text-white transition-all hover:scale-110">
                                    <ArrowRight className="w-6 h-6" />
                                </Button>
                            </div>
                        </div>
                    </motion.div>

                    {/* Driver Assist - Small Bottom Left */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="md:col-span-1 md:row-span-1 relative rounded-[2.5rem] overflow-hidden group"
                    >
                        <Image
                            src="/assets/feature-2.webp"
                            alt="Driver Assist"
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors p-8 flex items-end justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center">
                                    <Shield className="w-5 h-5 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-white">Driver-Assist</h3>
                            </div>
                            <Button size="icon" className="w-10 h-10 rounded-xl bg-blue-500 hover:bg-blue-600 text-white transition-all hover:scale-110">
                                <ArrowRight className="w-4 h-4" />
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
