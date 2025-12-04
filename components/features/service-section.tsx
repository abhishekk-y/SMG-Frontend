"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

const services = [
    {
        title: "Hyperservice",
        description: "Get comprehensive service coverage for your SMG EV. Regular maintenance checks, software updates, and performance optimization included.",
        link: <Link href="/roadside-assistance">Roadside Assistance</Link>,
        image: "/assets/service-1.png",
    },
    {
        title: "Scooter Insurance",
        description: "Protect your ride with our comprehensive insurance plans. Coverage against theft, damage, and third-party liabilities.",
        link: <Link href="/insurance">Get Insured</Link>,
        image: "/assets/service-2.png",
    },
    {
        title: "Warranty",
        description: "Extended warranty plans to keep you worry-free. Covers battery, motor, and key components for up to 5 years.",
        link: <Link href="/warranty">Extended Warranty</Link>,
        image: "/assets/service-3.png",
    },
]

export function ServiceSection() {
    return (
        <section className="py-32 bg-white">
            <div className="w-full px-6 md:px-12 lg:px-24">
                <div className="mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-5xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight"
                    >
                        Your Eyes on the Road. <br />
                        Ours on your SMG.
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-500 text-xl font-medium"
                    >
                        Doorstep service. Pickup and drop service. At your fingertips.
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-3 gap-10">
                    {services.map((service, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="group cursor-pointer"
                        >
                            <div className="aspect-[4/3] relative rounded-[2rem] overflow-hidden mb-8 shadow-sm group-hover:shadow-2xl transition-all duration-500">
                                <Image
                                    src={service.image}
                                    alt={service.title}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                            </div>
                            <h3 className="text-2xl font-black text-gray-900 mb-3 group-hover:text-[#FF4D00] transition-colors">{service.title}</h3>
                            <p className="text-gray-500 text-base font-medium mb-6 leading-relaxed">{service.description}</p>
                            <div className="flex items-center gap-2 text-green-600 font-bold text-sm tracking-wide uppercase group-hover:gap-4 transition-all duration-300">
                                {service.link} <ArrowRight className="w-5 h-5" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
