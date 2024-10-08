'use client'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { navLinks } from "@/constants"
import { SignedOut } from "@clerk/clerk-react"
import { SignedIn, UserButton } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "../ui/button"


const MobileNav = () => {
    const pathname = usePathname()
    return (
        <header className="header">
            <Link href="/" className="flex items-center gap-2 md:py-2">
                <Image
                    src="/assets/images/logo.png"
                    alt="logo"
                    width={70}
                    height={28}
                />
            </Link>
            <nav className="flex gap-2">
                <SignedIn>
                    <UserButton />
                    <Sheet>
                        <SheetTrigger>
                            <Image
                                src="/assets/icons/menu.svg"
                                alt="menu"
                                width={32}
                                height={32}
                                className="cursor-pointer"
                            />
                        </SheetTrigger>
                        <SheetContent className="sheet-content bg-gray-200 sm:w-64">
                            <>
                            <div className="flex items-center">
                            <Image
                                    src="/assets/images/logo.png"
                                    alt="logo"
                                    width={70}
                                    height={28}
                                />
                                <p className="text-gray-500 font-semibold text-[18px]">Image Revamp</p>
                            </div>
                                <ul className='header-nav_elements'>
                                    {navLinks.map((link) => {
                                        const isActive = link.route === pathname
                                        return (
                                            <li key={link.route}
                                                className={`sidebar-nav_element group ${isActive ? 'bg-purple-gradient text-white' : "text-gray-500"}`}>
                                                <Link className='sidebar-link' href={link.route}>
                                                    <Image
                                                        src={link.icon}
                                                        alt='logo'
                                                        width={24}
                                                        height={24}
                                                        className={`${isActive && "brightness-200"}`}
                                                    />
                                                    {link.label}
                                                </Link>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </>
                        </SheetContent>
                    </Sheet>
                </SignedIn>
                <SignedOut>
                        <Button asChild className='button bg-purple-gradient bg-cover'>
                            <Link href="/sign-in">
                                Login
                            </Link>
                        </Button>
                    </SignedOut>
            </nav>
        </header>
    )
}

export default MobileNav