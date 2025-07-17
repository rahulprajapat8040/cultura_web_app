'use client'
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
    const pathName = usePathname()

    const navLinks = [
        {
            name: 'Home',
            url: '/'
        },
        {
            name: 'Events',
            url: '/events'
        },
        {
            name: 'About',
            url: '/about',
        },
        {
            name: 'Contact',
            url: '/contact'
        }
    ]
    return (
        <header className="bg-dark-blue-gray text-background w-full h-14 flex items-center">
            <div className="max-w-7xl h-full mx-auto w-full flex items-center justify-between">
                <div>
                    <Image
                        src={'/assets/Logo.svg'}
                        alt="Logo"
                        width={130}
                        height={80}
                    />
                </div>
                <div className="h-full">
                    <nav className="h-full">
                        <div className="h-full">
                            <ul className="flex items-center gap-9 font-medium h-full">
                                {
                                    navLinks.map((item, idx) => {
                                        return (
                                            <li
                                                key={idx}
                                                className="h-full"
                                            >
                                                <Link
                                                    href={item.url}
                                                    className={`h-full flex items-center ${pathName === item.url ? 'border-b-3 border-yellow' : ''}`}>
                                                    {item.name}
                                                </Link>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </nav>
                </div>
                <div>
                    <ul className="flex items-center gap-4 font-medium h-full">
                        <li>Create Event</li>
                        <li>Login</li>
                        <li>
                            <Link
                                href={'/signup'}
                                className="bg-yellow py-2 px-4 rounded-md text-dark-blue-gray"
                            >
                                Sign Up
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    )
}

export default Navbar;