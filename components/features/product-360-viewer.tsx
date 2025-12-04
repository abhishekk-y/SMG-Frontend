"use client"

import React, { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { RotateCw, ZoomIn, ZoomOut, Move } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Product360ViewerProps {
    images: string[]
    autoRotate?: boolean
    onZoomChange?: (zoom: number) => void
}

export function Product360Viewer({ images, autoRotate = false }: Product360ViewerProps) {
    const [currentFrame, setCurrentFrame] = useState(0)
    const [isDragging, setIsDragging] = useState(false)
    const [startX, setStartX] = useState(0)
    const [zoom, setZoom] = useState(1)
    const containerRef = useRef<HTMLDivElement>(null)

    // Auto rotation effect
    useEffect(() => {
        if (autoRotate && !isDragging && zoom === 1) {
            const interval = setInterval(() => {
                setCurrentFrame((prev) => (prev + 1) % images.length)
            }, 100)
            return () => clearInterval(interval)
        }
    }, [autoRotate, isDragging, images.length, zoom])

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true)
        setStartX(e.clientX)
    }

    const handleTouchStart = (e: React.TouchEvent) => {
        setIsDragging(true)
        setStartX(e.touches[0].clientX)
    }

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return
        handleDrag(e.clientX)
    }

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!isDragging) return
        handleDrag(e.touches[0].clientX)
    }

    const handleDrag = (clientX: number) => {
        const delta = clientX - startX
        if (Math.abs(delta) > 10) {
            // Sensitivity
            const direction = delta > 0 ? -1 : 1
            setCurrentFrame((prev) => {
                let next = prev + direction
                if (next < 0) next = images.length - 1
                if (next >= images.length) next = 0
                return next
            })
            setStartX(clientX)
        }
    }

    const handleEnd = () => {
        setIsDragging(false)
    }

    const toggleZoom = () => {
        setZoom((prev) => (prev === 1 ? 1.5 : 1))
    }

    return (
        <div className="relative w-full h-full group">
            <div
                ref={containerRef}
                className={`relative w-full h-full cursor-grab active:cursor-grabbing overflow-hidden rounded-xl ${zoom > 1 ? "cursor-zoom-out" : ""
                    }`}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleEnd}
                onMouseLeave={handleEnd}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleEnd}
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentFrame}
                        initial={{ opacity: 0.8 }}
                        animate={{ opacity: 1, scale: zoom }}
                        transition={{ duration: 0 }}
                        className="w-full h-full relative"
                    >
                        <Image
                            src={images[currentFrame]}
                            alt={`View angle ${currentFrame}`}
                            fill
                            className="object-contain pointer-events-none select-none"
                            priority
                        />
                    </motion.div>
                </AnimatePresence>

                {/* Interaction Overlay */}
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                        <Move className="w-4 h-4" /> Drag to Rotate
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="absolute bottom-4 right-4 flex gap-2 z-10">
                <Button
                    variant="secondary"
                    size="icon"
                    className="rounded-full bg-white/80 backdrop-blur shadow-lg hover:bg-white"
                    onClick={toggleZoom}
                >
                    {zoom === 1 ? <ZoomIn className="w-4 h-4" /> : <ZoomOut className="w-4 h-4" />}
                </Button>
                <Button
                    variant="secondary"
                    size="icon"
                    className="rounded-full bg-white/80 backdrop-blur shadow-lg hover:bg-white"
                    onClick={() => setCurrentFrame((prev) => (prev + 1) % images.length)}
                >
                    <RotateCw className="w-4 h-4" />
                </Button>
            </div>

            {/* Progress Indicator */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1">
                {images.map((_, i) => (
                    <div
                        key={i}
                        className={`h-1 rounded-full transition-all ${i === currentFrame ? "w-4 bg-[#FF4D00]" : "w-1 bg-gray-300"
                            }`}
                    />
                ))}
            </div>
        </div>
    )
}
