'use client'

import { useEffect, useRef } from 'react'
import LocomotiveScroll from 'locomotive-scroll'
import 'locomotive-scroll/dist/locomotive-scroll.css'
const LocoMotiveProvider = ({ children }: { children: React.ReactNode }) => {
    const containerRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        if (!containerRef.current) return

        const scroll = new LocomotiveScroll({
            el: containerRef.current,
            smooth: true,
            lerp: 0.03,
            multiplier: 0.8,
            class: 'is-reveal',

        })

        return () => {
            scroll.destroy()
        }
    }, [])

    return (
        <div ref={containerRef} data-scroll-container>
            {children}
        </div>
    )
}

export default LocoMotiveProvider
