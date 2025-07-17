'use client'

import dynamic from 'next/dynamic'
import React from 'react'
import Footer from './Footer'
import Navbar from './Navbar'
import { usePathname } from 'next/navigation'

const LocoMotiveProvider = dynamic(() => import('@/app/providers/locomotive-provider'), {
    ssr: false,
})

const excludedPaths = ['/login', '/auth', '/admin']

const ScrollWrapper = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname()
    const isExcluded = excludedPaths.includes(pathname)
    if (isExcluded) return <>{children}</>

    return (
        <LocoMotiveProvider>
            <Navbar />
            {children}
            <Footer />
        </LocoMotiveProvider>
    )
}

export default ScrollWrapper
