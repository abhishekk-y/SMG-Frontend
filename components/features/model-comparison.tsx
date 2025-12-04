"use client"

import { Check, Minus } from "lucide-react"

const comparisonData = [
    {
        feature: "Introductory Price",
        models: ["₹89,999", "₹1,19,999", "₹1,49,999"],
    },
    {
        feature: "Peak Power",
        models: ["8.5 kW", "11 kW", "13 kW"],
    },
    {
        feature: "Top Speed",
        models: ["90 km/h", "105 km/h", "120 km/h"],
    },
    {
        feature: "Acceleration 0-40km/h",
        models: ["3.3 sec", "2.9 sec", "2.6 sec"],
    },
    {
        feature: "Range (IDC)",
        models: ["135 km", "170 km", "195 km"],
    },
    {
        feature: "Charging Time (0-80%)",
        models: ["5 hrs", "4 hrs", "6.5 hrs"],
    },
    {
        feature: "Modes",
        models: ["Eco, Normal, Sports", "Eco, Normal, Sports, Hyper", "Eco, Normal, Sports, Hyper"],
    },
    {
        feature: "Battery Warranty",
        models: ["3 yrs/40,000 km", "3 yrs/50,000 km", "5 yrs/60,000 km"],
    },
]

const colors = [
    ["#F5F5F5", "#1a1a1a", "#FF4D00"],
    ["#F5F5F5", "#1a1a1a", "#FF4D00", "#3b82f6"],
    ["#F5F5F5", "#1a1a1a", "#FF4D00", "#3b82f6", "#22c55e"],
]

export function ModelComparison() {
    return (
        <section className="py-24 bg-gray-50">
            <div className="w-full px-6 md:px-12 lg:px-24">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-black text-gray-900">Compare Models</h2>
                    <p className="text-gray-500 mt-4">Find the perfect SMG for you.</p>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[800px]">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="py-8 text-left w-1/4"></th>
                                <th className="py-8 text-left w-1/4">
                                    <div className="text-xl font-black text-gray-900">SMG Sprint</div>
                                    <div className="text-sm text-gray-500">Urban Commuter</div>
                                </th>
                                <th className="py-8 text-left w-1/4">
                                    <div className="text-xl font-black text-gray-900">SMG Blaze</div>
                                    <div className="text-sm text-gray-500">Performance Beast</div>
                                </th>
                                <th className="py-8 text-left w-1/4">
                                    <div className="text-xl font-black text-gray-900">SMG Volt Pro</div>
                                    <div className="text-sm text-gray-500">Long Range Champion</div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {comparisonData.map((row, i) => (
                                <tr key={i} className="border-b border-gray-100 hover:bg-white transition-colors">
                                    <td className="py-6 text-gray-500 font-medium">{row.feature}</td>
                                    {row.models.map((val, j) => (
                                        <td key={j} className="py-6 text-gray-900 font-bold text-lg">
                                            {val}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                            {/* Colors Row */}
                            <tr className="border-b border-gray-100 hover:bg-white transition-colors">
                                <td className="py-6 text-gray-500 font-medium">Colours</td>
                                {colors.map((modelColors, i) => (
                                    <td key={i} className="py-6">
                                        <div className="flex gap-2">
                                            {modelColors.map((c, k) => (
                                                <div key={k} className="w-6 h-6 rounded-full border border-gray-200 shadow-sm" style={{ backgroundColor: c }} />
                                            ))}
                                        </div>
                                    </td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="mt-12 text-center">
                    <p className="text-xs text-gray-400 max-w-2xl mx-auto">
                        *Prices mentioned above are ex-showroom. Performance figures are based on ideal test conditions.
                        Real-world performance may vary based on load, terrain, and riding style.
                    </p>
                </div>
            </div>
        </section>
    )
}
