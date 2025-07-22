'use client'

import dynamic from 'next/dynamic'
import React from 'react'
import Footer from './Footer'
import Navbar from './Navbar'
import { usePathname } from 'next/navigation'

const LocoMotiveProvider = dynamic(() => import('@/app/providers/locomotive-provider'), {
    ssr: false,
})

const excludedPaths = ['/login', '/auth', '/admin',]
const _excludedPaths = ['/create-event']

const ScrollWrapper = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname()
    const isExcluded = excludedPaths.includes(pathname)
    const _isExcluded = _excludedPaths.includes(pathname)
    if (isExcluded) return <>{children}</>
    if (_isExcluded) return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    )

    return (
        <LocoMotiveProvider>
            <Navbar />
            {children}
            <Footer />
        </LocoMotiveProvider>
    )
}

export default ScrollWrapper
