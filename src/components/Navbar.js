import { useEffect, useState } from 'react'
import brandLogo from '../assets/logo.png'
import brandLogoW from '../assets/logo_brand_w.png'
import { NavLink, useLocation } from "react-router-dom"
import ModeBtn from './ModeBtn'

const Navbar = ({ offset, switchMode, darkMode }) => {

    const [openNav, setOpenNav] = useState(false)
    const [showNav, setShowNav] = useState(true)

    let path = useLocation()

    const toggleNav = () => {
        setOpenNav(!openNav)
    }

    useEffect(() => {
        if (path.pathname === '/admin_dashboard' || path.pathname === '/add_art' || path.pathname.split('/').includes('manage_art_detail') || path.pathname.split('/').includes('edit_art')) {
            setShowNav(false)
        } else {
            setShowNav(true)
        }
    }, [path.pathname])

    return (
        <>
            {
                showNav &&
                <div className={`${openNav && "open"} ${(offset > 0) && "pin"}  w-full fixed top-0 z-10 transition-spacing`} id="navbar">
                    <div className=" container md:flex">
                        <div className=" flex items-center justify-between flex-1">
                            <NavLink to={'/'}>
                                {
                                    darkMode || openNav
                                        ?
                                        <img className=' h-6 md:h-8' src={brandLogoW} alt="Brand Logo" />
                                        :
                                        <img className=' h-6 md:h-8' src={(offset === 0) ? brandLogoW : brandLogo} alt="Brand Logo" />
                                }
                            </NavLink>

                            <div className=" flex items-center gap-8">
                                <div className={`${(offset === 0) && " text-white"}`} id='mode-btn'>
                                    <ModeBtn switchMode={switchMode} darkMode={darkMode} />
                                </div>

                                <div className={`${(offset === 0) ? " *:bg-white" : " *:bg-black/70"} *:transition md:*:hidden`} onClick={toggleNav} id='menu-ic'>
                                    <div className=""></div>
                                    <div className=""></div>
                                    <div className=""></div>
                                </div>
                            </div>
                        </div>
                        <div className={`${(offset === 0) && " text-white"} md:flex md:*:px-4 md:hover:*:underline transition-all duration-500 nav-links text-center *:block *:my-1 *:py-2 font-semibold`}>
                            <NavLink className={({ isActive }) => (isActive ? '' : '')} to={'/'}>Home</NavLink>
                            <NavLink className={({ isActive }) => (isActive ? '' : '')} to={'/about'}>About</NavLink>
                            <NavLink className={({ isActive }) => (isActive ? '' : '')} to={'/exhibition'}>Exhibition</NavLink>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Navbar