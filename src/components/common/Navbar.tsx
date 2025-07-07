'use client';

import {
    Home,
    Ticket,
    Store,
    PlusCircle,
    User,
    Settings,
} from 'lucide-react';
import React, { useEffect, useState, useRef, JSX } from 'react';
import Link from 'next/link';

const Navbar = () => {
    const userType = 'venue_owner';

    const navItemsByRole: Record<
        string,
        { label: string; icon: JSX.Element; href: string }[]
    > = {
        user: [
            { label: 'Home', icon: <Home size={20} />, href: '/' },
            { label: 'Events', icon: <Ticket size={20} />, href: '/events' },
            { label: 'Marketplace', icon: <Store size={20} />, href: '/marketplace' },
            { label: 'Profile', icon: <User size={20} />, href: '/profile' },
        ],
        artist: [
            { label: 'Feed', icon: <Home size={20} />, href: '/feed' },
            { label: 'My Events', icon: <Ticket size={20} />, href: '/my-events' },
            { label: 'Create', icon: <PlusCircle size={24} />, href: '/create' },
            { label: 'Profile', icon: <User size={20} />, href: '/profile' },
        ],
        organizer: [
            { label: 'Dashboard', icon: <Home size={20} />, href: '/dashboard' },
            { label: 'Create Event', icon: <PlusCircle size={24} />, href: '/create-event' },
            { label: 'My Events', icon: <Ticket size={20} />, href: '/my-events' },
            { label: 'Settings', icon: <Settings size={20} />, href: '/settings' },
        ],
        vendor: [
            { label: 'Shop', icon: <Store size={20} />, href: '/shop' },
            { label: 'Orders', icon: <Ticket size={20} />, href: '/orders' },
            { label: 'Add Product', icon: <PlusCircle size={24} />, href: '/add-product' },
            { label: 'Profile', icon: <User size={20} />, href: '/profile' },
        ],
        venue_owner: [
            { label: 'Venues', icon: <Home size={20} />, href: '/venue/venues' },
            { label: 'Add Venue', icon: <PlusCircle size={24} />, href: '/venue/add-venue' },
            { label: 'Bookings', icon: <Ticket size={20} />, href: '/venue/bookings' },
            { label: 'Profile', icon: <User size={20} />, href: '/profile' },
        ],
    };

    const navItems = navItemsByRole[userType] || [];

    const [isVisible, setIsVisible] = useState(true);
    const lastScrollY = useRef(0);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY.current && currentScrollY > 60) {
                setIsVisible(false); // Scroll down → hide
            } else {
                setIsVisible(true); // Scroll up → show
            }

            lastScrollY.current = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleMouseEnter = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setIsVisible(true);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => setIsVisible(false), 2000);
    };

    return (
        <header
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`bg-[#1E1E2F]/95 backdrop-blur-sm z-50 max-w-md mx-auto fixed bottom-3 w-[95%] left-1/2 -translate-x-1/2 
      px-4 py-2 rounded-xl shadow-lg flex items-center justify-between text-white border border-white/10 
      transition-all duration-500 ${isVisible ? 'translate-y-0' : ' translate-y-16 pointer-events-none'}`}
        >
            {navItems.map((item) => (
                <Link
                    key={item.href}
                    href={item.href}
                    className="flex flex-col items-center text-xs hover:text-yellow-400 transition-all"
                >
                    {item.icon}
                    <span className="mt-1">{item.label}</span>
                </Link>
            ))}
        </header>
    );
};

export default Navbar;
