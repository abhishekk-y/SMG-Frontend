"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Slider } from "@/components/ui/slider"
import { ArrowRight, Info } from "lucide-react"

export function SavingsCalculator() {
    const [dailyDistance, setDailyDistance] = useState(30)
    const [costs, setCosts] = useState({
        ice: { fuel: 0, maintenance: 0, fixed: 0, total: 0 },
        ev: { fuel: 0, maintenance: 0, fixed: 0, total: 0 },
        savings: { monthly: 0, annual: 0 }
    })

    // Constants
    const petrolPrice = 100 // per liter
    const iceMileage = 40 // km per liter
    const electricityPrice = 10 // per unit
    const evRangePerUnit = 10 // km per unit
    const iceMaintenance = 0.5 // per km
    const evMaintenance = 0.1 // per km
    const iceFixedCost = 2000 // Monthly fixed cost (EMI/Insurance approx)
    const evFixedCost = 2200 // Slightly higher fixed cost for EV

    useEffect(() => {
        const monthlyDistance = dailyDistance * 30
        const annualDistance = dailyDistance * 365

        // Monthly Calculations
        const iceFuelMonthly = (monthlyDistance / iceMileage) * petrolPrice
        const iceMaintMonthly = monthlyDistance * iceMaintenance
        const iceTotalMonthly = iceFuelMonthly + iceMaintMonthly + iceFixedCost

        const evFuelMonthly = (monthlyDistance / evRangePerUnit) * electricityPrice
        const evMaintMonthly = monthlyDistance * evMaintenance
        const evTotalMonthly = evFuelMonthly + evMaintMonthly + evFixedCost

        const monthlySavings = iceTotalMonthly - evTotalMonthly
        const annualSavings = monthlySavings * 12

        setCosts({
            ice: {
                fuel: Math.round(iceFuelMonthly),
                maintenance: Math.round(iceMaintMonthly),
                fixed: iceFixedCost,
                total: Math.round(iceTotalMonthly)
            },
            ev: {
                fuel: Math.round(evFuelMonthly),
                maintenance: Math.round(evMaintMonthly),
                fixed: evFixedCost,
                total: Math.round(evTotalMonthly)
            },
            savings: {
                monthly: Math.round(monthlySavings),
                annual: Math.round(annualSavings)
            }
        })
    }, [dailyDistance])

    // Chart Scaling
    const maxCost = Math.max(costs.ice.total, costs.ev.total * 1.5) // Scale based on max value
    const getHeight = (value: number) => `${(value / maxCost) * 100}%`

    return (
        <section className="py-24 bg-[#F0FDF4] relative overflow-hidden">
            <div className="w-full px-6 md:px-12 lg:px-24 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left Content */}
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold uppercase tracking-wider mb-6">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            Save Big
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
                            Buying an EV is <br />
                            <span className="text-green-600">money in the bank.</span>
                        </h2>
                        <p className="text-gray-600 mb-10 text-lg">
                            Don't believe us? Calculate for yourself. See how much you can save by switching to SMG Electric.
                        </p>

                        <div className="flex gap-12 mb-12">
                            <div>
                                <p className="text-4xl font-black text-green-600">₹{costs.savings.annual.toLocaleString()}</p>
                                <p className="text-sm text-gray-500 font-medium uppercase tracking-wider mt-1">Annual Savings</p>
                            </div>
                            <div>
                                <p className="text-4xl font-black text-green-600">₹{costs.savings.monthly.toLocaleString()}</p>
                                <p className="text-sm text-gray-500 font-medium uppercase tracking-wider mt-1">Monthly Savings</p>
                            </div>
                        </div>

                        <p className="text-xs text-gray-400 max-w-md mb-8 leading-relaxed">
                            *The estimated total monthly cost includes fuel/electricity, maintenance, and fixed costs (EMI/Insurance).
                            Based on petrol price of ₹{petrolPrice}/L and electricity cost of ₹{electricityPrice}/unit.
                        </p>

                        <button className="flex items-center gap-2 text-green-700 font-bold hover:gap-4 transition-all group">
                            Talk to our Experts <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Right Calculator */}
                    <div className="bg-white rounded-3xl p-8 shadow-xl shadow-green-900/5 border border-green-50">
                        <div className="mb-12">
                            <div className="flex justify-between items-end mb-4">
                                <label className="text-sm font-bold text-gray-900 uppercase tracking-wider">Daily Distance</label>
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => setDailyDistance(Math.max(15, dailyDistance - 1))}
                                        className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
                                    >
                                        -
                                    </button>
                                    <span className="text-2xl font-black text-green-600 w-20 text-center">{dailyDistance} km</span>
                                    <button
                                        onClick={() => setDailyDistance(Math.min(100, dailyDistance + 1))}
                                        className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            <Slider
                                value={[dailyDistance]}
                                min={15}
                                max={100}
                                step={1}
                                onValueChange={(val) => setDailyDistance(val[0])}
                                className="py-4"
                            />
                            <div className="flex justify-between text-xs text-gray-400 font-medium mt-2">
                                <span>15 km</span>
                                <span>100 km</span>
                            </div>
                        </div>

                        {/* Chart */}
                        <div className="relative h-80 flex items-end justify-center gap-20 px-8 pb-8">
                            {/* Grid Lines */}
                            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-8">
                                {[...Array(5)].map((_, i) => (
                                    <div key={i} className="w-full h-[1px] bg-gray-100" />
                                ))}
                            </div>

                            {/* ICE Bar */}
                            <div className="relative w-24 flex flex-col justify-end h-full group">
                                {/* Tooltip */}
                                <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs font-bold py-2 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 shadow-xl">
                                    Total: ₹{costs.ice.total.toLocaleString()}
                                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-gray-900"></div>
                                </div>

                                {/* Running Cost (Fuel) */}
                                <div
                                    className="w-full bg-gray-800 rounded-t-lg transition-all duration-500 relative"
                                    style={{ height: getHeight(costs.ice.fuel) }}
                                >
                                    <div className="absolute inset-0 flex items-center justify-center text-[10px] text-white/50 font-medium opacity-0 group-hover:opacity-100">Fuel</div>
                                </div>

                                {/* Maintenance */}
                                <div
                                    className="w-full bg-gray-400 transition-all duration-500 relative"
                                    style={{ height: getHeight(costs.ice.maintenance) }}
                                >
                                    <div className="absolute inset-0 flex items-center justify-center text-[10px] text-white/70 font-medium opacity-0 group-hover:opacity-100">Maint.</div>
                                </div>

                                {/* Fixed Cost */}
                                <div
                                    className="w-full bg-gray-200 rounded-b-lg transition-all duration-500 relative"
                                    style={{ height: getHeight(costs.ice.fixed) }}
                                >
                                    <div className="absolute inset-0 flex items-center justify-center text-[10px] text-gray-500 font-medium opacity-0 group-hover:opacity-100">Fixed</div>
                                </div>

                                <p className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">ICE Scooter</p>
                            </div>

                            {/* EV Bar */}
                            <div className="relative w-24 flex flex-col justify-end h-full group">
                                {/* Tooltip */}
                                <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-green-600 text-white text-xs font-bold py-2 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 shadow-xl">
                                    Total: ₹{costs.ev.total.toLocaleString()}
                                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-green-600"></div>
                                </div>

                                {/* Running Cost (Electricity) */}
                                <div
                                    className="w-full bg-green-600 rounded-t-lg transition-all duration-500 relative"
                                    style={{ height: getHeight(costs.ev.fuel) }}
                                >
                                    <div className="absolute inset-0 flex items-center justify-center text-[10px] text-white/80 font-medium opacity-0 group-hover:opacity-100">Fuel</div>
                                </div>

                                {/* Maintenance */}
                                <div
                                    className="w-full bg-green-400 transition-all duration-500 relative"
                                    style={{ height: getHeight(costs.ev.maintenance) }}
                                >
                                    <div className="absolute inset-0 flex items-center justify-center text-[10px] text-white/80 font-medium opacity-0 group-hover:opacity-100">Maint.</div>
                                </div>

                                {/* Fixed Cost */}
                                <div
                                    className="w-full bg-green-200 rounded-b-lg transition-all duration-500 relative"
                                    style={{ height: getHeight(costs.ev.fixed) }}
                                >
                                    <div className="absolute inset-0 flex items-center justify-center text-[10px] text-green-800 font-medium opacity-0 group-hover:opacity-100">Fixed</div>
                                </div>

                                {/* Savings Indicator (The gap) */}
                                <div
                                    className="absolute bottom-0 w-full border-2 border-dashed border-green-300 rounded-lg transition-all duration-500 pointer-events-none"
                                    style={{ height: getHeight(costs.ice.total) }}
                                >
                                    <div className="absolute top-0 w-full -translate-y-full pt-1 text-center">
                                        <span className="text-[10px] font-bold text-green-500">Savings</span>
                                    </div>
                                </div>

                                <p className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-bold text-green-600 uppercase tracking-wider whitespace-nowrap">SMG Electric</p>
                            </div>
                        </div>

                        <div className="flex justify-center gap-6 mt-12">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-gray-800" />
                                <span className="text-xs text-gray-500 font-medium">Running Cost</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-gray-400" />
                                <span className="text-xs text-gray-500 font-medium">Maintenance</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-gray-200" />
                                <span className="text-xs text-gray-500 font-medium">Fixed Cost</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
