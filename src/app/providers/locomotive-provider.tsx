'use client'

import { createContext, useContext, useEffect, useRef } from 'react'
import LocomotiveScroll from 'locomotive-scroll'
import 'locomotive-scroll/dist/locomotive-scroll.css'

const ScrollContext = createContext<{ update: () => void } | null>(null);

export const useLocoScroll = () => {
    return useContext(ScrollContext);
};

const LocoMotiveProvider = ({ children }: { children: React.ReactNode }) => {
    const containerRef = useRef<HTMLDivElement | null>(null)
    const scrollRef = useRef<LocomotiveScroll | null>(null)

    useEffect(() => {
        if (!containerRef.current) return

        scrollRef.current = new LocomotiveScroll({
            el: containerRef.current,
            smooth: true,
            lerp: 0.05,
            multiplier: 1.5,
        });

        return () => {
            scrollRef.current?.destroy()
        }
    }, [])

    const update = () => {
        scrollRef.current?.update()
    }

    return (
        <ScrollContext.Provider value={{ update }}>
            <div ref={containerRef} data-scroll-container>
                {children}
            </div>
        </ScrollContext.Provider>
    )
}

export default LocoMotiveProvider
