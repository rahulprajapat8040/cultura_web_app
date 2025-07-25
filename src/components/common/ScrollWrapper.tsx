'use client'

import React from 'react'
import Footer from './Footer'
import Navbar from './Navbar'
import { usePathname } from 'next/navigation'

const excludedPaths = ['/login', '/auth', '/admin',]

const ScrollWrapper = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname()
    const isExcluded = excludedPaths.includes(pathname)
    if (isExcluded) return <>{children}</>
    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    )
}

export default ScrollWrapper
