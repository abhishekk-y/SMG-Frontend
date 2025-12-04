"use client"

import React from "react"
import { cn } from "@/lib/utils"

interface BadgeProps {
    status: string
    className?: string
}

export const Badge: React.FC<BadgeProps> = ({ status, className }) => {
    const styles: Record<string, string> = {
        "In Transit": "bg-orange-50 text-[#FF4D00] ring-1 ring-orange-200",
        Registration: "bg-blue-50 text-blue-700 ring-1 ring-blue-200",
        Shipped: "bg-blue-50 text-blue-700 ring-1 ring-blue-200",
        Delivered: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
        "Low Stock": "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
        "Out of Stock": "bg-red-50 text-red-700 ring-1 ring-red-200",
        "In Stock": "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
        Processing: "bg-yellow-50 text-yellow-700 ring-1 ring-yellow-200",
        Completed: "bg-green-50 text-green-700 ring-1 ring-green-200",
    }

    const dotColor =
        status === "Low Stock"
            ? "bg-amber-500"
            : status === "Registration"
                ? "bg-blue-500"
                : status === "In Transit"
                    ? "bg-[#FF4D00]"
                    : "bg-current"

    return (
        <span
            className={cn(
                "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase",
                styles[status] || "bg-gray-100 text-gray-600",
                className
            )}
        >
            <span className={cn("w-1.5 h-1.5 rounded-full", dotColor)}></span>
            {status}
        </span>
    )
}
