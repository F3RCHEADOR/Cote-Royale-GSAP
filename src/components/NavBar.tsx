'use client'
import { Content } from "@prismicio/client"
import clsx from "clsx"
import Image from "next/image"

import { useState } from "react"
import { HiMenuAlt2 } from "react-icons/hi"
import { HiMagnifyingGlass, HiShoppingBag, HiShoppingCart, HiUser, HiXMark } from "react-icons/hi2"
import { TransitionLink } from "./TransitionLink"


type NavIconsProps = {
    className?: string,
    tabIndex?: number
}

const NavIcons = ({ className = "", tabIndex }: NavIconsProps) => (
    <div className={clsx("flex items-center gap-8", className)}>

        <TransitionLink href={"#"} className="text-white" aria-label="Search" tabIndex={tabIndex}>
            <HiMagnifyingGlass size={24} />
        </TransitionLink>
        <TransitionLink href={"#"} className="text-white" aria-label="Account" tabIndex={tabIndex}>
            <HiUser size={24} />
        </TransitionLink>

        <TransitionLink href={"#"} className="text-white" aria-label="ToCart" tabIndex={tabIndex}>
            <HiShoppingBag size={24} />
        </TransitionLink>


    </div>
)


type NavBarProps = {
    settings: Content.SettingsDocument
}


export const NavBar = ({settings}: NavBarProps) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)


    const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen)


    return (
        <header>
            <div className="navbar bg-black fixed top-0 left-0 z-50 w-full text-neutral-100">
                <div className="flex items-center justify-between p-2 md:p-4">
                    <button onClick={() => toggleDrawer()} aria-label="Menu" className="p-2 cursor-pointer text-white transition-colors  hover:bg-neutral-600 rounded"><HiMenuAlt2 /></button>
                    <div className="absolute left-1/2 -translate-x-1/2">
                        <TransitionLink href={"/"}><Image
                            src="/logo.svg"
                            alt="Cote Royale Paris"
                            width={180}
                            height={30}
                            className="w-32 md:w-44"
                        /></TransitionLink>
                    </div>
                    <div className="flex"><NavIcons className="hidden md:flex" /></div>
                </div>
            </div>


            {/*Div con fondo negro semitransparente que ocupa toda la pantalla.
            Cuando el panel lateral está abierto, el fondo se hace visible y permite clics.
            Cuando está cerrado, se oculta y no se puede clicar.
            Al hacer clic sobre él, se cierra el panel */}
            <div className={clsx("nav-drawer-blur fixed inset-0 z-40 bg-black/40 opacity-0 transition-all duration-500", isDrawerOpen ? "pointer-events-auto opacity-100 backdrop-blur-xs" : "pointer-events-none backdrop-blur-none")} onClick={() => toggleDrawer()} aria-hidden="true" />


            <div className={clsx("nav-drawer fixed top-0 left-0 z-50 h-full w-72 bg-neutral-900 p-6 transition-transform duration-500", isDrawerOpen ? "translate-x-0" : "-translate-x-full")} role="dialog" aria-modal={isDrawerOpen}>
                <div className="flex mb-6 justify-end">
                    <button onClick={() => toggleDrawer()} aria-label="Close Menu" tabIndex={isDrawerOpen? 0 : -1} className=" p-2 cursor-pointer text-white transition-colors  hover:bg-neutral-600 rounded"><HiXMark /></button>
                </div>


            <nav className="space-y-4" aria-label="main navigation">
                {settings.data.navigation_link.map((link) => (
                    <TransitionLink field={link} onClick={() => setIsDrawerOpen(false)} key={link.key} className="block border-b border-white/10 py-2 text-xl font-semibold tracking-wide text-white uppercase hover:text-gray-300" tabIndex={isDrawerOpen ? 0 : -1}/>
                ))}
            </nav>

            <div className="pt-4 md:hidden">
                <NavIcons className="justify-around" tabIndex={isDrawerOpen ? 0 : -1} />
            </div>
            </div>
        </header>
    )
}