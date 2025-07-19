'use client'
import { RootState } from "@/lib/redux/Store";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { ProfileIcon, StarUnFilledIcon, TicketIconUnFill } from "../icons/Icon";
import { User, UserCircle2 } from "lucide-react";

const Navbar = () => {
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn)
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
                        <li>
                            <Link href={isLoggedIn ? '/create-event' : '/auth?fallback=/create-event'}>
                                Create Event
                            </Link>
                        </li>
                        {
                            isLoggedIn ? (
                                <>
                                    <li>
                                        <div className="flex flex-col items-center">
                                            <TicketIconUnFill />
                                            Ticket
                                        </div>
                                    </li>
                                    <li>
                                        <div className="flex flex-col items-center">
                                            <StarUnFilledIcon size={30} />
                                            Interested
                                        </div>
                                    </li>
                                    <li>
                                        <div className="flex flex-col items-center">
                                            <UserCircle2 size={30} />
                                            Profile
                                        </div>
                                    </li>
                                </>
                            )
                                :
                                (
                                    <>
                                        <li>
                                            <Link
                                                href={'/auth?authType=login'}
                                            >
                                                Login
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href={'/auth?fallback=/create-event'}
                                                className="bg-yellow py-2 px-4 rounded-md text-dark-blue-gray"
                                            >
                                                Sign Up
                                            </Link>
                                        </li>
                                    </>
                                )
                        }
                    </ul>
                </div>
            </div>
        </header>
    )
}

export default Navbar;